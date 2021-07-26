import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot';
import Dictionary from './Dictionary';
import { ThemeProvider } from 'styled-components';
import { Support } from './Support';
import SupportMessage from './SupportMessage';
import Translation from './Translation';
const config = {
    floating: true
}
const theme = {
    background: '#f5f8fb',
    headerBgColor: '#116EEE',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#116EEE',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
}
export class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: []
        }
        this.isComponentMounted = false;
    }
    componentDidMount() {
        this.isComponentMounted = true;
        if(this.isComponentMounted){
            this.setState({
                ...this.state,
                steps: [
                    {
                        id: 'first',
                        message: 'Xin chào. Tôi là bot của Engrisk. Bạn muốn tôi giúp gì ?',
                        trigger: 'user-response'
                    },
                    {
                        id: 'user-response',
                        options: [
                            { value: 'd', label: 'Từ điển', trigger: 'dictionary-response' },
                            { value: 't', label: 'Dịch', trigger: 'translate-response' },
                        ]
                    },
                    {
                        id: 'dictionary-response',
                        message: 'Nhập từ mà bạn muốn tra cứu',
                        trigger: 'dictionary'
                    },
                    {
                        id: 'translate-response',
                        message: 'Nhập nội dung mà bạn muốn dịch',
                        trigger: 'translate'
                    },
                    {
                        id: 'dictionary',
                        user: true,
                        trigger: 'server-response',
                        validator: (value) => {
                            if (value == '') {
                                return 'Từ không được để trống'
                            }
                            if (value.search(' ') != -1) {
                                return 'Chỉ nhập một từ không có khoảng trắng'
                            }
                            return true;
                        },
                    },
                    {
                        id: 'translate',
                        user: true,
                        trigger: 'server-response-2',
                        validator: (value) => {
                            if (value == '') {
                                return 'Từ không được để trống'
                            }
                            return true;
                        }
                    }, {
                        id: 'server-response-2',
                        component: <Translation />,
                        waitAction: true,
                        trigger: 'translate-response'
                    }
                    ,
                    {
                        id: 'server-response',
                        component: <Dictionary />,
                        waitAction: true,
                        trigger: 'dictionary-response'
                    }
                ]
            })
        }
    }
    componentWillUnmount(){
        this.isComponentMounted = false;
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.isComponentMounted && <ChatBot
                    steps={this.state.steps}
                    {...config}
                />}
            </ThemeProvider>
        )
    }
}

export default Chatbox
