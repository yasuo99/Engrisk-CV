import React, { Component } from "react"
import { createWord } from '../../actions/wordActions';
import wordApi from "../../api/wordApi";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
import {Link} from "react-browser-router"

class QLListTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: {},
            modalCreate: false,
            modalDelete: false,
            modalEdit: false,
            // Phần create
            englishCreate: "",
            vietNamCreate: "",
            spellingCreate: "",
            categoryCreate: "",
            imageCreate: null,
            audio: null,
            // Phần edit
            englishEdit: "",
            vietNamEdit: "",
            spellingEdit: "",
            categoryEdit: "",
            imageEdit: null,
            selectedWord: 0,
            oldImage: null,
            words: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.submitCreate.bind(this);
        this.handleSubmit = this.submitEdit.bind(this);
        this.handleSubmit = this.submitDelete.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchWord();
        if (this.isComponentMounted) {
            this.setState({
                words: result
            });
            $(function () {
                $("#dataTable1").DataTable();
            });
        }
    }
    fetchWord = async () => {
        return await wordApi.getAll();
    }

    onFileChange = event => {
        this.setState({ [event.target.name]: event.target.files[0] });
    };
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    // Xử lý modal create
    submitCreate = async (e) => {
        e.preventDefault();
        var { englishCreate, vietNamCreate, spellingCreate, categoryCreate, imageCreate } = this.state;
        var formData = new FormData();
        formData.append("eng", englishCreate);
        formData.append("vie", vietNamCreate);
        formData.append("wordCategory", categoryCreate);
        formData.append('spelling', spellingCreate)
        formData.append("file", imageCreate);
        formData.append('audio', this.state.audio)
        await createWord(formData)
        var result = await this.fetchWord();
        if (this.isComponentMounted) {
            this.setState({
                words: result,
            })
        }
        this.closeCreate();
    }
    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate = () => {
        this.setState({
            englishCreate: "",
            vietNamCreate: "",
            spellingCreate: "",
            categoryCreate: "",
            imageCreate: null,
            modalCreate: false,
            audio: null
        });
    }
    // Xử lý modal edit
    selectWord = (e) => {
        this.setState({
            selectedWord: Number.parseInt(e.target.dataset.id)
        });
    }
    async openEdit(e) {
        var word = await wordApi.getDetail(e.target.dataset.id);
        console.log(word);
        this.setState({
            modalEdit: true,
            currentWord: word,
            englishEdit: word.eng === null ? "" : word.eng,
            vietNamEdit: word.vie === null ? "" : word.vie,
            spellingEdit: word.spelling === null ? "" : word.spelling,
            categoryEdit: word.wordCategory === null ? "" : word.wordCategory,
            oldImage: word.wordImg
        });
    }
    closeEdit = () => {
        this.setState({
            englishEdit: "",
            vietNamEdit: "",
            spellingEdit: "",
            categoryEdit: "",
            imageEdit: null,
            modalEdit: false,
        });
    }
    async submitEdit(e) {
        console.log(this.state);
        const formData = new FormData();
        formData.append("eng", this.state.englishEdit);
        formData.append("vie", this.state.vietNamEdit);
        formData.append("wordCategory", this.state.categoryEdit);
        formData.append('spelling', this.state.spellingEdit);
        formData.append("file", this.state.imageEdit);
        try {
            const result = await wordApi.update(this.state.currentWord.id, formData);
            console.log(result);
            if (result.status === 200) {
                toast("Cập nhật từ vựng thành công");
                var words = await this.fetchWord();
                if (this.isComponentMounted) {
                    this.setState({
                        words: words
                    })
                }
            }
        } catch (error) {
            if (error.response.data.error) {
                toast(error.response.data.error);
            }
        }
        this.setState({
        });
        this.closeEdit();
    }
    // Xử lý modal delete
    openDelete(e) {
        this.setState({ modalDelete: true, selectedWord: e.target.dataset.id });
    }
    closeDelete = () => {
        this.setState({
            modalDelete: false,
        });
    }
    async submitDelete(e) {
        try {
            const deleteResult = await wordApi.delete(this.state.selectedWord);
            if (deleteResult.status === 204) {
                toast("Xóa thành công");
                var words = await this.fetchWord();
                if (this.isComponentMounted) {
                    this.setState({
                        words: words
                    })
                }
            }
        } catch (error) {
            if (error.response.data.error) {
                toast(error.response.data.error);
            }
        }

        this.closeDelete();
    }
    render() {
        var { englishCreate, vietNamCreate, spellingCreate, categoryCreate } = this.state;
        var { englishEdit, vietNamEdit, spellingEdit, categoryEdit } = this.state;
        const renderWords = this.state.words.map((word) =>
            <tr key={word.id}>
                <td>{word.eng}</td>
                <td>{word.vie}</td>
                <td>{word.wordCategory}</td>
                <td>{word.examples.map((example) =>
                    <p key={example.id}>{example.eng} / {example.vie}</p>
                )}</td>
                <td><img width="50px" height="50px" src={word.wordImg}></img></td>

                <td>
                    <Button data-id={word.id} variant="primary" className="btn btn-primary mr-2" onClick={e => { this.openEdit(e); this.selectWord(e) }}><i data-id={word.id} className="fa fa-edit" /></Button>
                    <Button data-id={word.id} variant="primary" className="btn btn-danger" onClick={e => { this.openDelete(e); this.selectWord(e) }}><i data-id={word.id} className="fa fa-trash" /></Button>
                </td>
            </tr>
        );
        return (
            <div>
                
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /> Thêm từ vựng</Button>
                <Link to="/quanly-tuvung/quanly-vidu" className="btn btn-primary float-right">Thêm ví dụ</Link>
                {this.isComponentMounted && <table className="table table-bordered" id="dataTable1" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="english">English</th>
                            <th className="vietnam">Việt Nam</th>
                            <th className="loaitu">Loại từ vựng</th>
                            <th >Ví dụ</th>
                            <th className="hinhanh">Hình ảnh</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        {renderWords}
                    </tbody>

                </table>}
                {/* Modal create */}
                <Modal show={this.state.modalCreate} onHide={this.closeCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm từ vựng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>English</span>
                                <input
                                    type="text"
                                    value={englishCreate}
                                    name="englishCreate"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Việt Nam</span>
                                <input
                                    type="text"
                                    value={vietNamCreate}
                                    name="vietNamCreate"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Phát âm</span>
                                <input
                                    type="text"
                                    value={spellingCreate}
                                    name="spellingCreate"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>File phát âm</span>
                                <input
                                    type="file"
                                    name="audio"
                                    accept="audio/*"
                                    onChange={this.onFileChange}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Loại từ</span>
                                <select
                                    value={categoryCreate}
                                    onChange={e => this.handleChange(e)}
                                    name="categoryCreate" required>
                                    <option value="">- Chọn loại từ -</option>
                                    <option value="Danh từ">Danh từ</option>
                                    <option value="Tính từ">Tính từ</option>
                                    <option value="Động từ">Động từ</option>
                                    <option value="Trạng từ">Trạng từ</option>
                                </select>
                            </div>
                            <div className="card-input">
                                <span>Hình ảnh minh họa</span>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="imageCreate"
                                    onChange={this.onFileChange}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete} onHide={this.closeDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa từ vựng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa từ vựng này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit} onHide={this.closeEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật từ vựng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>English</span>
                                <input
                                    type="text"
                                    value={englishEdit}
                                    name="englishEdit"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Việt Nam</span>
                                <input
                                    type="text"
                                    value={vietNamEdit}
                                    name="vietNamEdit"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Phát âm</span>
                                <input
                                    type="text"
                                    value={spellingEdit}
                                    name="spellingEdit"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Loại từ</span>
                                <select
                                    value={categoryEdit}
                                    onChange={e => this.handleChange(e)}
                                    name="categoryEdit" required>
                                    <option value="">- Chọn loại từ -</option>
                                    <option value="n">Danh từ</option>
                                    <option value="adj">Tính từ</option>
                                    <option value="v">Động từ</option>
                                    <option value="adv">Trạng từ</option>
                                </select>
                            </div>
                            <div className="card-input mt-2">
                                <img src={this.state.oldImage} alt="" width="100px" height="100px" />
                            </div>
                            <div className="card-input">
                                <span>Hình ảnh minh họa </span>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="imageEdit"
                                    onChange={this.onFileChange}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListTuVung;