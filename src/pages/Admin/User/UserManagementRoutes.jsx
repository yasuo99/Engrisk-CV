import React, { Component, useEffect, useRef, useState } from "react";
import { Modal, Button, Table,Tabs, Tab } from "react-bootstrap";
import Paginate from "../../../components/pagination/Paginate";
import routeApi from "../../../api/2.0/routeApi";
import { toast } from "react-toastify";
import Sections from "../../../components/sections/Sections";
import { Link } from "react-router-dom";
import Search from "../../../components/search/Search";
import HeaderClient from "../../../components/client/HeaderClient";
import SubMenuClient from "../../../components/client/SubMenuClient";
import { useSelector } from "react-redux";
const UserManagementRoutes = () => {
  const defaultData = {
    title: "",
    image: null,
    description: "",
  };
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalSections, setModalSections] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState({});
  const [data, setData] = useState(defaultData);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
  });
  const [status, setStatus] = useState({
      isPrivate: true,
      status: 'Nope'
  })
  const {account} = useSelector(state => state.auth)
  const tempRoutes = useRef(null);

  useEffect(async () => {
    const paging = {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    };
    const result = await routeApi.userGetAll(account.id, paging,status.isPrivate, status.status);
    setRoutes(result.items);
    tempRoutes.current = result.items;
  }, [pagination]);
  function toggleModalCreate() {
    setData(defaultData);
    setModalCreate(!modalCreate);
  }
  function toggleModalEdit(route) {
    setData(defaultData);
    setRoute(route);
    setModalEdit(!modalEdit);
  }
  function toggleModalDelete(route) {
    setData(defaultData);
    setRoute(route);
    setModalDelete(!modalDelete);
  }
  function toggleModalSections(route) {
    setRoute(route);
    setModalSections(!modalSections);
  }
  async function submitCreate() {
    console.log(data);
    var formData = new FormData();
    formData.set("title", data.title);
    formData.set("description", data.description);
    formData.set("image", data.image);
    const result = await routeApi.createRoute(formData);
    if (result.status == 200) {
      toast("Thêm thành công", { type: "success" });
      setModalCreate(!modalCreate);
      setRoutes([...routes, result.route]);
    } else {
      toast("Thêm thất bại", { type: "error" });
    }
  }
  async function submitEdit() {
    setModalCreate(!modalEdit);
  }
  async function submitDelete() {
    setModalCreate(!modalDelete);
  }
  async function pageChange(currentPage, pageSize) {
    const params = {
      currentPage: currentPage,
      pageSize: pageSize,
    };
    setPagination({
      ...pagination,
      currentPage: params.currentPage,
      pageSize: params.pageSize,
    });
  }
  function querySearch(query) {
    if (query == "") {
      console.log(tempRoutes.current);
      setRoutes([...tempRoutes.current]);
    } else {
      setRoutes(
        routes.filter(
          (route) =>
            route.title.toLowerCase().includes(query.toLowerCase()) ||
            route.description.toLowerCase().includes(query.toLowerCase()) ||
            route.sections.length === parseInt(query)
        )
      );
    }
  }
  return (
    <div id="wrapper">
      <SubMenuClient></SubMenuClient>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderClient></HeaderClient>
          <div className="container-fluid mt-4">
            <Tabs defaultActiveKey="section" id="controlled-tab-example">
              <Tab
                eventKey="section"
                title="Danh sách bài học"
                tabClassName="font-weight-bold"
              ></Tab>
              <Tab
                eventKey="route"
                title="Danh sách lộ trình học"
                tabClassName="font-weight-bold"
              >
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Quản lý lộ trình
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => toggleModalCreate()}
                      >
                        Thêm lộ trình <i className="fa fa-plus"></i>
                      </button>
                      <Search queryFunction={querySearch}></Search>
                    </div>

                    <div className="table-responsive">
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Tiêu đề</th>
                            <th>Ảnh</th>
                            <th>Mô tả</th>
                            <th>Số lượng bài học</th>
                            <th>Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {routes.map((route, index) => (
                            <tr key={index}>
                              <th>{route.title}</th>
                              <th className="w-25">
                                <img
                                  className="img-thumbnail"
                                  src={route.routeImage}
                                />
                              </th>
                              <th>{route.description}</th>
                              <th>{route.sections.length}</th>
                              <th>
                                <Link
                                  className="btn btn-info ml-1 btn-delete"
                                  to={`/admin/quan-ly-lo-trinh/${route.id}/bai-hoc`}
                                >
                                  <i className="fa fa-table"></i>
                                </Link>
                                <button
                                  className="btn btn-success ml-1"
                                  onClick={() => toggleModalEdit(route)}
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-danger btn-delete ml-1"
                                  onClick={() => toggleModalDelete(route)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <div>
                        <Paginate
                          currentPage={pagination.currentPage}
                          totalPages={pagination.totalPages}
                          pageSize={pagination.pageSize}
                          change={pageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <Modal
          show={modalCreate}
          onHide={() => toggleModalCreate()}
          contentClassName="modal-basic-content"
        >
          <Modal.Header closeButton onClick={() => toggleModalCreate()}>
            <Modal.Title>Thêm lộ trình học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <p className="titleInfo">Thông tin lộ trình</p>
              <div className="card-input mt-3">
                <span>Tiêu đề</span>
                <input
                  type="text"
                  name="url"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
              </div>
              <div className="card-input mt-3">
                <span>Hình ảnh</span>
                <input
                  type="file"
                  onChange={(e) =>
                    setData({ ...data, image: e.target.files[0] })
                  }
                />
              </div>
              <div className="card-input mt-3">
                <span>Mô tả</span>
                <input
                  type="text"
                  name="url"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalCreate()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={(e) => submitCreate()}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={modalSections}
          onHide={() => toggleModalSections()}
          dialogClassName="modal-90w"
          contentClassName="modal-90w-content"
          scrollable={true}
        >
          <Modal.Header closeButton onClick={() => toggleModalSections()}>
            <Modal.Title>Quản lý bài học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Sections data={route.sections} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalSections()}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={(e) => submitCreate()}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={modalEdit}
          onHide={() => toggleModalEdit({})}
          contentClassName="modal-basic-content"
        >
          <Modal.Header closeButton onClick={() => toggleModalEdit({})}>
            <Modal.Title>Thêm nhóm từ vựng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <p className="titleInfo">Thông tin cũ</p>
                    <div className="card-input mt-3">
                      <span>Tiêu đề</span>
                      <input
                        type="text"
                        name="url"
                        value={route.title}
                        readOnly
                      />
                    </div>
                    <div className="card-input mt-3">
                      <span>Hình ảnh</span>
                      <img className="img-thumbnail" src={route.routeImage} />
                    </div>
                    <div className="card-input mt-3">
                      <span>Mô tả</span>
                      <input
                        type="text"
                        name="url"
                        value={route.description}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="titleInfo">Thông tin mới</p>
                    <div className="card-input mt-3">
                      <span>Tên nhóm</span>
                      <input
                        type="text"
                        name="url"
                        onChange={(e) =>
                          setData({ ...data, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="card-input mt-3">
                      <span>Hình ảnh</span>
                      <input
                        type="file"
                        onChange={(e) =>
                          setData({ ...data, image: e.target.files[0] })
                        }
                      />
                    </div>
                    <div className="card-input mt-3">
                      <span>Mô tả</span>
                      <input
                        type="text"
                        name="url"
                        onChange={(e) =>
                          setData({ ...data, description: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalEdit({})}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={(e) => submitEdit()}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={modalDelete}
          onHide={() => toggleModalDelete({})}
          contentClassName="modal-basic-content"
        >
          <Modal.Header closeButton onClick={() => toggleModalDelete({})}>
            <Modal.Title>Xác nhận xóa nhóm từ vựng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn xóa nhóm từ vựng này không?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalDelete({})}>
              Trở lại
            </Button>
            <Button variant="primary" onClick={(e) => submitDelete()}>
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default UserManagementRoutes;
