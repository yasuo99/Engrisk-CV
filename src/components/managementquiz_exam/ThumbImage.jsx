import { Component } from "react";

class ThumbImage extends Component {
    state = {
      loading: false,
      thumb: {},
    };
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
          this.setState({ loading: false, thumb: reader.result });
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
            src="/image/picture (1).png"
            alt="image"
            className="display-ImgQuestion"
          />
        );
      }
  
      return <img src={thumb} alt={file.name} className="display-ImgQuestion" />;
    }
  }
  export default ThumbImage