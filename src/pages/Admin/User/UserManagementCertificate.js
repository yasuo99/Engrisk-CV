import { useEffect, useState } from "react";
import { Modal, Table, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import accountApiV2 from "../../../api/2.0/accountApi";
import certificateApi from "../../../api/2.0/certificateApi";
import HeaderClient from "../../../components/client/HeaderClient";
import SubMenuClient from "../../../components/client/SubMenuClient";
import Search from "../../../components/search/Search";
import Paginate from './../../../components/pagination/Paginate';
import moment from "moment";
import Footer from "../../Footer/Footer";
const UserManagementCertificatae = ({ }) => {
    const [certificates, setcertificates] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 5,
        items: [],
    });
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalLock, setModalLock] = useState(false);
    const [selectCertificate, setSelectCertificate] = useState({})
    const [query, setQuery] = useState('')
    const [isBusy, setIsBusy] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false);
    const { account } = useSelector(state => state.auth);
    const [modalInspect,setModalInspect] = useState(false);
    const { accountId } = useParams();
    async function fetchData() {
        const params = {
            currentPage: certificates.currentPage,
            pageSize: certificates.pageSize,
            search: query
        }
        const result = await accountApiV2.getUserCertificates(accountId, params);
        setcertificates(result)
    }
    useEffect(() => {
        fetchData();
        setIsBusy(false);
    }, [certificates.currentPage, certificates.pageSize, query])
    function toggleModalDelete(certificate) {
        setSelectCertificate(certificate);
        setModalDelete(!modalDelete)
    }
    function toggleModalEdit() {

    }
    function toggleModalLock() {

    }
    function pageChange(currentPage, pageSize) {
        setcertificates({
            ...certificates,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function search(query) {
        setQuery(query);
        setcertificates({
            ...certificates,
            currentPage: 1
        })
    }
    return (
        <div>
            {account.id != accountId ? <Redirect to='/loi'></Redirect> : (
                <div id="wrapper">
                    <SubMenuClient></SubMenuClient>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderClient></HeaderClient>
                            <div className="container-fluid">
                                <div className="card shadow mb-4 mt-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Chứng chỉ của bạn
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
                                                        <th>Tên chứng chỉ</th>
                                                        <th>Tiêu đề</th>
                                                        <th className='table-image'>Chứng chỉ</th>
                                                        <th>Ngày nhận</th>
                                                        <th>Ngày hết hạn</th>
                                                        <th>Chức năng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {certificates.items.map((value, index) => (
                                                        <tr key={index}>
                                                            <td>{value.certificate.subject}</td>
                                                            <td>{value.certificate.title}</td>
                                                            <td><img className='img-fluid' src={value.signature}></img></td>
                                                            <td>
                                                                {moment(value.achieveDate).format('DD/MM/yyyy')}
                                                            </td>
                                                            <td>
                                                                {moment(value.expireDate).format('DD/MM/yyyy')}
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-primary' onClick={() => {setSelectCertificate(value); setModalInspect(!modalInspect)}}><i className='fa fa-eye'></i></button>
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
                        <Footer></Footer>
                    </div>
                    <Modal
                        show={modalInspect}
                        onHide={() => setModalInspect(!modalInspect)}
                        contentClassName="modal-basic-content"
                        dialogClassName='sweet-alert-modal'
                        animation
                    >
                        <Modal.Body>
                            <div className='text-center'>
                              <img src={selectCertificate.signature} className='img-fluid'></img>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={(e) => setModalInspect(!modalInspect)}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </div>
            )}

        </div>
    );
}
export default UserManagementCertificatae;