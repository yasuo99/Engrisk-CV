import React, { Component } from 'react';

class ListPost extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
export default ListPost;