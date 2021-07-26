import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import wordCategoryApi from "../../api/2.0/wordCategoryApi";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import SubMenu from "../../components/admin/SubMenu";
import { toast } from "react-toastify";
import Paginate from "../../components/pagination/Paginate";
import Search from "../../components/search/Search";
import categoryTagApi from "../../api/2.0/categoryTagApi";
import { useForm } from 'react-hook-form'
const ManagementCategories = () => {
  const [category, setCategory] = useState({});
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [categories, setCategories] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
    items: []
  });
  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState([])
  const [isRefresh, setIsRefresh] = useState(false);
  const [query, setQuery] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  async function fetchCategories() {
    const params = {
      currentPage: categories.currentPage,
      pageSize: categories.pageSize,
      search: query,
      tag: 'all'
    }
    const result = await wordCategoryApi.getAll(params);
    setCategories(result);
    const tags = await categoryTagApi.getAllWithoutPaginate();
    setTags(tags);
  }
  useEffect(() => {
    fetchCategories();
  }, [categories.currentPage, categories.pageSize, query]);
  useEffect(() => {
    if (isRefresh) {
      fetchCategories();
      setIsRefresh(false);
    }
  }, [isRefresh])
  function toggleModalCreate() {
    reset();
    modalCreate ? setModalCreate(false) : setModalCreate(true);
  }
  const create = async (data) => {
    console.log(name, " ", image);
    var formData = new FormData();
    formData.set("CategoryName", data.name);
    formData.set("Image", image);
    newTags.forEach((val, idx) => {
      formData.append(`tags[${idx}].id`, val.id)
    }
    )
    const result = await wordCategoryApi.createWordCategory(formData);
    console.log(result);
    switch (result.status) {
      case 200:
        toast("Thêm thành công", { type: "success" });
        setIsRefresh(true)
        break;
      case 409:
        toast("Tài nguyên trùng", { type: "warning" });
        break;
      default:
        toast("Thêm thất bại", { type: "error" });
        break;
    }
    setName("");
    setImage({});
    toggleModalCreate();
    setNewTags([]);
  }
  function toggleModalEdit(category) {
    modalEdit ? setModalEdit(false) : setModalEdit(true);
    setCategory(category);
  }
  const edit = async (source) => {
    var formData = new FormData();
    formData.set("CategoryName", source.name || data.categoryName);
    formData.set("Image", image);
    category.tags.forEach((val, idx) => {
      formData.append(`tags[${idx}].categoryTagId`, val.categoryTagId)
    })
    const result = await wordCategoryApi.updateWordCategory(
      category.id,
      formData
    );
    switch (result.status) {
      case 200:
        toast("Cập nhật thành công", { type: "success" });
        setIsRefresh(true)
        setNewTags([])
        break;
      case 204:
        toast("Không cập nhật dữ liệu mới", { type: "info" });
        break;
      case 404:
        toast("Không tìm thấy tài nguyên", { type: "warning" });
        break;
      case 409:
        toast("Tài nguyên trùng", { type: "warning" });
        break;
      default:
        toast("Cập nhật thất bại", { type: "error" });
        break;
    }
    setName("");
    setImage({});
    toggleModalEdit({});
  }
  function toggleModalDelete(category) {
    modalDelete ? setModalDelete(false) : setModalDelete(true);
    setCategory(category);
  }
  async function submitDelete() {
    const result = await wordCategoryApi.deleteWordCategory(category.id);
    switch (result.status) {
      case 404:
        toast("Không tìm thấy tài nguyên", { type: "warning" });
        break;
      default:
        toast("Xóa thành công", { type: "success" });
        setIsRefresh(true)
        break;
    }
    setName("");
    setImage({});
    toggleModalDelete({});
  }
  async function pageChange(currentPage, pageSize) {
    setCategories({
      ...categories,
      currentPage: currentPage,
      pageSize: pageSize
    })
  }
  function search(query) {
    setQuery(query);
    setCategories({
      ...categories,
      currentPage: 1
    })
  }
  function selectTag(e, tag) {
    if (e.currentTarget.checked) {
      setNewTags([...newTags, tag])
    } else {
      setNewTags([...newTags.filter(val => val != tag)])
    }
  }
  function editTag(e, tag) {
    console.log(tag);
    if (e.currentTarget.checked) {
      setCategory({ ...category, tags: [...category.tags, { categoryTagId: tag.id }] })
      console.log(category);
    } else {
      setCategory({ ...category, tags: [...category.tags.filter(val => val.categoryTagId != tag.id)] })
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
                    Quản lý phân nhóm từ vựng
                  </h6>
                </div>
                <div className="card-body">
                  <div className='d-flex justify-content-between'>
                    <button
                      className="btn btn-primary mb-2"
                      onClick={toggleModalCreate}
                    >
                      Thêm nhóm từ vựng
                    </button>
                    <Search queryFunction={search}></Search>
                  </div>

                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Tên nhóm</th>
                          <th className="table-image">Ảnh</th>
                          <th>Số lượng từ vựng</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.items.map((category, index) => (
                          <tr key={index}>
                            <td>{category.categoryName}</td>
                            <td>
                              <img
                                className="img-fluid"
                                src={category.categoryImage}
                              />
                            </td>
                            <td>{category.words.length}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => toggleModalEdit(category)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-delete ml-1"
                                onClick={() => toggleModalDelete(category)}
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
                        currentPage={categories.currentPage}
                        totalPages={categories.totalPages}
                        pageSize={categories.pageSize}
                        change={pageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={modalCreate} onHide={() => toggleModalCreate()} centered dialogClassName="modal-90w" contentClassName="rounded" size="lg" animation>
          <Modal.Body>
            <div className='text-center'>
              <h3 className='text-info'> Thêm nhóm từ vựng</h3>
            </div>
            <form className="form-group" id="create-form" onSubmit={handleSubmit(create)}>
              <div className='form-row script-panel'>
                <div className='col'>
                  <h5>Thông tin cơ bản</h5>
                  <div>Tiêu đề</div>
                  <div className="wrap-input100 mb-3">
                    <input className="input100" name="title" placeholder='Nhập tên nhóm' {...register('name',
                      {
                        required: 'Tên nhóm không được để trống'
                      })}
                      type="text"
                      id="title"
                      autoComplete="off"
                    ></input>
                    {errors.name && <div className='invalid'>{errors.name.message}</div>}
                  </div>
                  <div className="card-input mb-3">
                    <span>Hình ảnh</span>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className='col'>
                  <h5>Thông tin thêm</h5>
                  <div>Tag</div>
                  <div className='card-input'>
                    <div className='categories-tab'>
                      <ul className="list-group list-group-flush checkbox-wrapper">
                        {tags.map((tag, index) =>
                          <li className="list-group-item" key={index}>
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input top" onChange={(e) => selectTag(e, tag)}></input>
                              <label className="custom-control-label">{tag.tag}</label>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalCreate()}>
              Trở lại
            </Button>
            <Button variant="primary" form="create-form" type="submit">
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>
        {Object.keys(category).length > 0 && <Modal show={modalEdit} onHide={() => toggleModalEdit({})} contentClassName="modal-basic-content">
          <Modal.Body>
          <div className='text-center'>
              <h3 className='text-info'> Cập nhật từ vựng</h3>
            </div>
            <br></br>
            <div className="form-group">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <p className="titleInfo">Thông tin cũ</p>
                    <div className="card-input mt-3">
                      <span>Tên nhóm</span>
                      <input
                        type="text"
                        name="url"
                        value={category.categoryName}
                        readOnly
                      />
                    </div>
                    <div className="card-input mt-3">
                      <span>Hình ảnh</span>
                      <img
                        className="img-thumbnail"
                        src={category.categoryImage}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="titleInfo">Thông tin mới</p>
                    <form className="form-group" id="edit-form" onSubmit={handleSubmit(edit)}>
                      <div className='script-panel'>
                        <div>
                          <div>Tiêu đề</div>
                          <div className="wrap-input100 mb-3">
                            <input className="input100" name="title" placeholder='Nhập tên nhóm' {...register('name',
                              {
                                required: 'Tên nhóm không được để trống'
                              })}
                              type="text"
                              id="title"
                              autoComplete="off"
                              defaultValue={category.categoryName}
                            ></input>
                            {errors.name && <div className='invalid'>{errors.name.message}</div>}
                          </div>
                          <div className="card-input mb-3">
                            <span>Hình ảnh</span>
                            <input
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </div>
                        </div>
                        <div>
                          <div>Tag</div>
                          <div className='card-input'>
                            <div className='categories-tab'>
                            <ul className="list-group list-group-flush checkbox-wrapper">
                      {tags.map((tag, index) =>
                        <li className="list-group-item" key={index}>
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input top" onChange={(e) => editTag(e, tag)} checked={category.tags.some(val => val.categoryTagId == tag.id)}></input>
                            <label className="custom-control-label">{tag.tag}</label>
                          </div>
                        </li>
                      )}
                    </ul>
                            </div>

                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalEdit({})}>
              Trở lại
            </Button>
            <Button variant="primary" form="edit-form" type="submit">
              Lưu lại
            </Button>
          </Modal.Footer>
        </Modal>}
        <Modal show={modalDelete} onHide={() => toggleModalDelete({})} dialogClassName='sweet-alert-modal rounded' contentClassName="modal-basic-content">
          <Modal.Body>
            <div className='text-center'>
              <i className='fa fa-4x fa-warning text-danger'></i>
              <br></br>
              <br></br>
              <h3 className='text-info'>Bạn có chắc muốn xóa nhóm từ này</h3>
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
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default ManagementCategories;
