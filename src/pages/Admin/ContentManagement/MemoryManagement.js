import { useEffect, useState } from "react";
import adminApi from "../../../api/2.0/adminApi";
import Paginate from "../../../components/pagination/Paginate";
import SubMenu from "../../../components/admin/SubMenu";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import { Button, Tabs, Tab, Table, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { toast } from "react-toastify";
const MemoryManagement = () => {
    const [memories, setMemories] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    })
    useEffect(async () => {
        const params = {
            currentPage: memories.currentPage,
            pageSize: memories.pageSize
        }
        const result = await adminApi.getWaitingCensorMemories(params);
        setMemories(result)
    }, [memories.currentPage, memories.pageSize])
    function memoriesPaginationChange(currentPage, pageSize) {
        setMemories({
            ...memories,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    async function approve(memory){
        const result = await adminApi.submitCensored(memory.id, 'Memory', 'Approved','Easy')
        if(result.status === 200){
            toast('Thành công', {type: 'success'})
            console.log(memories.items.filter(mem => mem != memory));
            setMemories({
                ...memories,
                items: memories.items.filter(mem => mem != memory)
            })
        }else{
            toast('Thất bại', {type: 'error'})
        }
    }
    async function decline(memory){
        const result = await adminApi.submitCensored(memory.id, 'Memory', 'Declined','Easy')
        if(result.status === 200){
            toast('Thành công', {type: 'success'})
            console.log(memories.items.filter(mem => mem != memory));
            setMemories({
                ...memories,
                items: memories.items.filter(mem => mem != memory)
            })
        }else{
            toast('Thất bại', {type: 'error'})
        }
    }

    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid ql_quiz">
                            <Tabs defaultActiveKey="quiz" id="controlled-tab-example">
                                <Tab eventKey="quiz" title="Danh sách bài viết chờ duyệt" tabClassName='font-weight-bold'>

                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th className="dokhoquiz">Từ vựng</th>
                                                            <th className="tenbaiquiz">Tiêu đề</th>
                                                            <th className="dokhoquiz">Hình ảnh</th>
                                                            <th className='dokhoquiz'>Tạo bởi</th>
                                                            <th className="chucnang" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {memories.items.map((memory, index) =>
                                                            <tr key={index}>
                                                                <td> {memory.word.eng}</td>
                                                                <td>{memory.title}</td>
                                                                <td><img src={memory.memImg} className='img-thumbnail'></img></td>
                                                                <OverlayTrigger key={memory.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                    <Popover id="popover-basic">
                                                                        <Popover.Title as="h3">{memory.account.username}</Popover.Title>
                                                                        <Popover.Content>
                                                                            <div className='d-flex justify-content-center'>
                                                                                <img className='chat-avatar' src={memory.account.photoUrl}></img>

                                                                            </div>
                                                                            <p>Email: {memory.account.email}</p>
                                                                            <p>Tuổi: {memory.account.age}</p>
                                                                            <p>Tham gia từ: 2018</p>
                                                                        </Popover.Content>
                                                                    </Popover>}>
                                                                    <td>
                                                                        {memory.createdBy}

                                                                    </td>
                                                                </OverlayTrigger>
                                                                <td>
                                                                        <Button variant="primary" onClick={() => approve(memory)} className="btn btn-add mr-2" ><i className="fa fa-check"></i></Button>
                                                                        <Button variant="danger" onClick={() => decline(memory)} className="btn btn-add mr-2 btn-delete" ><i className="fa fa-remove"></i></Button>
                                                                </td>
                                                            </tr>)}
                                                    </tbody>
                                                </Table>
                                                <Paginate currentPage={memories.currentPage} pageSize={memories.pageSize} totalPages={memories.totalPages} change={memoriesPaginationChange}></Paginate>
                                            </div>
                                        </div>
                                    </div>
                                </Tab >
                            </Tabs >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MemoryManagement;