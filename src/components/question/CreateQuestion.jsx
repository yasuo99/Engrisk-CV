import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import BasicCreate from "./create/BasicCreate";
const CreateQuestion = ({ isAdmin }) => {
  const [question, setQuestion] = useState({});
  const [type, setType] = useState("");
  const [secondType, setSecondType] = useState("");
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2 col-2">
          <div className="d-flex flex-column justify-content-between">
            <select
              className="pagination-select"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Chọn dạng câu hỏi</option>
              <option value="grammar">Ngữ pháp</option>
              <option value="writing">Luyện viết</option>
              <option value="reading">Luyện đọc</option>
              <option value="listening">Luyện nghe</option>
              <option value="fillout">Điền </option>
              <option value="vocabularypractice">Luyện tập từ vựng</option>
              <option value="conversation">Hội thoại</option>
            </select>
            {type == "grammar" ||
              (type == "vocabularypractice" && (
                <select
                  className="pagination-select mt-2"
                  onChange={(e) => setSecondType(e.target.value)}
                >
                  <option value="">Chọn loại câu hỏi</option>
                  <option value="basic">Mặc định</option>
                  <option value="">Điền đáp án</option>
                  <option value=""></option>
                  <option value="">Điền</option>
                  <option value="">Luyện tập từ vựng</option>
                  <option value="">Chọn đáp án</option>
                </select>
              ))}
          </div>
        </div>
        <div className="col-md-10 col-10">
          <form action="" className="form-group">
            <div className="row">
              <div className="col-2">
                <h3>Câu hỏi: </h3>
              </div>
              <div className="col-9">
                <input className="form-control bg-primary"></input>
              </div>
            </div>
            {secondType != 'writing'}
            <div className="row">
              <div className="col-2">
                <h5>Nội dung: </h5>
              </div>
              <div className="col-9">
                <textarea className="form-control bg-primary"></textarea>
              </div>
            </div>
          </form>

          {type == "grammar" && (
            <CKEditor
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "Cut",
                  "Copy",
                  "Paste",
                  "PasteText",
                  "PasteFromWord",
                  "-",
                  "Undo",
                  "Redo",
                ],
              }}
              editor={ClassicEditor}
              data={""}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
              }}
              event={(editor) => {
                editor.on("fileUploadResponse", (data) => {
                  console.log(data);
                });
              }}
              onUpload={(event, edito) => {
                console.log(event);
              }}
            />
          )}{
            secondType == 'basic' && <BasicCreate></BasicCreate>
          }
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary rounded">Hủy</button>
        <button>Thêm</button>
      </div>
    </div>
  );
};
export default CreateQuestion;
