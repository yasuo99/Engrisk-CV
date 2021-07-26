import { useEffect, useState } from "react"
import { Link } from "react-browser-router"
import { useSelector } from "react-redux"
import 'react-tabs/style/react-tabs.css';
import Switch from 'react-switch';
import routeApi from "../../api/2.0/routeApi";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";
const RouteSideNav = ({ typeRoute, selectRoute, display }) => {
    const { route } = useSelector(state => state.route);
    const { isLoggedIn } = useSelector(state => state.auth)
    const [engriskRoutes, setEngriskRoutes] = useState([])
    const [privateRoutes, setPrivateRoutes] = useState([])
    const [isBusy, setIsBusy] = useState(true);
    useEffect(() => {
        var newEngriskRoutes = typeRoute.engrisk.filter(val => val.id != route.id);
        setEngriskRoutes([route,...newEngriskRoutes]);
        setIsBusy(false)
    }, [route])

    function changeRouteStatus(value) {
        value.isPrivate = !value.isPrivate;
        var index = privateRoutes.findIndex(v => v.id == value.id);
        privateRoutes[index] = value;
        setPrivateRoutes([...privateRoutes]);
    }
    return (
        <div className={`sidebar-dark accordion ${display ? 'route-side-nav' : 'route-side-nav-hidden'}`} id="accordionSidebar">
            <Tabs defaultActiveKey="engrisk" id="controlled-tab-example" className='d-flex justify-content-center tabs border-0'>
                {!isBusy && <Tab eventKey="engrisk" tabClassName='font-weight-bold tab border-0'>
                    <div className='mt-1'>
                        {engriskRoutes.map((value, index) =>
                            <div key={index} className={`bg-white ${route.id == value.id ? 'text-primary' : 'text-dark'}  py-2 collapse-inner rounded-lg mt-3 pointer-card shadow-sm option`}>
                                <div className='row p-2' onClick={() => selectRoute(value)}>
                                    <div className='col-7 left pb-0 pr-1'>
                                        <h6 className="collapse-header">{value.title}</h6>
                                        <p>{value.description}</p>
                                        <br></br>
                                        <small>Hoàn thành: {value.done} / {value.sections.length}</small>
                                    </div>
                                    <div className='col-5 d-flex align-items-center'>
                                            <img className='route-img' src={value.routeImage}></img>
                                    </div>
                                </div>


                            </div>
                        )}
                    </div>

                </Tab>}
            </Tabs>

        </div>
    )
}
export default RouteSideNav