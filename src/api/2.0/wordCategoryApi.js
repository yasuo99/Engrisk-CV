import axiosClientv2 from "../../config/axiosClientv2";

const wordCategoryApi = {
  getAll: async (params) => {
    const url = "/wordcategories";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.get(url, { params,headers });
  },
  getAllWithoutPaginate: async () => {
    const url = "/wordcategories/all";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.get(url,headers);
  },
  getDetail: async (id) => {
    const url = `/wordcategories/${id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.get(url,headers);
  },
  getUserDetail: async (id) => {
    const tempUrl = `/wordcategories/${id}/users/${
      JSON.parse(localStorage.getItem("account")).id
    }`;
    console.log(tempUrl);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.get(tempUrl,{headers});
  },
  createWordCategory: async (body) => {
    const url = "/wordcategories";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.post(url, body,{headers});
  },
  updateWordCategory: async (id, body) => {
    const url = `/wordcategories/${id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.put(url, body, {headers});
  },
  deleteWordCategory: async (id) => {
    const url = `/wordcategories/${id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return await axiosClientv2.delete(url, {headers});
  },
};
export default wordCategoryApi;
