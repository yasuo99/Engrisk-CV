import { Button, Tabs, Tab, Table, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import SubMenu from "../../../components/admin/SubMenu";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import { useEffect, useState } from "react";
import adminApi from "../../../api/2.0/adminApi";
import Paginate from "../../../components/pagination/Paginate";
import SectionPreview from "./SectionPreview";
import { toast } from "react-toastify";
const RouteManagement = () => {
    const [routeInspectModal, setRouteInspectModal] = useState(false);
    const [sectionPreviewModal, setSectionPreviewModal] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState({})
    const [selectedSection, setSelectedSection] = useState({})
    const [routes, setRoutes] = useState({
        currentPage: 1,
        pageSize: 5,
        items: [],
        totalPages: 1
    })
    useEffect(() => {
        async function fetchData() {
            const params = {
                currentPage: routes.currentPage,
                pageSize: routes.pageSize
            }
            const result = await adminApi.getWaitingCensorRoutes(params);
            setRoutes(result);
        }
        fetchData();
    }, [routes.currentPage, routes.pageSize, setRoutes])
    function toggleRouteInspectModal(route) {
        setRouteInspectModal(!routeInspectModal)
        setSelectedRoute(route)
    }
    function routesPaginationChange(currentPage, pageSize) {
        setRoutes({
            ...routes,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function toggleSectionPreviewModal(section) {
        setSectionPreviewModal(!sectionPreviewModal)
        setSelectedSection(section);
        setRouteInspectModal(!routeInspectModal);
    }
    function closePreview() {
        setSectionPreviewModal(!sectionPreviewModal)
        setRouteInspectModal(!routeInspectModal);
    }
    async function submitApprove() {
        const result = await adminApi.submitCensored(selectedRoute.id, "Route", "Approved", "Easy");
        if (result.status === 200) {
            toast('Thành công', { type: 'success' })
            setRoutes({
                ...routes,
                items: routes.items.filter(item => item !== selectedRoute)
            })
            toggleRouteInspectModal({});
        }
        else {
            toast('Thất bại', { type: 'error' })
        }
    }
    async function submitDecline() {
        const result = await adminApi.submitCensored(selectedRoute.id, "Route", "Declined", "Easy");
        if (result.status === 200) {
            toast('Thành công', { type: 'success' })
            setRoutes({
                ...routes,
                items: routes.items.filter(item => item !== selectedRoute)
            })
            setSelectedRoute({});
            toggleRouteInspectModal({});
        }
        else {
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
                                                            <th className="tenbaiquiz">Tiêu đề</th>
                                                            <th className="dokhoquiz">Mô tả</th>
                                                            <th className="dokhoquiz">Số bài học</th>
                                                            <th className='dokhoquiz'>Tạo bởi</th>
                                                            <th className="chucnang" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {routes.items.map((route, index) =>
                                                            <tr key={index}>
                                                                <td>{route.title}</td>
                                                                <td>{route.description}</td>
                                                                <td>{route.sections.length}</td>
                                                                <OverlayTrigger key={route.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                    <Popover id="popover-basic">
                                                                        <Popover.Title as="h3">{route.account.username}</Popover.Title>
                                                                        <Popover.Content>
                                                                            <div className='d-flex justify-content-center'>
                                                                                <img className='chat-avatar' src={route.account.photoUrl}></img>

                                                                            </div>
                                                                            <p>Email: {route.account.email}</p>
                                                                            <p>Tuổi: {route.account.age}</p>
                                                                            <p>Tham gia từ: 2018</p>
                                                                        </Popover.Content>
                                                                    </Popover>}>
                                                                    <td>
                                                                        {route.account.username}
                                                                    </td>
                                                                </OverlayTrigger>
                                                                <td>
                                                                    <Button variant="primary" className="btn btn-add mr-2" onClick={() => toggleRouteInspectModal(route)} ><i className="fa fa-eye"></i></Button>
                                                                </td>
                                                            </tr>)}
                                                    </tbody>
                                                </Table>
                                                <Paginate currentPage={routes.currentPage} pageSize={routes.pageSize} totalPages={routes.totalPages} change={routesPaginationChange}></Paginate>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={routeInspectModal} onHide={() => toggleRouteInspectModal({})} size="lg">
                                        <Modal.Body>

                                            <main id='scroll'>
                                                <h5>Danh sách bài học</h5>
                                                {selectedRoute.sections?.map((section, index) =>
                                                    <div key={index}>
                                                        <div className="card mt-4">
                                                            <div className="headerLesson row p-2">
                                                                <div className="col-md-4">
                                                                    <div className="iconLesson">
                                                                        <img
                                                                            className='rounded-circle'
                                                                            src={section.photoUrl || "../../../image/welcome.jpg"}
                                                                            alt="Lesson"
                                                                            width="60"
                                                                            height="60"
                                                                        ></img>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <div className="contentLesson">
                                                                        <form className='form-group'>
                                                                            <h6>{section.sectionName}</h6>
                                                                            <p>{section.description}</p>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 d-flex justify-content-end align-items-center">
                                                                    <Button variant='success' onClick={() => toggleSectionPreviewModal(section)}>Preview  <i className='fa fa-play-circle'></i></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                            </main>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => submitDecline()}>
                                                Từ chối
                                            </Button>
                                            <Button variant="primary" onClick={(e) => submitApprove()}>
                                                Phê duyệt
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Modal show={sectionPreviewModal} onHide={() => toggleSectionPreviewModal()} dialogClassName="modal-90w" size="lg">
                                        <Modal.Body>
                                            <SectionPreview section={selectedSection} closeReview={closePreview}></SectionPreview>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => toggleSectionPreviewModal()}>
                                                Từ chối
                                            </Button>
                                            <Button variant="primary" onClick={(e) => toggleSectionPreviewModal()}>
                                                Phê duyệt
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Tab >
                            </Tabs >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RouteManagement;