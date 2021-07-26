import { Component } from "react";

class ThumbAudio extends Component {
    state = {
        loading: false,
        thumb: {},
    };
    constructor(props) {
        super(props)
        this.isComponentMounted = false;
    }

    componentDidMount() {
        this.isComponentMounted = true;
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                if (this.isComponentMounted) {
                    this.setState({ loading: false, thumb: reader.result });
                }

            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { thumb } = this.state;

        if (!file) {
            return (
                <img
                    src="/image/audio.png"
                    alt="image"
                    className="display-ImgQuestion"
                />
            )
        }

        return (
            <img
                src={thumb}
                alt={file.name}
                className="display-ImgQuestion"
            />
        );
    }
}
export default ThumbAudio