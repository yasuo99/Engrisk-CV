import { Modal, Button, Table } from "react-bootstrap";
import SubMenu from "./../../components/admin/SubMenu";
import HeaderAdmin from "./../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import Paginate from "../../components/pagination/Paginate";
import postApiV2 from "../../api/2.0/postApi";
import Search from "./../../components/search/Search";
import { toast } from "react-toastify";

const ManagementPost = ({}) => {
  const [posts, setPosts] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    items: [],
  });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalLock, setModalLock] = useState(false);
  const [selectPost, setSelectPost] = useState({});
  const [isRefresh,setIsRefresh] = useState(false);
  const [query, setQuery] = useState("");
  async function fetchData() {
    const params = {
      currentPage: posts.currentPage,
      pageSize: posts.pageSize,
      search: query,
    };
    const result = await postApiV2.getManage(params);
    setPosts(result);
  }
  useEffect(() => {
    fetchData();
  }, [posts.currentPage, posts.pageSize, query]);
  useEffect(() => {
    if(isRefresh){
      setPosts({
        ...posts,
        currentPage: 1
      })
      fetchData();
      setIsRefresh(false);
    }
  },[isRefresh])
  function toggleModalDelete() {}
  function toggleModalEdit() {}
  function toggleModalLock() {}
  function search(query) {
    setQuery(query);
  }
  function pageChange(currentPage, pageSize) {
    setPosts({
      ...posts,
      currentPage: currentPage,
      pageSize: pageSize,
    });
  }
  function toggleModalLock(post){
    setSelectPost(post);
    setModalLock(!modalLock);
  }
  async function submitLock(){
    const result = await postApiV2.lockPost(selectPost.id);
    if(result.status == 200){
      toast('Thành công', {type: 'success', autoClose: 2000})
      toggleModalLock({})
      setIsRefresh(true);
    }else{
      toast('Thất bại', {type: 'error', autoClose: 2000})
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
                    Quản lý bài viết
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <Search queryFunction={search}></Search>
                  </div>

                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="nghia">Tiêu đề bài viết</th>
                          <th className="w-50">Nội dung bài viết</th>
                          <th>Người tạo</th>
                          <th>Số bình luận</th>
                          <th className="nghia">Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.items.map((post, index) => (
                          <tr key={index}>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.accountUserName}</td>
                            <td>{post.totalComment}</td>
                            <td>
                              {post.isLocked ? (
                                <button
                                  className="btn btn-primary btn-delete ml-1"
                                  onClick={() => toggleModalLock(post)}
                                >
                                  <i className="fa fa-unlock"></i>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary btn-delete ml-1"
                                  onClick={() => toggleModalLock(post)}
                                >
                                  <i className="fa fa-lock"></i>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div>
                      <Paginate
                        currentPage={posts.currentPage}
                        totalPages={posts.totalPages}
                        pageSize={posts.pageSize}
                        change={pageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {Object.keys(selectPost).length > 0 && (
          <Modal
            show={modalLock}
            onHide={() => toggleModalLock({})}
            dialogClassName="sweet-alert-modal rounded"
            contentClassName="modal-basic-content"
          >
            <Modal.Body>
              <div className="text-center">
                <i className="fa fa-4x fa-warning text-info"></i>
                <br></br>
                <br></br>
                <h3 className="text-primary">
                  {!selectPost.isLocked
                    ? "Bạn có chắc muốn khóa bài viết này"
                    : "Bạn có chắc muốn mở khóa bài viết này"}
                </h3>
                <p className="text-info">
                  {`Người dùng sẽ ${
                    !selectPost.isLocked
                      ? "thấy và thảo luận được"
                      : "không thấy và thảo luận được"} trên bài viết này`}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => toggleModalLock({})}
              >
                Hủy
              </Button>
              <Button variant="primary" onClick={(e) => submitLock()}>
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};
export default ManagementPost;
