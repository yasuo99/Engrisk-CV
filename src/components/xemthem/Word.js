import React, { Component } from 'react';

class Word extends Component {
 
    render() {
        var {word } = this.props;
        return (
            <tr>
                <td>{word.Eng}</td>
                <td>{word.Vie}</td>
                <td>{word.WordCategory}</td>
                <td><img src={word.WordImg}></img></td>   
            </tr>
        );
    }
}

  export default Word;
