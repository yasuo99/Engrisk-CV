import { useEffect, useState } from "react";
import SubMenu from './../../components/admin/SubMenu';
import HeaderAdmin from './../../components/admin/HeaderAdmin';
import Search from './../../components/search/Search';
import { Modal, Table, Button } from 'react-bootstrap';
import Paginate from './../../components/pagination/Paginate';
import categoryTagApi from "../../api/2.0/categoryTagApi";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
const ManagementcategoryTag = ({ }) => {
  const [tags, setTags] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    items: [],
  });
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalLock, setModalLock] = useState(false);
  const [selectTag, setSelectTag] = useState({})
  const [query, setQuery] = useState('')
  const [isBusy, setIsBusy] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, unregister } = useForm();
  async function fetchData() {
    const params = {
      currentPage: tags.currentPage,
      pageSize: tags.pageSize,
      search: query
    }
    const result = await categoryTagApi.getAll(params);
    setTags(result)
  }
  useEffect(() => {
    fetchData();
    setIsBusy(false);
  }, [tags.currentPage, tags.pageSize, query])
  useEffect(() => {
    if (isRefresh) {
      fetchData();
      setIsRefresh(false);
    }
  }, [isRefresh])
  function toggleModalCreate() {
    reset();
    setModalCreate(!modalCreate);
  }
  function toggleModalDelete(tag) {
    setSelectTag(tag);
    setModalDelete(!modalDelete);
  }
  function toggleModalEdit(tag) {
    reset();
    setSelectTag(tag);
    setModalEdit(!modalEdit);
  }
  function pageChange(currentPage, pageSize) {
    setTags({
      ...tags,
      currentPage: currentPage,
      pageSize: pageSize
    })
  }
  function search(query) {
    setQuery(query);
    setTags({
      ...tags,
      currentPage: 1
    })
  }
  const submitCreate = async (data) => {
    console.log(data);
    const body = {
      tag: data.tag
    }
    const result = await categoryTagApi.create(body);
    if (result.status == 200) {
      toast('Thành công', { type: 'success' });
      toggleModalCreate();
      setIsRefresh(true)
    } else {
      toast('Thất bại', { type: 'error' });
    }
  }
  const submitEdit = async (data) => {
    const body = {
      tag: data.tag
    }
    const result = await categoryTagApi.update(selectTag.id, body);
    if (result.status == 200) {
      toast('Thành công', { type: 'success' });
      toggleModalEdit({});
      setIsRefresh(true)
    }
    else {
      toast('Thất bại', { type: 'error' });
    }
  }
  const submitDelete = async () => {
    const result = await categoryTagApi.delete(selectTag.id);
    if (result.status == 200) {
      toast('Thành công', { type: 'success' });
      toggleModalDelete({});
      setIsRefresh(true)
    }
    else {
      toast('Thất bại', { type: 'error' });
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
                    Quản lý tag
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-word mb-2" onClick={() => toggleModalCreate()}>
                      <i className='fa fa-plus'></i> Thêm tag
                    </button>
                    <Search queryFunction={search}></Search>
                  </div>

                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Tên thẻ</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tags.items.map((tag, index) => (
                          <tr key={index}>
                            <td>{tag.tag}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => toggleModalEdit(tag)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-delete ml-1"
                                onClick={() => toggleModalDelete(tag)}
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
                        currentPage={tags.currentPage}
                        totalPages={tags.totalPages}
                        pageSize={tags.pageSize}
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
              <h3 className='text-info'> Thêm tag</h3>
            </div>
            <form id="create-form" className="form-group" onSubmit={handleSubmit(submitEdit)}>
              <div className="container">
                <div>
                  <div>Tag</div>
                  <div className="wrap-input100 mb-3">
                    <input className="input100" name="title" placeholder='Nhập tên' {...register('tag',
                      {
                        required: 'Tag không được để trống'
                      })}
                      type="text"
                      id="title"
                      autoComplete="off"
                    ></input>
                    {errors.tag && <div className='invalid'>{errors.tag.message}</div>}
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
        {Object.keys(selectTag).length > 0 && <Modal show={modalEdit} animation onHide={() => toggleModalEdit({})} centered size="lg" animation>
          <Modal.Body>
            <div className='text-center'>
              <h3 className='text-info'> Cập nhật tag</h3>
            </div>
            <form id="edit-form" className="form-group" onSubmit={handleSubmit(submitEdit)}>
              <div className="container">
                <div>
                  <div>Tag</div>
                  <div className="wrap-input100 mb-3">
                    <input className="input100" name="title" placeholder='Nhập tên' {...register('tag',
                      {
                        required: 'Tag không được để trống'
                      })}
                      type="text"
                      id="title"
                      autoComplete="off"
                      defaultValue={selectTag.tag}
                    ></input>
                    {errors.tag && <div className='invalid'>{errors.tag.message}</div>}
                  </div>
                </div>
              </div>


            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalEdit({})}>Trở lại</Button>
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
              <h3>Bạn có chắc muốn xóa chứng chỉ này không ?</h3>
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
export default ManagementcategoryTag;