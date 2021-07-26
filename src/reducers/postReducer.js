import { toast } from "react-toastify"

const initialState = {

}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATED_POST":
            toast('Thêm bài viết thành công');
            return state;
        case "CREATED_TOO_FAST":
            toast('Không được phép đăng bài liên tục');
            return state;
        case "UPDATED_POST":
            toast("Sửa bài viết thành công");
            return state;
        case "DELETED_POST":
            toast("Xóa bài viết thành công");
            return state;
        default:
            return state;
    }
}
export default postReducer;