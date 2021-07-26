import React, { Component } from 'react';

class ListWord extends Component {
    render() {
        return (
            <div>
                <main id="tuvung">
                    <div className="container mt-5">
                        <h2 className="pb-3">Từ Vựng Tiếng Anh</h2>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Tiếng anh</th>
                                    <th>Tiếng việt</th>
                                    <th>Loại từ</th>
                                    <th>Hình ảnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.children}
                            </tbody>
                        </table>
                    </div>
                </main>
                 </div>
        );
    }
}
export default ListWord;