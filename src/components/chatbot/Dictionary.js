import { Component } from "react";
import ReactPlayer from "react-player";
import { Loading } from 'react-simple-chatbot';
import chatbotApi from "../../api/2.0/chatbotApi";
export class Dictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            words: [
                {
                    definitions: []
                }
            ],
            trigger: false,
            audioPlay: false,
            error: false
        }
        this.triggerNext = this.triggerNext.bind(this)
        this.playAudio = this.playAudio.bind(this)
        this.endPlayAudio = this.endPlayAudio.bind(this)
        this.triggerToFirstStep = this.triggerToFirstStep.bind(this)
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { steps } = this.props;
        const vocabulary = steps.dictionary.value
        var result = await chatbotApi.dictionary(vocabulary);
        if (result.status == 204) {
            this.setState({
                error: true,
                loading: false
            })
        } else {
            console.log(this.props);
            if (this.isComponentMounted) {
                this.setState({
                    words: result,
                    loading: false,
                    error: false
                })
            }
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
    playAudio() {
        this.setState({
            audioPlay: this.state.audioPlay ? false : true
        })
    }
    endPlayAudio() {
        this.setState({
            audioPlay: false
        })
    }
    render() {
        const { loading, words, trigger, error } = this.state;
        const renderWords = words.map((word, index) =>
            <div key={word.id} style={{textAlign: 'center'}}>
                {word.wordVoice != null &&
                    <div style={{ width: "30px", height: '30px' }}><img onClick={this.playAudio} src="/image/sound.png" style={{ height: "20px" }} className="sound"></img> <ReactPlayer
                        config={{
                            file: {
                                attributes: {
                                    preload: 'none'
                                }
                            }
                        }}
                        url={word.wordVoice}
                        playing={this.state.audioPlay}
                        style={{ height: '30px', width: '30px' }}
                        width={30}
                        height={30}
                        onEnded={this.endPlayAudio}
                    /></div>
                }
                <p>{word.eng}</p>
                <p>{word.spelling}</p>
                <p>{word.vie}</p>
                {/* {word.definitions.map((definition) =>
                    <div key={definition.id}>
                        <p>{definition.definition}</p>
                        <p>{definition.partOfSpeech}</p>
                    </div>

                )} */}
            </div>
        )
        return (
            <div>{loading ? <Loading /> : renderWords}
                {error === true && "Không tìm thấy"}
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
export default Dictionary;