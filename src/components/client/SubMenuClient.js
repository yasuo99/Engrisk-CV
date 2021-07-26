import React, { Component } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSidenav } from '../../actions/sidenavAction';
import { appendScript } from '../../config/appendScript'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import RouteSideNav from './RouteSideNav';
import accountApiV2 from '../../api/2.0/accountApi';
import { selectRoute } from '../../actions/routeActions';
const SubMenuClient = ({ }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, account } = useSelector(state => state.auth)
  const { typeRoute, collapse } = useSelector(state => state.route);
  async function routeSelect(route) {
    console.log(route);
    // if (isLoggedIn) {
    //   const result = await accountApiV2.selectRoute(account.id, route.id);
    // }
    dispatch(selectRoute(route))
  }
  return (
    <div id="subMenu">
      <ul className={"navbar-nav bg-gradient-primary active sidebar sidebar-dark accordion nav-side position-relative"} id="accordionSidebar" style={{ zIndex: 1020 }}>
        <li className="header">
          <img src="/image/world.png" className="logo" />
        </li>
        <li className="nav-item">
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Chủ đề học
                </Tooltip>
              }
            >
              <Link className="nav-link" to="/home" >
                <svg width="32" height="32" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.58803 23.2971C3.58803 23.2971 3.56403 23.8871 4.14103 23.8871C4.85903 23.8871 10.793 23.8791 10.793 23.8791L10.803 18.4281C10.803 18.4281 10.709 17.5301 11.58 17.5301H14.341C15.372 17.5301 15.309 18.4281 15.309 18.4281L15.297 23.8621C15.297 23.8621 20.925 23.8621 21.809 23.8621C22.541 23.8621 22.508 23.1281 22.508 23.1281V13.0761L13.33 4.91309L3.58803 13.0771C3.58803 13.0771 3.58803 23.2971 3.58803 23.2971Z" />
                  <path d="M0 12.3169C0 12.3169 0.826 13.8409 2.631 12.3169L13.412 3.19591L23.519 12.2599C25.607 13.7659 26.39 12.2599 26.39 12.2599L13.412 0.503906L0 12.3169Z" />
                  <path d="M23.2728 3.1748H20.6738L20.6848 6.3278L23.2728 8.5248V3.1748Z" />
                </svg></Link>
            </OverlayTrigger>
          ))}
        </li>
        <li className="nav-item">
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Học từ vựng
                </Tooltip>
              }
            >
              <Link className="nav-link" to="/card" data-toggle="tooltip" data-placement="right">
                <svg width="32" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9453 5.96094C11.9453 5.43969 11.5213 5.01562 11 5.01562H10.0547V6.90625H11C11.5213 6.90625 11.9453 6.48219 11.9453 5.96094Z" />
                  <path d="M11 8.78125H10.0547V10.6719H11C11.5213 10.6719 11.9453 10.2478 11.9453 9.72656C11.9453 9.20531 11.5213 8.78125 11 8.78125Z" />
                  <path d="M0.648438 16.9375V29.3828C0.648438 30.8259 1.8225 32 3.26562 32H18.7344C20.1775 32 21.3516 30.8259 21.3516 29.3828V16.9375H0.648438ZM7.23438 19.4531H14.7656C15.2834 19.4531 15.7031 19.8729 15.7031 20.3906C15.7031 20.9084 15.2834 21.3281 14.7656 21.3281H7.23438C6.71662 21.3281 6.29688 20.9084 6.29688 20.3906C6.29688 19.8729 6.71662 19.4531 7.23438 19.4531ZM7.23438 23.2188H14.7656C15.2834 23.2188 15.7031 23.6385 15.7031 24.1562C15.7031 24.674 15.2834 25.0938 14.7656 25.0938H7.23438C6.71662 25.0938 6.29688 24.674 6.29688 24.1562C6.29688 23.6385 6.71662 23.2188 7.23438 23.2188ZM7.23438 26.9844H14.7656C15.2834 26.9844 15.7031 27.4041 15.7031 27.9219C15.7031 28.4396 15.2834 28.8594 14.7656 28.8594H7.23438C6.71662 28.8594 6.29688 28.4396 6.29688 27.9219C6.29688 27.4041 6.71662 26.9844 7.23438 26.9844Z" />
                  <path d="M21.3516 15.0625V2.61719C21.3516 1.17406 20.1775 0 18.7344 0H3.26562C1.8225 0 0.648438 1.17406 0.648438 2.61719V15.0625H21.3516ZM13.8203 9.72656C13.8203 11.2817 12.5551 12.5469 11 12.5469H9.11719C8.59944 12.5469 8.17969 12.1271 8.17969 11.6094V7.84375V4.07812C8.17969 3.56037 8.59944 3.14062 9.11719 3.14062H11C12.5551 3.14062 13.8203 4.40581 13.8203 5.96094C13.8203 6.68394 13.5466 7.34406 13.0976 7.84375C13.5466 8.34344 13.8203 9.00356 13.8203 9.72656Z" />
                </svg>
              </Link>
            </OverlayTrigger>
          ))}

        </li>
        <li className="nav-item">
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Kiểm tra
                </Tooltip>
              }
            >
              <Link className="nav-link" to="/luyen-tap" data-toggle="tooltip" data-placement="right">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path d="M18.8125 3.875V7.62499H5.68749V3.875H0V31.9999H24.5V3.875H18.8125ZM9.1628 26.6496L7.83711 27.9753L6.62499 26.7631L5.4128 27.9753L4.08712 26.6496L5.2993 25.4375L4.08712 24.2253L5.4128 22.8996L6.62499 24.1118L7.83717 22.8996L9.16286 24.2253L7.95067 25.4375L9.1628 26.6496ZM6.62499 21.1382L4.08718 18.6003L5.41287 17.2747L6.62499 18.4868L9.71217 15.3996L11.0379 16.7253L6.62499 21.1382ZM6.62499 15.5132L4.08718 12.9754L5.41287 11.6497L6.62499 12.8618L9.71217 9.77461L11.0379 11.1003L6.62499 15.5132ZM20.6875 28.25H13.1875V26.375H20.6875V28.25ZM20.6875 24.5H16.9375V22.625H20.6875V24.5ZM20.6875 20.75H13.1875V18.875H20.6875V20.75ZM20.6875 17H16.9375V15.125H20.6875V17ZM20.6875 13.25H13.1875V11.375H20.6875V13.25Z" />
                    <path d="M26.376 13.1875V23.1742L26.6506 22.8996C28.0495 21.5007 30.3274 21.5007 31.7263 22.8996L32.001 23.1743V13.1875H26.376Z" />
                    <path d="M29.1875 5.625C27.6366 5.625 26.375 6.88662 26.375 8.43749V11.3125H32V8.43749C32 6.88662 30.7384 5.625 29.1875 5.625Z" />
                    <path d="M30.3998 24.2249C29.7315 23.5566 28.6439 23.5566 27.9755 24.2249L26.9409 25.2594L29.1877 31.9995L31.4952 25.3203L30.3998 24.2249Z" />
                    <path d="M14.125 1.9375C14.125 0.901936 13.2856 0 12.25 0C11.2144 0 10.375 0.901936 10.375 1.9375H7.5625V5.74999H16.9375V1.9375H14.125Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg></Link>
            </OverlayTrigger>
          ))}

        </li>
        {isLoggedIn && <li className="nav-item">
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Tiến độ học từ vựng
                </Tooltip>
              }
            >
              <Link className="nav-link" to="/vocabulary/progress" data-toggle="tooltip" data-placement="right">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fillRule="nonzero" d="M3.759 12.765a.75.75 0 0 1-.75-1.3l15.445-8.917a.75.75 0 0 1 .75 1.299L3.76 12.765zM14.39 2.625a.75.75 0 0 1 .342-1.46l4.645 1.085a.75.75 0 0 1 .547.947l-1.383 4.566a.75.75 0 1 1-1.435-.435l1.15-3.8-3.866-.903zM4.74 19.8H7.7a2 2 0 0 1 2 2v7.02a2 2 0 0 1-2 2H4.74a2 2 0 0 1-2-2V21.8a2 2 0 0 1 2-2zm9.86-6.96h2.96a2 2 0 0 1 2 2v13.98a2 2 0 0 1-2 2H14.6a2 2 0 0 1-2-2V14.84a2 2 0 0 1 2-2zm9.86-7.54h2.96a2 2 0 0 1 2 2v21.52a2 2 0 0 1-2 2h-2.96a2 2 0 0 1-2-2V7.3a2 2 0 0 1 2-2z"></path></svg>
              </Link>
            </OverlayTrigger>
          ))}

        </li>}
        {/* <hr className="sidebar-divider" /> */}
        <li className="nav-item">
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Tra cứu từ vựng
                </Tooltip>
              }
            >
              <Link className="nav-link" to="/tu-dien" data-toggle="tooltip" data-placement="right">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.1997 8.20908H13.0485L12.626 7.09033L12.1997 8.20908Z" />
                  <path d="M28.2677 0H8.03453C5.45016 0 3.34766 2.1025 3.34766 4.68687V24.1944C4.32391 23.3319 5.60516 22.8081 7.00641 22.8081H28.6527V0.385C28.6527 0.1725 28.4795 0 28.2677 0V0ZM15.2827 11.475C14.8046 11.6563 14.2595 11.4186 14.0745 10.9288L13.7558 10.0844H11.4858L11.1633 10.9312C10.9789 11.4156 10.437 11.6581 9.95328 11.4738C9.46953 11.2894 9.22641 10.7481 9.41078 10.2644L11.6295 4.43937C11.632 4.43187 11.6352 4.425 11.6377 4.41813C12.0006 3.532 13.2568 3.5305 13.6202 4.41625C13.6239 4.42438 13.627 4.43312 13.6302 4.44187L15.8289 10.2669C16.0114 10.7513 15.767 11.2919 15.2827 11.475V11.475ZM21.7133 19.56H17.772C17.0272 19.56 16.5818 18.7331 16.9864 18.1112L19.8914 13.6525H17.8933C17.3752 13.6525 16.9558 13.2325 16.9558 12.715C16.9558 12.1969 17.3752 11.7775 17.8933 11.7775H21.6214C22.3642 11.7775 22.8128 12.6026 22.407 13.2262L19.5014 17.685H21.7133C22.2308 17.685 22.6508 18.105 22.6508 18.6225C22.6508 19.1406 22.2308 19.56 21.7133 19.56V19.56Z" />
                  <path d="M7.00611 32.0001H28.2674C28.4792 32.0001 28.6524 31.8276 28.6524 31.6151V29.2788H3.46924C3.88424 30.8438 5.31236 32.0001 7.00611 32.0001Z" />
                  <path d="M3.46924 27.4037H28.6524V24.6831H7.00611C5.31299 24.6831 3.88424 25.8394 3.46924 27.4037V27.4037Z" />
                </svg>
              </Link>
            </OverlayTrigger>
          ))}

        </li>
        {isLoggedIn && <li className="nav-item">
          {['right'].map((placement) => (
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={
                <Tooltip id={`tooltip-${placement}`}>
                  Tin nhắn
                </Tooltip>
              }
            >
              <Link className="nav-link" to="/chat" data-toggle="tooltip" data-placement="right">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 120 120"><g><path d="M101.637939,60.3800946 L94.2428362,60.3800946 C90.0459885,68.5621068 81.537248,74.1855145 71.7261963,74.1855145 L55.619873,74.1855145 L55.619873,83.3891278 C55.619873,91.000516 61.8139048,97.1945477 69.425293,97.1945477 L79.9772356,97.1945477 L93.1107917,110.328104 C94.5465554,111.763868 97.0361328,110.746868 97.0361328,108.699064 L97.0361328,97.1945477 L101.637939,97.1945477 C109.249328,97.1945477 115.443359,91.000516 115.443359,83.3891278 L115.443359,74.1855145 C115.443359,66.5741263 109.249328,60.3800946 101.637939,60.3800946 Z"></path><path d="M92.4343262,50.875578 L92.4343262,32.4683514 C92.4343262,21.0512691 83.1432786,11.7602215 71.7261963,11.7602215 L25.7081299,11.7602215 C14.2910476,11.7602215 5,21.0512691 5,32.4683514 L5,50.875578 C5,62.2926603 14.2910476,71.5837079 25.7081299,71.5837079 L28.0090332,71.5837079 L28.0090332,87.6900311 C28.0090332,89.7332333 30.4940088,90.7640379 31.9343743,89.3190707 L49.6697371,71.5837079 L71.7261963,71.5837079 C83.1432786,71.5837079 92.4343262,62.2926603 92.4343262,50.875578 Z"></path></g></svg>
              </Link>
            </OverlayTrigger>
          ))}

        </li>}
        {['right'].map((placement) => (
          <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={
              <Tooltip id={`tooltip-${placement}`}>
                Thảo luận
              </Tooltip>
            }
          >
            <Link className="nav-item nav-link test" to="/thao-luan">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M22.2729 38.4072C22.9728 36.603 24.9032 35.6231 26.7495 36.1348C28.669 36.6301 30.4149 36.7065 32.8014 36.1376C34.8005 35.6611 36.8732 36.6056 37.6278 38.4092L38.7916 41.1908C39.5571 43.0204 38.1205 44.9996 36.027 44.9996L23.7576 44.9996C21.8158 44.9996 20.4834 43.0198 21.1934 41.1896L22.2729 38.4072Z" fill="#11EE92"></path><path fillRule="evenodd" clipRule="evenodd" d="M30.8536 34.857C33.8729 35.2813 36.8259 31.6796 37.2427 28.7135C37.6596 25.7474 35.5715 23.002 32.5788 22.5814C29.5862 22.1608 26.8222 24.2244 26.4054 27.1904C25.9885 30.1565 27.8343 34.4326 30.8536 34.857Z" fill="#11EE92"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.62647 36.9424C7.52083 34.7373 9.98737 33.5397 12.3466 34.1651C14.7993 34.7705 17.0302 34.8638 20.0796 34.1685C22.6339 33.5861 25.2824 34.7405 26.2466 36.9449L27.7337 40.3447C28.7118 42.5809 26.8762 44.9998 24.2012 44.9998L8.52363 44.9998C6.04246 44.9998 4.33992 42.5801 5.24716 40.3432L6.62647 36.9424Z" fill="#11EE92"></path><path fillRule="evenodd" clipRule="evenodd" d="M16.6182 31.5074C20.304 31.12 22.7056 25.7932 22.3083 22.0139C21.9111 18.2346 18.6275 15.4821 14.9742 15.8661C11.321 16.2501 8.68139 19.6251 9.07861 23.4044C9.47584 27.1837 12.9324 31.8947 16.6182 31.5074Z" fill="#11EE92"></path><path d="M41.3674 2.142L35.4681 1.10182C32.0858 0.498062 28.8311 2.78935 28.2018 6.33861L27.2357 11.8173C27.2357 11.8173 26.811 14.2257 26.0468 18.5602C25.7921 20.0044 26.5067 20.6543 27.6524 19.3864C30.1079 16.6691 33.4298 16.3857 38.6922 17.3136C42.7092 18.0219 46.9122 15.2867 47.6621 11.0736C48.4086 6.85985 45.3844 2.85031 41.3674 2.142Z" fill="#11EE92"></path><defs></defs></svg>
            </Link>
          </OverlayTrigger>
        ))}


        {/* <hr className="sidebar-divider mb-3" /> */}
        {/* {this.props.isLoggedIn &&
            <li className="nav-item">
              <Link className="nav-link" to="/progress">
                <img src="/image/analytics.png" className="mr-2" />
                <span>Phân tích</span></Link>
            </li>}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0 fa fa-chevron-right " id="sidebarToggle" onClick={this.toggle} />
          </div> */}

      </ul>
      <div style={{ zIndex: '-2' }}>
        <RouteSideNav display={!collapse} typeRoute={typeRoute} selectRoute={routeSelect} />
      </div>
    </div>
  )
}
export default SubMenuClient;