import { Field, ErrorMessage, FieldArray } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ArrangeQuestionCreate = ({ values, setFieldValue }) => {
  return (
    <div className="container border">
      <div className="question">
      <CKEditor
            config={{
              ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command
                // You have to change this address to your server that has the ckfinder php connector
                toolbar: [
                  {
                    name: "document",
                    items: [
                      "Source",
                      "-",
                      "NewPage",
                      "Preview",
                      "-",
                      "Templates",
                    ],
                  }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                  [
                    "Cut",
                    "Copy",
                    "Paste",
                    "PasteText",
                    "PasteFromWord",
                    "-",
                    "Undo",
                    "Redo",
                  ], // Defines toolbar group without name.
                  "/", // Line break - next group will be placed in new line.
                  { name: "basicstyles", items: ["Bold", "Italic"] },
                ],
              },
              placeholder:
                "Nhập câu hỏi ví dụ: Điền vào chỗ trống/ Chọn đáp án đúng...",
            }}
            editor={ClassicEditor}
            data={values.preQuestion || ""}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
  
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("preQuestion", data);
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
        {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
        <div className="answerSort">
          <h5>ĐÁP ÁN:</h5>
          <Field
            component="textarea"
            name="content"
            id="content"
            type="text"
            placeholder="Nhập từ/câu sử dụng để sắp xếp vd: Word, Hello how are you ?..."
            className="textareaSort"
          />
        </div>
        {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
      </div>
    </div>
  );
};
export default ArrangeQuestionCreate;
