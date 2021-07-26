import { useEffect, useState } from "react";
import SubMenu from './../../components/admin/SubMenu';
import HeaderAdmin from './../../components/admin/HeaderAdmin';
import Search from './../../components/search/Search';
import { Modal, Table, Button } from 'react-bootstrap';
import Paginate from './../../components/pagination/Paginate';
import certificateApi from "../../api/2.0/certificateApi";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
const ManagementCertificate = ({ }) => {
    const [certificates, setCertificates] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 5,
        items: [],
    });
    const [renderImage, setRenderImage] = useState({})
    const [modalCreate, setModalCreate] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalLock, setModalLock] = useState(false);
    const [selectCertificate, setSelectCertificate] = useState({})
    const [query, setQuery] = useState('')
    const [isBusy, setIsBusy] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, unregister } = useForm();
    async function fetchData() {
        const params = {
            currentPage: certificates.currentPage,
            pageSize: certificates.pageSize,
            search: query
        }
        const result = await certificateApi.getAll(params);
        setCertificates(result)
    }
    useEffect(() => {
        if (isRefresh) {
            fetchData();
            setIsRefresh(false);
        }
    }, [isRefresh])
    useEffect(() => {
        fetchData();
        setIsBusy(false);
    }, [certificates.currentPage, certificates.pageSize, query])
    function toggleModalDelete(certificate) {
        setSelectCertificate(certificate);
        setModalDelete(!modalDelete)
    }
    function toggleModalCreate() {
        reset();
        setRenderImage({})
        setModalCreate(!modalCreate)
    }
    function toggleModalEdit(certificate) {
        unregister('template')
        reset();
        setRenderImage({})
        setSelectCertificate(certificate);
        console.log(certificate);
        setModalEdit(!modalEdit)
    }
    function toggleModalLock() {

    }
    function pageChange(currentPage, pageSize) {
        setCertificates({
            ...certificates,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function search(query) {
        setQuery(query);
        setCertificates({
            ...certificates,
            currentPage: 1
        })
    }
    const submitCreate = async (data) => {
        let formData = new FormData();
        formData.set('subject', data.subject);
        formData.set('title', data.title);
        formData.set('lifeTime', data.lifeTime);
        formData.set('template', data.template[0]);
        const result = await certificateApi.create(formData);
        if (result.status == 200) {
            toast('Thành công', { type: 'success' })
            toggleModalCreate();
            setIsRefresh(true);
        } else {
            toast('Thất bại', { type: 'error' })
        }
    }
    const submitEdit = async (data) => {
        let formData = new FormData();
        formData.set('subject', data.subject);
        formData.set('title', data.title);
        formData.set('lifeTime', data.lifeTime);
        formData.set('template', data.template[0] || null);
        const result = await certificateApi.update(selectCertificate.id,formData);
        if (result.status == 200) {
            toast('Thành công', { type: 'success' })
            toggleModalEdit({})
            setIsRefresh(true);
        } else {
            toast('Thất bại', { type: 'error' })
        }
    }
    async function submitDelete() {
        const result = await certificateApi.delete(selectCertificate.id);
        if (result.status == 200) {
            toast('Thành công', { type: 'success' })
            setIsRefresh(true);
            toggleModalDelete({})
        } else {
            toast('Thất bại', { type: 'error' })
        }
    }
    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Quản lý chứng chỉ
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-word mb-2" onClick={() => toggleModalCreate()}>
                                            <i className='fa fa-plus'></i> Thêm chứng chỉ
                                        </button>
                                        <Search queryFunction={search}></Search>
                                    </div>

                                    <div className="table-responsive">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Tên chứng chỉ</th>
                                                    <th>Tiêu đề</th>
                                                    <th className='table-image'>Template</th>
                                                    <th>Vòng đời</th>
                                                    <th>Thuộc lộ trình</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {certificates.items.map((certificate, index) => (
                                                    <tr key={index}>
                                                        <td>{certificate.subject}</td>
                                                        <td>{certificate.title}</td>
                                                        <td><img className='img-fluid' src={certificate.template}></img></td>
                                                        <td>{certificate.lifeTime}</td>
                                                        <td>{certificate?.route?.title}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() => toggleModalEdit(certificate)}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-delete ml-1"
                                                                onClick={() => toggleModalDelete(certificate)}
                                                            >
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <div>
                                            <Paginate
                                                currentPage={certificates.currentPage}
                                                totalPages={certificates.totalPages}
                                                pageSize={certificates.pageSize}
                                                change={pageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {modalCreate && <Modal show={modalCreate} animation onHide={() => toggleModalCreate()} centered size="lg" animation>
                    <Modal.Body>
                        <div className='text-center'>
                            <h3 className='text-info'> Thêm chứng chỉ</h3>
                        </div>
                        <form id="create-form" className="form-group" onSubmit={handleSubmit(submitCreate)}>
                            <div className="container">
                                <div>
                                    <div>Tên chứng chỉ</div>
                                    <div className="wrap-input100 mb-3">
                                        <input className="input100" name="title" placeholder='Nhập tên' {...register('subject',
                                            {
                                                required: 'Tên của chứng chỉ không được để trống'
                                            })}
                                            type="text"
                                            id="title"
                                            autoComplete="off"
                                        ></input>
                                        {errors.subject && <div className='invalid'>{errors.subject.message}</div>}
                                    </div>


                                    <div>Tiêu đề</div>
                                    <div className="wrap-input100">
                                        <textarea className="input100" name="description" placeholder='Nhập tiêu đề' {...register('title',
                                            {
                                                required: 'Tiêu đề của chứng chỉ không được để trống'
                                            })}
                                            type="text"
                                            id="title"
                                            autoComplete="off"
                                        ></textarea>
                                        {errors.title && <div className='invalid'>{errors.title.message}</div>}
                                    </div>
                                    <div className='row'>
                                        <div className="card-input mt-3 col-6">
                                            <span>Mẫu</span>
                                            <input type='file' accept="image/png, image/jpeg" {...register('template', { required: 'Mẫu của chứng chỉ không được để trống' })} onChange={(e) => {
                                                var image = URL.createObjectURL(e.target.files[0])
                                                setRenderImage(image);
                                            }}></input>
                                            {errors.template && <div className='invalid'>{errors.template.message}</div>}
                                        </div>
                                        <div className='col-6'>
                                            <span>Hình được chọn</span>
                                            <img className="img-thumbnail" src={renderImage} alt='Chưa chọn'></img>
                                        </div>
                                    </div>
                                    <div>Vòng đời (tháng)</div>
                                    <div className="wrap-input100">
                                        <input className="input100" name="description" placeholder='Nhập vòng đời' {...register('lifeTime',
                                            {
                                                required: 'Vòng đời của chứng chỉ không được để trống',
                                                valueAsNumber: true,
                                                min: { value: 1, message: 'Vòng đời tối thiểu là 1 tháng' },
                                                max: { value: 12, message: 'Vòng đời tối đa là 12 tháng' }
                                            })}
                                            type="number"
                                            id="title"
                                            autoComplete="off"
                                            defaultValue={1}
                                        ></input>
                                        {errors.lifeTime && <div className='invalid'>{errors.lifeTime.message}</div>}
                                    </div>

                                </div>
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => toggleModalCreate()}>Trở lại</Button>
                        <Button variant="primary" form="create-form" type="submit">Lưu lại</Button>
                    </Modal.Footer>
                </Modal>}
                {Object.keys(selectCertificate).length > 0 && <Modal show={modalEdit} animation onHide={() => toggleModalEdit({})} centered size="lg" animation>
                    <Modal.Body>
                        <div className='text-center mb-3'>
                            <h3 className='text-info'> Cập nhật chứng chỉ</h3>
                        </div>
                        <form id="edit-form" className="form-group" onSubmit={handleSubmit(submitEdit)}>
                            <div className="form-row">
                                <div className='col'>
                                    <h6>Thông tin cũ</h6>
                                    <div className='card-input mt-3'>
                                        <span>Tên chứng chỉ</span>
                                        <p>{selectCertificate.subject}</p>
                                    </div>
                                    <div className='card-input mt-3'>
                                        <span>Tiêu đề</span>
                                        <p>{selectCertificate.title}</p>
                                    </div>
                                    <div className='card-input mt-3'>
                                        <span>Hình ảnh</span>
                                        <img className='img-thumbnail' src={selectCertificate.template}></img>
                                    </div>
                                    <div className='card-input mt-3'>
                                        <span>Vòng đời</span>
                                        <p>{selectCertificate.lifeTime} tháng</p>
                                    </div>
                                </div>
                                <div className='col'>
                                    <h6>Thông tin mới</h6>
                                    <div>Tên chứng chỉ</div>
                                    <div className="wrap-input100 mb-3">
                                        <input className="input100" name="title" placeholder='Nhập tên' {...register('subject',
                                            {
                                                required: 'Tên của chứng chỉ không được để trống'
                                            })}
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={selectCertificate.subject}
                                        ></input>
                                        {errors.subject && <div className='invalid'>{errors.subject.message}</div>}
                                    </div>


                                    <div>Tiêu đề</div>
                                    <div className="wrap-input100">
                                        <textarea className="input100" name="description" placeholder='Nhập tiêu đề' {...register('title',
                                            {
                                                required: 'Tiêu đề của chứng chỉ không được để trống'
                                            })}
                                            type="text"
                                            autoComplete="off"
                                            defaultValue={selectCertificate.title}
                                        ></textarea>
                                        {errors.title && <div className='invalid'>{errors.title.message}</div>}
                                    </div>
                                    <div className='row'>
                                        <div className="card-input mt-3 col-6">
                                            <span>Mẫu</span>
                                            <input type='file' accept="image/png, image/jpeg" {...register('template')} onChange={(e) => {
                                                var image = URL.createObjectURL(e.target.files[0])
                                                setRenderImage(image);
                                            }}></input>
                                        </div>
                                        <div className='col-6'>
                                            <span>Hình được chọn</span>
                                            <img className="img-thumbnail" src={renderImage} alt='Chưa chọn'></img>
                                        </div>
                                    </div>
                                    <div>Vòng đời (tháng)</div>
                                    <div className="wrap-input100">
                                        <input className="input100" name="description" placeholder='Nhập vòng đời' {...register('lifeTime',
                                            {
                                                required: 'Vòng đời của chứng chỉ không được để trống',
                                                valueAsNumber: true,
                                                min: { value: 1, message: 'Vòng đời tối thiểu là 1 tháng' },
                                                max: { value: 12, message: 'Vòng đời tối đa là 12 tháng' }
                                            })}
                                            type="number"
                                            autoComplete="off"
                                            defaultValue={selectCertificate.lifeTime}
                                        ></input>
                                        {errors.lifeTime && <div className='invalid'>{errors.lifeTime.message}</div>}
                                    </div>

                                </div>
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => toggleModalEdit()}>Hủy</Button>
                        <Button variant="primary" form="edit-form" type="submit">Lưu lại</Button>
                    </Modal.Footer>
                </Modal>}
                <Modal
                    show={modalDelete}
                    onHide={() => toggleModalDelete({})}
                    contentClassName="modal-basic-content"
                    dialogClassName='sweet-alert-modal'
                    animation
                >
                    <Modal.Body>
                        <div className='text-center'>
                            <i className='fa fa-4x fa-warning text-danger'></i>
                            <br></br>
                            <br></br>
                            <h3 className='text-info'>Bạn có chắc muốn xóa chứng chỉ này không ?</h3>
                            <p className='text-danger'>
                                Không thể hoàn tác
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => toggleModalDelete({})}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={(e) => submitDelete()}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default ManagementCertificate;