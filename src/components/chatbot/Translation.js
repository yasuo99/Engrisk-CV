import { Component } from "react";
import { Loading } from 'react-simple-chatbot';
import chatbotApi from "../../api/2.0/chatbotApi";
export class Translation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            loading: true,
            trigger: false
        }
        this.isComponentMounted = false;
        this.triggerNext = this.triggerNext.bind(this);
        this.triggerToFirstStep = this.triggerToFirstStep.bind(this)
    }
    async componentDidMount() {
        const { steps } = this.props;
        this.isComponentMounted = true;
        const result = await chatbotApi.translate(steps.translate.value);
        if (this.isComponentMounted) {
            this.setState({
                result: result,
                loading: false
            })
        }
    }
    triggerNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }
    triggerToFirstStep() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep({ trigger: 'first' });
        });
    }
    render() {
        const { loading, result, trigger } = this.state
        return (
            <div>{loading ? <Loading /> : <p style={{
                textAlign: 'center',
                marginTop: 20,
            }}>{result}</p>}
                {!loading && <div
                    style={{
                        textAlign: 'center',
                        marginTop: 20,
                    }}
                >
                    {
                        !trigger &&
                        <div>
                            <button className="btn btn-primary rounded"
                                onClick={() => this.triggerNext()}>
                                Tiếp tục</button>
                            <button className="btn btn-secondary rounded ml-1"
                                onClick={() => this.triggerToFirstStep()}>
                                Kết thúc</button>
                        </div>
                    }
                </div>}
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default Translation;