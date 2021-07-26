import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListPost from '../../components/thaoluan/ListPost'
import Post from '../../components/thaoluan/Post';
import DangTheoDoi from '../../components/thaoluan/DangTheoDoi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import postApi from '../../api/postApi';
import Paypal from '../../components/paypal/Paypal';
import { connect } from 'react-redux';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { Formik, Field, Form } from "formik";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import postApiV2 from '../../api/2.0/postApi';
import Chatbox from "../../components/chatbot/Chatbox"
const post = {
    title: '',
    content: '',
    fileImg: '',
}

class ImgPost extends React.Component {
    state = {
        loading: false,
        imgPost: []
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.fileImg) {
            return;
        }

        this.setState({ loading: true }, () => {

            var fileLists = Array.from(nextProps.fileImg);
            console.log(fileLists);
            var i = 0;
            fileLists.forEach((value) => {
                i++;
                console.log(i);
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState({ loading: false, imgPost: [...this.state.imgPost, reader.result] });
                };
                reader.readAsDataURL(value);
            })
        });
    }

    render() {
        if (!this.state.loading) {
            const { fileImg } = this.props;
            const { imgPost } = this.state;
            if (!fileImg) {
                return (
                    <div></div>
                )
            }
            var fileLists = Array.from(fileImg);
            console.log(fileLists);
            const renderImage = fileLists.map((value, index) => {
                <img key={index}
                    src={imgPost[index]}
                    alt={value.name}
                    className="display-ImgPost"
                />
            })
            return (
                <div>
                    {renderImage}
                </div>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

// class FilePost extends React.Component {
//     state = {
//         loading: false,
//         filePost: undefined
//     };

//     componentWillReceiveProps(nextProps) {
//         if (!nextProps.file) {
//             return;
//         }

//         this.setState({ loading: true }, () => {
//             let reader = new FileReader();

//             reader.onloadend = () => {
//                 this.setState({ loading: false, filePost: reader.result });
//             };

//             reader.readAsDataURL(nextProps.file);
//         });
//     }

//     render() {
//         const { file } = this.props;
//         const {filePost } = this.state;

//         if (!file) {
//             return (
//                 <input
//                 type="file"

//             />
//             )
//         }
//         return (
//             <input
//                 type="file"
//                 src={filePost}
//             />
//         );
//     }
// }
class ThaoLuanPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotPosts: [],
            newPosts: [],
            followingPosts: [],
            selectImages: []
        };
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        var hotPosts = await postApiV2.getAll("Hot");
        var newPosts = await postApiV2.getAll("New");

        if (this.isComponentMounted) {
            if (this.props.isLoggedIn) {
                var followingPosts = await postApiV2.getAll("Following")
                this.setState({
                    followingPosts: followingPosts
                });
            }
            this.setState({
                hotPosts: hotPosts,
                newPosts: newPosts,
            });
        }
    }
    fetchAllPosts = async () => {
        return await postApi.getAll();
    }
    fetchNewPosts = async () => {
        return await postApi.getNewPost();

    }
    fetchRatingPosts = async () => {
        var highRatePosts = await postApi.getHighRate();
        this.setState({
            highRatePosts: highRatePosts
        })
    }
    fetchFollowingPosts = async () => {
        var token = localStorage.getItem('token');
        var followingPosts = await postApi.getFollowing(this.props.id, token);
        return followingPosts;
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
    selectImages = (event) => {
        console.log(event.currentTarget.files);
        var images = Array.from(event.currentTarget.files);
        let imagesUrl = [];
        images.forEach((value) => {
            var image = URL.createObjectURL(value);
            imagesUrl.push(image);
        })
        console.log(imagesUrl);
        this.setState({ selectImages: imagesUrl });
    }
    createPost = async (values) => {
        var images = Array.from(values.fileImg);
        console.log(images);
        var formData = new FormData();
        formData.set('title', values.title);
        formData.set('content', values.content);
        if (images.length > 0) {
            images.forEach((value) => {
                formData.append('images', value)
            })
        }
        else {
            formData.append('images', new Array());
        }
        var response = await postApi.createPost(formData);
        console.log(response);
    }
    removeImageSelected = () => {
        this.setState({
            selectImages: []
        })
    }
    render() {
        const renderHotPosts = this.state.hotPosts.map((post) =>
            <Post key={post.id} post={post} />
        )
        const renderNewPost = this.state.newPosts.map((post) =>
            <Post key={post.id} post={post} />
        )
        const renderImages = this.state.selectImages.map((image, index) =>
            <img key={index} src={image} className="img-thumbnail" alt="dm" />
        )
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="thaoluan">
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="row mt-4">
                                            <div className="col-8 mb-3">
                                                <h3>Diễn Đàn Ngôn Ngữ</h3>
                                            </div>
                                            {this.props.isVerified && <div className="col-4 text-right">
                                                <Link className="btn btn-primary" to="/thao-luan/them-bai-viet">ĐĂNG BÀI MỚI</Link>
                                            </div>}
                                        </div>
                                        <Tabs defaultActiveKey='hot' mountOnEnter>
                                            <Tab eventKey='hot' title='Đang hot' tabClassName='font-weight-bold'>
                                                <div className='container'>
                                                    {this.isComponentMounted && renderHotPosts}
                                                </div>

                                            </Tab>
                                            <Tab eventKey='new' title='Mới' tabClassName='font-weight-bold'>
                                                <div className='container'>
                                                    {this.isComponentMounted && renderNewPost}
                                                </div>
                                            </Tab>
                                            <Tab eventKey='share' title='Chia sẻ' tabClassName='font-weight-bold'>
                                                <div id="tabfour" role="tabpanel">
                                                    <div className="boxContent">
                                                        <img src={this.props.photoUrl || "/image/user.png"} className="img-user"></img>
                                                        <p className="username">{this.state.username}</p>
                                                        <Formik
                                                            initialValues={post}
                                                            onSubmit={async (values, { resetForm }) => {
                                                                await new Promise((r) => setTimeout(r, 500));
                                                                // this.createPost(values);
                                                                this.createPost(values);
                                                                resetForm({})
                                                                this.removeImageSelected();
                                                            }}
                                                        >
                                                            {({ values, setFieldValue }) => (
                                                                <div>
                                                                    <Form className="content" >
                                                                        <Field
                                                                            className="ml-3 border-bottom"
                                                                            placeholder="Tiêu đề?"
                                                                            type="text"
                                                                            id="title"
                                                                            name="title"
                                                                            component="input"
                                                                        />
                                                                        <div className="contentPost">
                                                                            <Field
                                                                                className="contentPost"
                                                                                placeholder="Bạn muốn chia sẻ điều gì thế?"
                                                                                type="text"
                                                                                id="content"
                                                                                name="content"
                                                                                component="textarea"
                                                                            />
                                                                        </div>
                                                                        {/* <FilePost file={values.file} /> */}
                                                                        {renderImages}
                                                                        <div className="row">
                                                                            <div className="function">
                                                                                <div className="col-11">
                                                                                    <p className="title">Thêm vào bài viết</p>
                                                                                </div>
                                                                                <div className="imgPost">
                                                                                    <label htmlFor="imgPost"><img src="/image/pictures.png"></img>

                                                                                        <Field type="file"
                                                                                            multiple
                                                                                            accept="image/png, image/jpeg"
                                                                                            className="f-image"
                                                                                            id="imgPost"
                                                                                            name="imgPost"
                                                                                            onChange={(event) => {
                                                                                                this.selectImages(event);
                                                                                                setFieldValue("fileImg", event.currentTarget.files);
                                                                                            }}
                                                                                        />
                                                                                    </label>
                                                                                </div>
                                                                                {/* <div className="filePost">
                                                                                <label htmlFor="filePost"><img src="/image/file-storage.png"></img>

                                                                                    <Field type="file"
                                                                                        className="f-file"
                                                                                        id="filePost"
                                                                                        name="filePost"
                                                                                        onChange={(event) => {
                                                                                            setFieldValue("file", event.currentTarget.files[0]);
                                                                                        }}
                                                                                    />
                                                                                </label>
                                                                            </div> */}
                                                                                {/* <img src="/image/file-storage.png" className="f-file"></img> */}
                                                                            </div>
                                                                            <button className="save" type="submit" >Đăng</button>


                                                                        </div>
                                                                    </Form>
                                                                </div>
                                                            )}
                                                        </Formik>
                                                    </div>
                                                </div>
                                            </Tab>
                                        </Tabs>

                                    </div>
                                    <div className="col-4 mt-4">
                                        <div className="search">
                                            <input type="text" className="searchFollowingPost" placeholder="Tìm kiếm" />
                                            <button type="submit" className="searchButton">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                        <DangTheoDoi posts={this.state.followingPosts}></DangTheoDoi>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className='fixed-bottom'>
                            <Chatbox></Chatbox>
                        </div>

                    </div>
                </div>

            </div>
        );

    }
}
const mapStateToProps = (state) => {
    const { id, isVerified, username, photoUrl } = state.auth.account;
    const { isLoggedIn } = state.auth;
    return {
        id: id,
        isVerified: isVerified,
        isLoggedIn: isLoggedIn,
        username: username,
        photoUrl: photoUrl
    }
}
export default connect(mapStateToProps)(ThaoLuanPage);


