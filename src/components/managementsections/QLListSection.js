import React, { Component } from "react";
import { connect } from "react-redux";
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import "datatables.net-dt/js/dataTables.dataTables.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Button, Modal } from "react-bootstrap";
import QLSection from "./QLSection";
import sectionApi from "../../api/sectionApi";
import Switch from "react-switch";
import { toast } from "react-toastify";
import ModalListQuizzes from "../modalcauhoi/ModalListQuizzes";
import format from "../../constants/format";
export class QLListSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreate: false,
      modalEdit: false,
      modalDelete: false,
      modalQuizzesEdit: false,
      sectionName: "",
      description: "",
      file: {},
      sections: [],
      selectedSection: 0,
      formValidation: {
        sectionName: -1,
        sectionNameError: '',
        description: -1,
        descriptionError: ''
      }
    };
    this.isComponentMounted = false;
  }
  async componentDidMount() {
    this.isComponentMounted = true;

    const sections = await this.fetchSection();
    if (this.isComponentMounted) {
      this.setState({
        sections: sections,
      });
      $(function () {
        $("#dataTableSection").DataTable();
      });
    }
  }
  fetchSection = async () => {
    return sectionApi.getManage();
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(format.test(e.target.value));
  }
  fileChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }
  submitCreate = async () => {
    if (this.state.sectionName === "") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          sectionName: 0,
          sectionNameError: 'Không được để trống'
        }
      })
    } else {
      if (format.test(this.state.sectionName)) {
        this.setState({
          formValidation: {
            ...this.state.formValidation,
            sectionName: 0,
            sectionNameError: 'Không được chứa kí tự đặc biệt'
          }
        })
      } else {
        let formData = new FormData();
        formData.append("sectionName", this.state.sectionName.trim());
        formData.append("description", this.state.description.trim());
        formData.append("file", this.state.file);
        try {
          const result = await sectionApi.create(formData);
          if (result) {
            if (result.status === 200) {
              toast("Thêm thành công");
              const sections = await this.fetchSection();
              if (this.isComponentMounted) {
                this.setState({
                  sections: sections,
                  modalCreate: false,
                  sectionName: "",
                  description: "",
                  file: {},
                  formValidation: {
                    ...this.state.formValidation,
                    sectionName: -1,
                    sectionNameError: ''
                  }
                });
              }
            }
            if (result.status === 409) {
              toast("Section trùng");
            }
          }
        } catch (error) {
          toast("Thất bại");
          console.log(error);
        }
      }

    }
  };
  submitEdit() {
    console.log(this.state);
  }
  openEdit = (e) => {
    console.log(e.target.dataset.id);
  };
  selectSection = (e) => {
    console.log(e.target.dataset.id);
    if (e) {
      if (e.target.dataset.id) {
        this.setState({
          selectedSection: e.target.dataset.id,
        });
      }
    }
  };
  modalCreate = () => {
    this.state.modalCreate
      ? this.setState({ modalCreate: false })
      : this.setState({ modalCreate: true });
  };
  modalEdit = () => {
    this.state.modalEdit
      ? this.setState({ modalEdit: false })
      : this.setState({ modalEdit: true });
  };
  modalDelete = () => {
    this.state.modalDelete
      ? this.setState({ modalDelete: false })
      : this.setState({ modalDelete: true });
  };
  requireLogin = async (id) => {
    try {
      const result = await sectionApi.setRequireLogin(id);
      if (result.status === 200) {
        toast("Thành công");
        const sections = await this.fetchSection();
        if (this.isComponentMounted) {
          this.setState({
            sections: sections,
          });
        }
      } else {
        toast("Thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  submitDelete = async () => {
    try {
      const result = await sectionApi.delete(this.state.selectedSection);
      if (result.status === 204) {
        toast("Xóa thành công");
        const sections = await this.fetchSection();
        if (this.isComponentMounted) {
          this.setState({
            sections: sections,
            modalDelete: false,
          });
        }
      } else {
        toast("Xóa thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  submitUpdate = async () => {
    let formData = new FormData();
    formData.append("sectionName", this.state.sectionName);
    formData.append("description", this.state.description);
    formData.append("file", this.state.file);
    try {
      const result = await sectionApi.update(
        this.state.selectedSection,
        formData
      );
      if (result) {
        if (result.status === 200) {
          toast("Sửa thành công");
          const sections = await this.fetchSection();
          if (this.isComponentMounted) {
            this.setState({
              sections: sections,
              modalCreate: false,
              sectionName: "",
              description: "",
              file: {},
            });
          }
        }
        if (result.status === 409) {
          toast("Section trùng");
        }
      }
    } catch (error) {
      toast("Thất bại");
      console.log(error);
    }
  };
  modalQuizzesEdit = () => {
    this.state.modalQuizzesEdit
      ? this.setState({ modalQuizzesEdit: false })
      : this.setState({ modalQuizzesEdit: true });
  };
  render() {
    const renderSection = this.state.sections.map((section) => (
      <tr key={section.id}>
        <td style={{ width: "250px" }}>{section.sectionName}</td>
        <td style={{ width: "60px" }}>
          <img src={section.photoUrl} alt="" width="50px" height="50px" />
        </td>
        <td style={{ width: "300px" }}>{section.description}</td>
        <td style={{ width: "50px" }}>{section.totalQuizzes}</td>
        <td style={{ width: "80px" }}>
          <Switch
            id={section.id}
            onChange={(props, event, id) => this.requireLogin(id)}
            checked={section.requireLogin}
          ></Switch>
        </td>
        <td>
          <Button
            data-id={section.id}
            variant="primary"
            className="btn btn-primary mr-2"
            onClick={(e) => {
              this.modalEdit(e);
              this.selectSection(e);
            }}
          >
            <i data-id={section.id} className="fa fa-edit" />
          </Button>
          <Button
            data-id={section.id}
            variant="success"
            className="btn btn-success mr-2"
            onClick={(e) => {
              this.modalQuizzesEdit(e);
              this.selectSection(e);
            }}
          >
            <i data-id={section.id} className="fa fa-bars" />
          </Button>
          <Button
            data-id={section.id}
            variant="danger"
            className="btn btn-danger btn-delete"
            onClick={(e) => {
              this.modalDelete(e);
              this.selectSection(e);
            }}
          >
            <i data-id={section.id} className="fa fa-trash" />
          </Button>
        </td>
      </tr>
    ));
    const { sectionName, description } = this.state;
    return (
      <div>
        <button
          className="btn btn-primary mr-2 mb-3"
          onClick={(e) => this.modalCreate(e)}
        >
          <i className="fa fa-plus" /> Thêm bài học
        </button>
        <Modal show={this.state.modalCreate} onHide={this.modalCreate}>
          <Modal.Header closeButton onClick={() => this.modalCreate()}>
            <Modal.Title>Thêm bài học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="createForm" onSubmit={this.submitCreate} className='was-validated'>
              <div className="form-group">
                <div className="card-input">
                  <span>Tên bài học</span>
                  <input
                    type="text"
                    value={sectionName}
                    name="sectionName"
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                  {this.state.formValidation.sectionName == 0 && <div className="invalid-feedback">
                    {this.state.formValidation.sectionNameError}
                  </div>
                  }
                </div>
                <div className="card-input">
                  <span>Hình ảnh</span>
                  <input
                    type="file"
                    name="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => this.fileChange(e)}
                    required
                  />
                </div>
                <div className="card-input">
                  <span>Mô tả</span>
                  <input
                    type="text"
                    value={description}
                    name="description"
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                  {this.state.formValidation.description ? <div className="valid-feedback">
                    Looks good!
                  </div> :
                    <div class="invalid-feedback">
                      Looks not good!
                    </div>
                  }
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.modalCreate()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={(e) => this.submitCreate(e)}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {this.isComponentMounted && (
          <table
            className="table table-bordered"
            id="dataTableSection"
            width="100%"
            cellSpacing={0}
          >
            <thead>
              <tr>
                <th>Tên section</th>
                <th>Hình ảnh</th>
                <th>Mô tả</th>
                <th>Số bài quiz</th>
                <th>Yêu cầu đăng nhập</th>
                <th className="chucnang">Chức năng</th>
              </tr>
            </thead>
            <tbody>{renderSection}</tbody>
          </table>
        )}
        <Modal show={this.state.modalEdit} onHide={this.modalEdit}>
          <Modal.Header closeButton onClick={() => this.modalEdit()}>
            <Modal.Title>Sửa bài học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitCreate}>
              <div className="form-group">
                <div className="card-input">
                  <span>Tên bài học</span>
                  <input
                    type="text"
                    value={sectionName}
                    name="sectionName"
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                </div>
                <div className="card-input">
                  <span>Hình ảnh</span>
                  <input
                    type="file"
                    name="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => this.fileChange(e)}
                    required
                  />
                </div>
                <div className="card-input">
                  <span>Mô tả</span>
                  <input
                    type="text"
                    value={description}
                    name="description"
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.modalEdit()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={this.submitUpdate}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.modalQuizzesEdit}
          onHide={this.modalQuizzesEdit}
        >
          <Modal.Header closeButton onClick={() => this.modalQuizzesEdit()}>
            <Modal.Title>Quản lý quizzes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalListQuizzes
              id={this.state.selectedSection}
            ></ModalListQuizzes>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.modalQuizzesEdit()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={this.submitUpdate}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.modalDelete} onHide={this.modalDelete}>
          <Modal.Header closeButton onClick={this.modalDelete}>
            <Modal.Title>Xác nhận xóa bài học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn xóa bài học này ra khỏi hệ thống không?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.modalDelete()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={this.submitDelete}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(QLListSection);
