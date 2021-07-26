import { useEffect, useState } from "react";
import SubMenu from "../../../components/admin/SubMenu";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import { Button, Tabs, Tab, Table, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import adminApi from "../../../api/2.0/adminApi";
import Paginate from "../../../components/pagination/Paginate";
import { toast } from "react-toastify";
const PostCommentManagement = () => {
    const [postInspectModal, setPostInspectModal] = useState(false);
    const [posts, setPosts] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    })
    const [post, setPost] = useState({})
    const [postRefresh, setPostRefresh] = useState(false);
    const [commentRefresh, setCommentRefresh] = useState(false);
    const [comments, setComments] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    })
    useEffect(async () => {
        if (postRefresh) {
            const params = {
                currentPage: posts.currentPage,
                pageSize: posts.pageSize
            }
            const result = await adminApi.getWaitingCensorPosts(params);
            console.log(result);
            setPosts(result);
            setPostRefresh(false);
        }
    }, [postRefresh])
    useEffect(async () => {
        const params = {
            currentPage: posts.currentPage,
            pageSize: posts.pageSize
        }
        const result = await adminApi.getWaitingCensorPosts(params);
        console.log(result);
        setPosts(result);
    }, [posts.currentPage, posts.pageSize])
    useEffect(async () => {
        const params = {
            currentPage: comments.currentPage,
            pageSize: comments.pageSize
        }
        const result = await adminApi.getWaitingCensorComments(params);
        setComments(result);
    }, [comments.currentPage, comments.pageSize])
    useEffect(async () => {
        if (commentRefresh) {
            const params = {
                currentPage: comments.currentPage,
                pageSize: comments.pageSize
            }
            const result = await adminApi.getWaitingCensorComments(params);
            setComments(result);
            setCommentRefresh(false);
        }
    }, [commentRefresh])
    function togglePostInspectModal(post) {
        setPostInspectModal(!postInspectModal);
        setPost(post);
    }
    function postPaginationChange(currentPage, pageSize) {
        setPosts({
            ...posts,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function commentPaginationChange(currentPage, pageSize) {
        setComments({
            ...comments,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    async function censorComment(id, type, status) {
        const result = await adminApi.submitCensored(id, type, status, 'Easy')
        if (result.status === 200) {
            toast('Thành công', { type: 'success' })
            if (type === 'Post') {
                setPostRefresh(true);
            } else {
                setCommentRefresh(true);
            }
        }
        else {
            toast('Thất bại', { type: 'error' })
        }
    }
    return (<div>
        <div id="wrapper">
            <SubMenu></SubMenu>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderAdmin></HeaderAdmin>
                    <div className="container-fluid ql_quiz">
                        <Tabs defaultActiveKey="post" id="controlled-tab-example">
                            <Tab eventKey="post" title="Danh sách bài viết chờ duyệt" tabClassName='font-weight-bold'>

                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th className="tenbaiquiz">Tiêu đề</th>
                                                        <th className="dokhoquiz">Nội dung</th>
                                                        <th className="dokhoquiz">Ngày tạo</th>
                                                        <th className='dokhoquiz'>Tạo bởi</th>
                                                        <th className="chucnang" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {posts.items.map((post, index) =>
                                                        <tr key={index}>
                                                            <td>{post.title}</td>
                                                            <td>{post.content}</td>
                                                            <td>{post.createdDate}</td>
                                                            <OverlayTrigger key={post.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                <Popover id="popover-basic">
                                                                    <Popover.Title as="h3">{post.createdBy}</Popover.Title>
                                                                    <Popover.Content>
                                                                        <div className='d-flex justify-content-center'>
                                                                            <img className='chat-avatar' src={post.account?.photoUrl}></img>

                                                                        </div>
                                                                        <p>Email: {post.account.email}</p>
                                                                        <p>Tuổi: {post.account.age}</p>
                                                                        <p>Tham gia từ: 2018</p>
                                                                    </Popover.Content>
                                                                </Popover>}>
                                                                <td>
                                                                    {post.createdBy}

                                                                </td>
                                                            </OverlayTrigger>
                                                            <td>
                                                                <Button variant="primary" className="btn btn-add mr-2" onClick={() => censorComment(post.id, 'Post', 'Approved')} ><i className="fa fa-check"></i></Button>
                                                                <Button variant="danger" className="btn btn-add mr-2 btn-delete" onClick={() => censorComment(post.id, 'Post', 'Declined')} ><i className="fa fa-remove"></i></Button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            <Paginate currentPage={posts.currentPage} pageSize={posts.pageSize} totalPages={posts.totalPages} change={postPaginationChange}></Paginate>
                                        </div>
                                    </div>
                                </div>
                                {/* <Modal show={postInspectModal} onHide={() => toggleQuizInspectModal({})} dialogClassName="modal-90w" size="lg">
                                    <Modal.Body>
                                        <QuizPreview quiz={selectedQuiz} closeReview={() => toggleQuizInspectModal({})}></QuizPreview>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => toggleQuizInspectModal({})}>
                                            Từ chối
                                        </Button>
                                        <Button variant="primary" onClick={(e) => toggleQuizInspectModal({})}>
                                            Phê duyệt
                                        </Button>
                                    </Modal.Footer>
                                </Modal> */}
                            </Tab >
                            <Tab eventKey="comment" title="Danh sách bình luận chờ duyệt" tabClassName='font-weight-bold'>
                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th className="tenbaiquiz">Người bình luận</th>
                                                        <th className="motaquiz">Nội dung</th>
                                                        <th className="dokhoquiz">Thời gian</th>
                                                        <th className="dokhoquiz">Bài viết</th>
                                                        <th className="chucnang" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {comments.items.map((comment, index) =>
                                                        <tr>
                                                            <OverlayTrigger key={comment.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                <Popover id="popover-basic">
                                                                    <Popover.Title as="h3">{comment.account.username}</Popover.Title>
                                                                    <Popover.Content>
                                                                        <div className='d-flex justify-content-center'>
                                                                            <img className='chat-avatar' src={comment.account.photoUrl}></img>

                                                                        </div>
                                                                        <p>Email: {comment.account.email}</p>
                                                                        <p>Tuổi: {comment.account.age}</p>
                                                                        <p>Tham gia từ: 2018</p>
                                                                    </Popover.Content>
                                                                </Popover>}>
                                                                <td>
                                                                    {comment.account.username}

                                                                </td>
                                                            </OverlayTrigger>
                                                            <td>{comment.content}</td>
                                                            <td>{comment.timestamp}</td>
                                                            <OverlayTrigger key={comment.post.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                <Popover id="popover-basic">
                                                                    <Popover.Title as="h3">{comment.post.title}</Popover.Title>
                                                                    <Popover.Content>
                                                                        <div className='d-flex justify-content-center'>
                                                                            <h6>{comment.post.title}</h6>

                                                                        </div>
                                                                        <p>Tác giả: {comment.post.createdBy}</p>
                                                                    </Popover.Content>
                                                                </Popover>}>
                                                                <td>
                                                                    {comment.post.title}

                                                                </td>
                                                            </OverlayTrigger>
                                                            <td>
                                                                <Button variant="primary" className="btn btn-add mr-2" onClick={() => censorComment(comment.id, 'Comment', 'Approved')} ><i className="fa fa-check"></i></Button>
                                                                <Button variant="danger" className="btn btn-add mr-2 btn-delete" onClick={() => censorComment(comment.id, 'Comment', 'Declined')} ><i className="fa fa-remove"></i></Button>
                                                            </td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </Table>
                                            <Paginate currentPage={comments.currentPage} pageSize={comments.pageSize} totalPages={comments.totalPages} change={commentPaginationChange}></Paginate>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs >
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default PostCommentManagement;