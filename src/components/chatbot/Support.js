import { HubConnectionState } from "@microsoft/signalr";
import { Component } from "react";
import { connect } from "react-redux";
import { Loading } from 'react-simple-chatbot';
import chatbotApi from "../../api/2.0/chatbotApi";
import { connection } from "../../signalR/createSignalRConnection";
export class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            trigger: false,
        }
        this.support = '';
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { steps } = this.props
        const { previousStep } = this.props;
        console.log(this.props);
        if (connection.state == HubConnectionState.Disconnected) {
            connection.start();
        }
        connection.on('SupportResponse', (data) => {
            if (this.isComponentMounted) {
                if (this.state.message === '') {
                    this.setState({
                        message: data
                    })
                }
            }

        })
        if (connection.state == HubConnectionState.Connected) {
            if (steps.message?.value != undefined) {
                connection.send('support', steps.message.value);
            }
        }
    }
    endSupport = () => {
        const { steps } = this.props;
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep({ trigger: 'first' });
        })
    }
    continueSupport = () => {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        })
    }
    render() {
        const { loading, message, trigger } = this.state
        return (
            <div>
                {loading ? <Loading /> : <p>{message}</p>}
                {!trigger &&
                    <button className="btn btn-secondary" onClick={this.endSupport}>Kết thúc</button>}

            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth;
    return {
        account: account
    }
}
export default connect(mapStateToProps)(Support);