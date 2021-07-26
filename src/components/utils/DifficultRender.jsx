import { Badge } from "react-bootstrap";
import { Difficult } from "../../constants/Difficult";
const DifficultRender = ({ difficult }) => {
  function render(difficult) {
    switch (difficult) {
      case Difficult.None:
        return <Badge variant="secondary" className='font-weight-bold'>Chưa xác định</Badge>;
      case Difficult.Easy:
        return <Badge variant="success" className='font-weight-bold'>Dễ</Badge>;
      case Difficult.Medium:
        return <Badge variant="primary" className='font-weight-bold'>Vừa</Badge>;
      case Difficult.Hard:
        return <Badge variant="danger" className='font-weight-bold'>Khó</Badge>;
    }
  }
  return <h5>{render(difficult)}</h5>;
};
export default DifficultRender;
