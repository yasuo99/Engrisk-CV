import React, { Component } from 'react'

class DangTheoDoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts !== undefined ? this.props.posts : []
        }
    }
    render() {
        const renderPosts = this.props.posts.map((post) =>
            <div key={post.id} className="nd-theodoi mt-2">
                <img src="/image/united-states.png" className="pr-3" />
                <a href="#">{post.title}</a>
            </div>
        );
        return (
            <div className="theodoi mt-4">
                <div className="row pt-3">
                    <div className="col-8">
                        <h4>Đang Theo Dõi</h4>
                    </div>
                    {/* <div className="col-4"><a href="#">SỬA ĐỔI</a></div> */}
                </div>
                {renderPosts}
            </div>

        )
    }
}
export default DangTheoDoi;