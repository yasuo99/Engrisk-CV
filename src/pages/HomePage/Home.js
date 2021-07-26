import React, { Component } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { Modal, ProgressBar } from "react-bootstrap";
import { HubConnectionState } from "@microsoft/signalr";
import sectionApi from "../../api/sectionApi";
import { connection } from "../../signalR/createSignalRConnection";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
import sectionApiV2 from "../../api/2.0/sectionApi";
import routeApi from "../../api/2.0/routeApi";
import { getAll, selectRoute } from "../../actions/routeActions";
import { ScriptTypes } from "../../constants/ScriptTypes";
import {FaTimesCircle} from 'react-icons/fa';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      tempSections: [],
      params: {
        currentPage: 1,
        pageSize: 30,
      },
      hasMore: true,
      searchQuery: "",
      openRoute: false,
      currentExpand: 0,
      modalCertificate: false,
      certificateUsername: '',
      modalViewCertificate: false,
      modalRefuse: false,
      refureReason: '',
      certificate: ''
    };
    this.isComponentMounted = false;
  }
  async componentDidMount() {
    console.log(this.props.route);
    this.isComponentMounted = true;

    if (this.isComponentMounted) {
      if (this.props.isLoggedIn) {
        if (connection.state == HubConnectionState.Disconnected) {
          connection.start();
        }
        const result = await routeApi.getAllEngriskRoute(this.props.account.id)
        this.props.getAll(result)
        if (result.lastRoute) {
          this.props.selectRoute(result.lastRoute)
        } else {
          this.props.selectRoute(result.engrisk[0])
        }
        this.setState({
          routes: result,
        });
      }
      else {
        const result = await routeApi.getAnonymousRoute();
        this.setState({
          routes: result,
        })
        this.props.getAll(result)
        this.props.selectRoute(result.engrisk[0])
      }
    }
  }
  searchSection = () => {
    if (this.state.searchQuery !== "") {
      console.log(this.state.searchQuery);
      this.setState({
        sections: this.props.route.sections.filter((sec) =>
          sec.sectionName
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase())
        ),
      });
    } else {
      this.setState({
        sections: this.state.tempSections,
      });
    }
  };
  toggleOpenRoute() {
    this.setState({
      openRoute: !this.state.openRoute
    })
  }
  checkStatus = async (id) => {
    const result = await routeApi.requestCertificate(id);
    console.log(result);
    if (result.status == 200) {
      this.setState({
        ...this.state,
        modalCertificate: true
      })
    }else{
      this.setState({
        ...this.state,
        modalRefuse: true,
        refureReason: result.content
      })
    }
  }
  receiveCertificate = async (id) => {
    const params = {
      signature: this.state.certificateUsername
    }
    const result = await routeApi.submitCertificateRequest(id,params);
    console.log(result);
    if (result) {
      this.setState({
        ...this.state,
        modalCertificate: false,
        modalViewCertificate: true,
        certificate: result
      })
    }
  }
  render() {
    const renderSections = this.props.route.sections.map((section, index) => (
      <div key={index}>
        <div className="card-hoc mb-3">
          <button
            className="headerLesson"
            data-toggle="collapse"
            key={section.id}
            data-id={section.id}
            href={`#collapse${index}`}
            role="button"
            aria-expanded="false"
            aria-controls={`collapse${index}`}
          >
            <div className="col-md-1">
              <div className="iconLesson">
                <img
                  src={section.photoUrl || "./image/welcome.jpg"}
                  alt="Lesson"
                  width="60"
                  height="60"
                  className='img-avatar'
                ></img>
              </div>
            </div>
            <div className="col-md-8">
              <div className="contentLesson">
                <h2 className="title">{section.sectionName}</h2>
              </div>
            </div>
            <div className="col-md-3">
              {this.props.isLoggedIn ? (
                <div className="progressLesson">
                  <ProgressBar
                    now={section.donePercent}
                    variant="primary"
                    animated
                  ></ProgressBar>
                  <span className="textProgress">
                    {section.donePercent}%
                  </span>
                </div>
              ) : (
                <div className="progressLesson">
                  <ProgressBar now={0}></ProgressBar>
                  <span className="textProgress">{0}%</span>
                </div>
              )}
            </div>
          </button>
          <div
            className={`border-top lesson-body collapse ${section.scripts.some(script => script.isCurrentPosition) ? 'show' : ''}`}
            id={`collapse${index}`}
          >
            <div className="card-body unit-row__wrap">
              <div className="contentCollapse">
                <p className="title ml-4 text-dark">{section.description}</p>
                {section.scripts.length > 0 ? <span>
                  {section.scripts.some(script => script.type == ScriptTypes.CERTIFICATE) &&
                    <div className='d-flex align-items-center justify-content-between w-25'>
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            !section.isCurrentLocked ? (
                              <Tooltip id={`tooltip-${placement}`}>
                                Kiểm tra trình độ
                                <br />
                                Kiểm tra trình độ và nhận chứng chỉ từ Engrisk
                              </Tooltip>
                            ) : this.props.isLoggedIn ? (
                              <Tooltip id={`tooltip-${placement}`}>
                                Hoàn thành bài học trước đó để mở khóa
                              </Tooltip>
                            ) : (
                              <Tooltip id={`tooltip-${placement}`}>
                                Đăng nhập để làm
                              </Tooltip>
                            )
                          }
                        >
                          <button
                            className={`rounded-circle unit-row__activity`
                            }
                          >
                            <div className='activity-circle'>
                              <Link
                                className={
                                  section.isCurrentLocked && this.props.route.isSequentially
                                    ? "logo nav-link disabled"
                                    : "logo nav-link"
                                }
                                to={`/certificate-review/${section.scripts.find(script => script.type == ScriptTypes.CERTIFICATE).examId}`}
                              >
                                <span className="icon ">
                                  <svg width="30" height="30" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><title>Artboard 1</title><g fillRule="evenodd"><path d="M59 14.645L.21 46.882 59 79.118l58.79-32.236z"></path><path d="M96.406 67.302L59 89.867 21.594 67.302v23.633L59 111.355l37.406-20.42zm10.692 22.565h10.692V46.882h-10.692z"></path></g></svg>
                                </span>
                                {section.scripts.find(script => script.type == ScriptTypes.CERTIFICATE)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                              </Link>
                              {section.isCurrentLocked && (
                                <span className="rounded">
                                  <i className="fa fa-lock lock-icon"></i>
                                </span>
                              )}</div>
                          </button>
                        </OverlayTrigger>
                      ))}
                      <i className='fa fa-chevron-right text-secondary'></i>
                      <div className='ml-2'>
                        <span onClick={() => this.checkStatus(this.props.route.id)} className="icon "><svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg"><title>Artboard 7</title><g fill="none" fillRule="evenodd"><path fill="#F2F5F8" d="M2.375 43.832h31.25V2.168H2.375z"></path><path fill="#A7B0B7" d="M24.25 36.543h2.918l-5.211-5.211-2.914 2.918 5.207 5.207zm-12.5 0H8.832l5.211-5.211 2.914 2.918-5.207 5.207z"></path><path fill="#D6DEE6" d="M8.625 15.707h18.75v-4.164H8.625zm0 5.211h18.75v-2.086H8.625zM18 25.082c-2.918 0-5.207 2.293-5.207 5.211 0 2.914 2.289 5.207 5.207 5.207 2.918 0 5.207-2.293 5.207-5.207 0-2.918-2.289-5.211-5.207-5.211zm0 8.336c-1.77 0-3.125-1.356-3.125-3.125 0-1.773 1.355-3.125 3.125-3.125s3.125 1.352 3.125 3.125c0 1.769-1.355 3.125-3.125 3.125z"></path><path d="M1.332 1.125v43.75h33.336V1.125H1.332zm31.25 38.543c-1.77 0-3.125 1.352-3.125 3.125H6.543c0-1.773-1.355-3.125-3.125-3.125V6.332c1.77 0 3.125-1.352 3.125-3.125h22.914c0 1.773 1.355 3.125 3.125 3.125v33.336z" fill="#D6DEE6"></path></g></svg></span>
                      </div>
                    </div>
                  }
                  {section.scripts.some(script => script.type == ScriptTypes.GRAMMAR) &&
                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Ngữ pháp
                              <br />
                              Nắm bắt ngữ pháp và luyện tập với những câu hỏi
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button
                          className={`rounded-circle unit-row__activity`
                          }
                        >
                          <div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.GRAMMAR).id}`}
                            >
                              <span className="icon ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                  <path fillRule="evenodd" d="M23.646 27.076L25.59 29H5.84C4.275 29 3 27.737 3 26.187V4.812C3 3.262 4.274 2 5.84 2H25.16c.313 0 .568.252.568.562 0 .311-.255.563-.568.563H5.84c-.94 0-1.705.757-1.705 1.687S4.901 6.5 5.841 6.5h19.318c.313 0 .568.252.568.562V18.14a6.264 6.264 0 0 0-5.112-2.64c-3.447 0-6.251 2.775-6.251 6.187 0 3.412 2.804 6.188 6.25 6.188a6.135 6.135 0 0 0 3.032-.799zM5.841 4.25h18.181c.314 0 .569.252.569.562 0 .311-.255.563-.569.563H5.841a.566.566 0 0 1-.568-.563c0-.31.254-.562.568-.562zm21.993 23.789a.56.56 0 0 1 0 .796.573.573 0 0 1-.804 0l-3.243-3.21a5.1 5.1 0 0 1-3.172 1.125c-2.82 0-5.115-2.273-5.115-5.063 0-2.79 2.294-5.062 5.115-5.062 2.819 0 5.112 2.271 5.112 5.062 0 1.193-.436 2.276-1.136 3.142l3.243 3.21zm-7.22-2.414c2.193 0 3.977-1.766 3.977-3.938 0-2.17-1.784-3.937-3.976-3.937-2.195 0-3.979 1.766-3.979 3.937 0 2.172 1.784 3.938 3.979 3.938z"></path>
                                </svg>
                              </span>
                              {section.scripts.find(script => script.type == ScriptTypes.GRAMMAR)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>
                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}
                          </div>

                        </button>
                      </OverlayTrigger>
                    ))
                  }
                  {section.scripts.some(script => script.type == ScriptTypes.VOCABULARY) &&

                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip id={`tooltip-${placement}`} style={{}}>
                              Học từ vựng <br /> <hr className="text-white"></hr>
                              Sử dụng thẻ ghi nhớ để học từ vựng mới
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button
                          className={`rounded-circle unit-row__activity`
                          }
                        >
                          <div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.VOCABULARY).id}`}
                            >
                              <span className="icon ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                  <path id="a" d="M6.18 2h17.64A2.17 2.17 0 0 1 26 4.16v17.28a2.17 2.17 0 0 1-2.18 2.16H6.18A2.17 2.17 0 0 1 4 21.44V4.16A2.17 2.17 0 0 1 6.18 2zm15.477 27H8.343c-.48 0-.87-.363-.87-.81 0-.447.39-.81.87-.81h13.314c.48 0 .87.363.87.81 0 .447-.39.81-.87.81zm-15.05-4.32h16.787c.48 0 .87.363.87.81 0 .447-.39.81-.87.81H6.606c-.48 0-.87-.363-.87-.81 0-.447.39-.81.87-.81zm8.33-8.477a.744.744 0 0 1 .676 0l1.765.902a.744.744 0 0 0 .46.07.706.706 0 0 0 .592-.811l-.338-1.913a.69.69 0 0 1 .208-.622l1.432-1.355a.696.696 0 0 0 .21-.402.707.707 0 0 0-.612-.797l-1.976-.28a.723.723 0 0 1-.546-.384l-.883-1.739a.735.735 0 0 0-1.3 0l-.883 1.739a.723.723 0 0 1-.546.385l-1.976.279a.733.733 0 0 0-.414.204.688.688 0 0 0 .012.995l1.432 1.355a.69.69 0 0 1 .208.622l-.338 1.913a.685.685 0 0 0 .073.446.736.736 0 0 0 .979.295l1.765-.902z"></path>
                                </svg>
                              </span>
                              {section.scripts.find(script => script.type == ScriptTypes.VOCABULARY)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>

                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}
                          </div>


                        </button>
                      </OverlayTrigger>

                    ))
                  }

                  {section.scripts.some(script => script.type == ScriptTypes.LISTENING) &&
                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Luyện nghe <br />
                              Rèn luyện khả năng nghe với những bài nghe và dạng câu hỏi đa dạng
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button className={`rounded-circle unit-row__activity`}>
                          <div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.LISTENING).id}`}
                            >
                              <span className="icon "><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                <path fillRule="evenodd" d="M15.5 3C22.943 3 29 7.982 29 14.104c0 6.122-6.056 11.103-13.5 11.103-1.542 0-3.051-.211-4.489-.627L3.77 27.945c-.475.225-.98-.284-.74-.76l2.71-5.406C3.325 19.705 2 16.995 2 14.104 2 7.982 8.056 3 15.5 3zm-5.903 7.974a.843.843 0 0 0-.844.841v5.059a.843.843 0 0 0 1.688 0v-5.059a.843.843 0 0 0-.844-.841zm11.813 0a.843.843 0 0 0-.844.841v5.059a.843.843 0 0 0 1.687 0v-5.059a.843.843 0 0 0-.843-.841zm-5.625-.562a.843.843 0 0 0-.844.842v6.181a.843.843 0 0 0 1.687 0v-6.181a.843.843 0 0 0-.843-.842zm-3.375 1.685a.843.843 0 0 0-.844.842v2.811a.843.843 0 0 0 1.687 0V12.94a.843.843 0 0 0-.843-.842zm6.187 0a.843.843 0 0 0-.844.842v2.811a.843.843 0 0 0 1.688 0V12.94a.843.843 0 0 0-.844-.842z"></path>
                              </svg>
                              </span>
                              {section.scripts.find(script => script.type == ScriptTypes.LISTENING)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>
                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}
                          </div>
                        </button>
                      </OverlayTrigger>
                    ))
                  }

                  {section.scripts.some(script => script.type == ScriptTypes.CONVERSATION) &&
                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip
                              id={`tooltip-${placement}`}
                              style={{ backgroundColor: "white" }}
                            >
                              Hội thoại
                              <br />
                              Học cách sử dụng từ ngữ vào ngữ cảnh
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button
                          className={`rounded-circle unit-row__activity`}
                        >
                          <div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.CONVERSATION).id}`}
                            >
                              <span className="icon ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                  <path fillRule='evenodd' d='M15.302 3.236c7.303 0 13.246 4.88 13.246 10.877 0 5.998-5.942 10.878-13.246 10.878-1.513 0-2.993-.207-4.404-.615l-7.105 3.297c-.462.22-.963-.273-.726-.745l2.66-5.296c-2.37-2.032-3.67-4.687-3.67-7.519 0-5.997 5.942-10.877 13.245-10.877zm-1.1 12.657a2.761 2.761 0 0 1-2.763 2.752.551.551 0 1 1 0-1.101 1.66 1.66 0 0 0 1.66-1.65v-1.102H9.231a.546.546 0 0 1-.549-.55V9.84a.546.546 0 0 1 .549-.55h4.415c.304 0 .552.246.555.55v6.053zm7.723 0a2.759 2.759 0 0 1-2.76 2.752.551.551 0 1 1 0-1.101c.913 0 1.656-.74 1.656-1.65v-1.102h-3.863a.546.546 0 0 1-.549-.55V9.84a.546.546 0 0 1 .549-.55h4.415c.305 0 .552.246.555.55l-.003 6.053zM9.787 10.39v3.302h3.311V10.39H9.787zm7.726 0v3.302h3.311V10.39h-3.31z'></path>
                                </svg>
                              </span>
                              {section.scripts.find(script => script.type == ScriptTypes.CONVERSATION)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>
                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}</div>
                        </button>

                      </OverlayTrigger>
                    ))
                  }
                  {section.scripts.some(script => script.type == ScriptTypes.READING) &&
                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip
                              id={`tooltip-${placement}`}
                              style={{ backgroundColor: "white" }}
                            >
                              Bài đọc
                              <br />
                              Rèn luyện khả năng đọc bằng các bài đọc và câu hỏi đa dạng
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button
                          className={`rounded-circle unit-row__activity`}
                        ><div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.READING).id}/`}
                            >
                              <span className="icon "><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 120 137">
                                <path fillRule='evenodd' d='M7.514 0h74.85c.955.63 1.866 1.323 2.727 2.077C96 13.007 106.909 23.91 117.818 34.787a6.059 6.059 0 0 1 1.896 4.618v87.91c0 5.78-3.505 9.332-9.26 9.332H9.546c-5.768 0-9.245-3.511-9.259-9.318V55.692 9.004A8.468 8.468 0 0 1 7.05.232c.162-.061.317-.139.464-.232zm78.109 34.158h19.09L85.624 15.03v19.128zm-25.5 51.265l-.014-.013H30.286a4.23 4.23 0 0 0-4.398 3.765 4.234 4.234 0 0 0 3.471 4.638c.482.08.97.111 1.46.095h58.186a8.166 8.166 0 0 0 1.595-.082 4.234 4.234 0 0 0 3.467-4.63 4.23 4.23 0 0 0-4.38-3.773H60.122zm-.26 25.592V111h29.455c2.85 0 4.773-1.735 4.773-4.25 0-2.513-1.964-4.276-4.773-4.276H30.682c-2.85 0-4.76 1.776-4.76 4.29 0 2.515 1.95 4.25 4.773 4.25h29.169zM60 68.317v-.041H30.545a4.322 4.322 0 0 0-4.336 2.733c-1.09 2.937.996 5.793 4.364 5.793h59.25a4.23 4.23 0 0 0 4.217-3.852 4.234 4.234 0 0 0-3.454-4.551 9.39 9.39 0 0 0-1.718-.082H60zM42.94 51.265c-4.13 0-8.25-.014-12.38 0a4.252 4.252 0 0 0-3.968 2.02 4.27 4.27 0 0 0 0 4.459 4.252 4.252 0 0 0 3.967 2.02h24.655c2.85 0 4.759-1.736 4.772-4.25.014-2.514-1.922-4.249-4.772-4.249H42.94z'></path>
                              </svg>
                              </span>
                              {section.scripts.find(script => script.type == ScriptTypes.READING)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>
                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}
                          </div>
                        </button>

                      </OverlayTrigger>
                    ))
                  }
                  {section.scripts.some(script => script.type == ScriptTypes.WRITING) &&
                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip
                              id={`tooltip-${placement}`}
                              style={{ backgroundColor: "white" }}
                            >
                              Luyện viết
                              <br />
                              Rèn luyện khả năng viết thông qua các dạng câu hỏi
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button
                          className={`rounded-circle unit-row__activity`}
                        ><div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.WRITING).id}`}
                            >
                              <span className="icon "><svg width="30" height="30" viewBox="0 0 33 75" xmlns="http://www.w3.org/2000/svg"><title>lightning_bolt_filled</title>
                                <path d='M2.343 74.847a1.492 1.492 0 0 1-.762-1.827L12.915 39H1.5c-.504 0-.972-.246-1.242-.669a1.47 1.47 0 0 1-.14-1.404l14.998-36A1.491 1.491 0 0 1 16.5 0h14.25c.504 0 .984.258 1.254.681.282.432.327.972.117 1.428L20.318 28.5h11.18a1.52 1.52 0 0 1 1.324.786c.258.48.237 1.077-.07 1.533l-28.498 43.5a1.497 1.497 0 0 1-1.911.528z' fillRule='evenodd'></path>
                              </svg></span>
                              {section.scripts.find(script => script.type == ScriptTypes.WRITING)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>
                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}</div>
                        </button>

                      </OverlayTrigger>
                    ))
                  }
                  {section.scripts.some(script => script.type == ScriptTypes.MINIEXAM) &&
                    ["bottom"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                          !section.isCurrentLocked ? (
                            <Tooltip
                              id={`tooltip-${placement}`}
                              style={{ backgroundColor: "white" }}
                            >
                              Ôn tập
                              <br />
                              Kiểm tra kết quả học bằng bài kiểm tra nhanh
                            </Tooltip>
                          ) : this.props.isLoggedIn ? (
                            <Tooltip id={`tooltip-${placement}`}>
                              Hoàn thành bài học trước đó để mở khóa
                            </Tooltip>
                          ) : (
                            <Tooltip id={`tooltip-${placement}`}>
                              Đăng nhập để tiếp tục học
                            </Tooltip>
                          )
                        }
                      >
                        <button
                          className={`rounded-circle unit-row__activity`}
                        ><div className='activity-circle'>
                            <Link
                              className={
                                section.isCurrentLocked && this.props.route.isSequentially
                                  ? "logo no-transition nav-link disabled"
                                  : "logo no-transition nav-link"
                              }
                              to={`/routes/${section.routeId}/sections/${section.id}/scripts/${section.scripts.find(script => script.type == ScriptTypes.MINIEXAM).id}`}
                            >
                              <span className='icon'><svg width='24' height='27' viewBox='0 0 24 27'>
                                <g id='Artboard' stroke='none' strokeWidth='1' fillRule='evenodd'>
                                  <g id='icon_book_tick' fillRule='nonzero'>
                                    <path d='M8.727,19.687 C8.727,22.818 10.384,25.544 12.839,27 L2.727,27 C1.223,27 0,25.738 0,24.188 L0,2.812 C0,1.262 1.223,0 2.727,0 L21.273,0 C21.573,0 21.818,0.252 21.818,0.563 C21.818,0.873 21.574,1.125 21.273,1.125 L2.727,1.125 C1.825,1.125 1.091,1.882 1.091,2.812 C1.091,3.742 1.825,4.5 2.727,4.5 L21.273,4.5 C21.573,4.5 21.818,4.752 21.818,5.063 L21.818,12.95 C20.4175706,11.8507647 18.6893134,11.2522646 16.909,11.25 C12.389,11.25 8.727,15.028 8.727,19.687 Z M2.727,2.25 L20.182,2.25 C20.482,2.25 20.727,2.502 20.727,2.812 C20.727,3.123 20.483,3.375 20.182,3.375 L2.727,3.375 C2.58006381,3.37263234 2.44008858,3.31198151 2.33787712,3.20639426 C2.23566566,3.10080701 2.17959357,2.95893556 2.182,2.812 C2.182,2.502 2.426,2.25 2.727,2.25 Z M16.91,27 C12.994,27 9.82,23.726 9.82,19.687 C9.82,15.65 12.994,12.375 16.91,12.375 C20.826,12.375 24,15.65 24,19.687 C24,23.727 20.825,27 16.91,27 Z M14.023,19.327 C13.9222845,19.2219293 13.7830454,19.162521 13.6375,19.162521 C13.4919546,19.162521 13.3527155,19.2219293 13.252,19.327 C13.0392988,19.5493191 13.0392988,19.8996809 13.252,20.122 L15.433,22.372 C15.647,22.592 15.992,22.592 16.205,22.372 L20.569,17.872 C20.7817012,17.6496809 20.7817012,17.2993191 20.569,17.077 C20.4682534,16.9716115 20.3287965,16.9119986 20.183,16.9119986 C20.0372035,16.9119986 19.8977466,16.9716115 19.797,17.077 L15.819,21.179 L14.023,19.327 Z' id='Shape'></path>
                                  </g>
                                </g>
                              </svg>
                              </span>
                              {section.scripts.find(script => script.type == ScriptTypes.MINIEXAM)?.isCurrentPosition && !section.isCurrentLocked && <span className="activity-spin"><span className="icon"><svg><circle cy="50%" cx="50%" r="45%" className=""></circle></svg></span></span>}
                            </Link>
                            {section.isCurrentLocked && (
                              <span className="rounded">
                                <i className="fa fa-lock lock-icon"></i>
                              </span>
                            )}</div>
                        </button>

                      </OverlayTrigger>
                    ))
                  }
                </span> : <div><p className='text-info ml-4'>Hiện chưa có kịch bản học cho bài học này</p></div>}

              </div>
            </div>
          </div>
        </div>
      </div >
    ));
    return (
      <div id="wrapper">
        <SubMenuClient></SubMenuClient>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderClient openRoute={this.toggleOpenRoute}></HeaderClient>
            <main id="home">
              <div className="container">
                <div className="col-md-10 offset-1">
                  <div className="boxLesson">
                    <div id='chat-menu' className='mb-3'>
                      <div className="head">Danh sách bài học</div>
                    </div>
                    {renderSections}
                    <div className='mt-1 mb-2 d-flex justify-content-center'>
                      <button className='btn border border-primary rounded-pill text-primary' onClick={() => this.setState({ openRoute: true })}>Xem những khóa học khác</button>
                    </div>

                  </div>
                </div>
              </div>
            </main>
            <Footer></Footer>
          </div>
          <Modal show={this.state.modalCertificate} backdrop="static" dialogClassName='sweet-alert-modal rounded' contentClassName="modal-basic-content">
            <Modal.Body>
              <div className='text-center'>
                <i className='fa fa-4x fa-check text-info'></i>
                <br></br>
                <br></br>
                <h3 className='text-primary'>
                  Chúc mừng bạn đã đủ điều kiện nhận chứng chỉ
                </h3>
                <p className='text-dark'>
                  Điền thông tin để nhận ngay
                </p>
                <h5>Tên hiển thị</h5>
                <div className="wrap-input100 mb-3" style={{ width: '50%', margin: '0 auto' }}>
                  <input className="input100" name="title" placeholder='Nhập tên hiển thị...'
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={this.state.certificateUsername}
                    onChange={(e) => this.setState({ ...this.state, certificateUsername: e.target.value })}
                  ></input>

                </div>
                <small className='text-info'>Để trống chúng tôi sẽ sử dụng tên tài khoản của bạn để in trên chứng chỉ</small>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ ...this.state, modalCertificate: false })}>
                Hủy
              </Button>
              <Button variant="primary" onClick={(e) => this.receiveCertificate(this.props.route.id)}>
                Nhận ngay
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.modalRefuse} backdrop="static" dialogClassName='sweet-alert-modal rounded' contentClassName="modal-basic-content">
            <Modal.Body>
              <div className='text-center'>
                <FaTimesCircle size="150" className='text-warning'></FaTimesCircle>
                <br></br>
                <br></br>
                <h3 className='text-warning'>
                  {this.state.refureReason}
                </h3>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ ...this.state, modalRefuse: false })}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={this.state.modalViewCertificate}
            onHide={() => this.setState({...this.state, modalViewCertificate: false})}
            contentClassName="modal-basic-content"
            dialogClassName='sweet-alert-modal'
            animation
          >
            <Modal.Body>
              <div className='text-center'>
                <h5 className='text-center'>Chứng chỉ của bạn</h5>
                <img src={this.state.certificate} className='img-fluid'></img>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => this.setState({...this.state, modalViewCertificate: false})}>
                Đóng
              </Button>
              <Link to={`/nguoi-dung/${this.props.account.id}/quan-ly-chung-chi`} className='btn btn-primary'>Xem chứng chỉ</Link>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn, account } = state.auth;
  const { route } = state.route
  return {
    isLoggedIn: isLoggedIn,
    account: account,
    route: route
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAll: (routes) => dispatch(getAll(routes)),
    selectRoute: (route) => dispatch(selectRoute(route))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
