import axiosClientv2 from "../../config/axiosClientv2";

const chatbotApi = {
    dictionary: async (vocabulary) => {
        const url = `/chatbot/dictionary?vocabulary=${vocabulary}`;
        return await axiosClientv2.get(url);
    },
    translate: async (text) => {
        const url = `/chatbot/translate`;
        const body = {
            text: text
        };
        return await axiosClientv2.post(url, body);
    }
}
export default chatbotApi