import { toast } from "react-toastify";
import postApi from "../api/postApi"

export const CreatePost = (body) => {
    return dispatch => {
        postApi.createPost(body).then((response) => {
            console.log(response);
            return dispatch({ type: "CREATED_POST" });
        }).catch((error) => {
            toast(error.response.data.error);
        });
    }
}
export const DeletePost = (id) => {
    return dispatch => {
        postApi.deletePost(id).then((response) => {
            return dispatch({ type: "DELETED_POST" });
        }).catch((error) => {
            console.log(error);
        });
    }
}
export const UpdatePost = (id, body) => {
    return dispatch => {
        postApi.updatePost(id, body).then((response) => {
            return dispatch({ type: "UPDATED_POST" });
        }).catch((error) => console.log(error));
    }
}