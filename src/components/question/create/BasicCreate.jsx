import { Form, Button } from "react-bootstrap";
const BasicCreate = (setQuestion) => {

  return (
    <div className="container">
      <Form>
        <Form.Group>
          <Form.Label>Câu hỏi</Form.Label>
          <Form.Control type="text" placeholder="Nhập câu hỏi" />
          <Form.Text className="text-muted">
            Phần đầu của câu hỏi vd: Chọn đáp án đúng
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Nội dung</Form.Label>
          <Form.Control type="text" placeholder="Nhập nội dung" />
          <Form.Text className="text-muted">
            Nội dung của câu hỏi vd: Dog
          </Form.Text>
        </Form.Group>
        <Button variant="secondary" type="submit">
          Thêm
        </Button>
        <Button variant="primary" type="submit">
          Thêm
        </Button>
      </Form>
    </div>
  );
};
export default BasicCreate;
