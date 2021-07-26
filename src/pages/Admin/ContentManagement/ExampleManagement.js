import SubMenu from "../../../components/admin/SubMenu";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import { Button, Tabs, Tab, Table, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminApi from "../../../api/2.0/adminApi";
import Paginate from "../../../components/pagination/Paginate";
const ExampleManagement = () => {
    const [examples, setExamples] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    });
    useEffect(() => {
        async function fetchData() {
            const params = {
                currentPage: examples.currentPage,
                pageSize: examples.pageSize
            }
            const result = await adminApi.getWaitingCensorExamples(params);
            setExamples(result);
        }
        fetchData();
    }, [examples.currentPage, examples.pageSize])
    function examplesPaginationChange(currentPage, pageSize) {
        setExamples({
            ...examples,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    return (<div>
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
                                                        <th className="dokhoquiz">Định nghĩa</th>
                                                        <th className="tenbaiquiz">Tiếng anh</th>
                                                        <th className="dokhoquiz">Nghĩa</th>
                                                        <th className='dokhoquiz'>Tạo bởi</th>
                                                        <th className="chucnang" />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {examples.items.map((example, index) =>
                                                        <tr>
                                                            <td>{example.definition.definition}</td>
                                                            <td>{example.eng}</td>
                                                            <td>{example.vie}</td>
                                                            <OverlayTrigger key={example.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                <Popover id="popover-basic">
                                                                    <Popover.Title as="h3">{example.account.username}</Popover.Title>
                                                                    <Popover.Content>
                                                                        <div className='d-flex justify-content-center'>
                                                                            <img className='chat-avatar' src={example.account.photoUrl}></img>

                                                                        </div>
                                                                        <p>Email: {example.account.email}</p>
                                                                        <p>Tuổi: {example.account.age}</p>
                                                                        <p>Tham gia từ: 2018</p>
                                                                    </Popover.Content>
                                                                </Popover>}>
                                                                <td>
                                                                    {example.contributor}

                                                                </td>
                                                            </OverlayTrigger>
                                                            <td>
                                                                <Button variant="primary" className="btn btn-add mr-2" ><i className="fa fa-check"></i></Button>
                                                                <Button variant="danger" className="btn btn-add mr-2 btn-delete" ><i className="fa fa-remove"></i></Button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            <Paginate currentPage={examples.currentPage} pageSize={examples.pageSize} totalPages={examples.totalPages} change={examplesPaginationChange}></Paginate>
                                        </div>
                                    </div>
                                </div>
                            </Tab >
                        </Tabs >
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default ExampleManagement;