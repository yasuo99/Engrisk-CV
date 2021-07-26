import axiosClient from '../config/axiosClient'
export const topupApi = {
    paypalTopup: async (id,data) => {
        const url = `/accounts/${id}/topup/paypal`
        return await axiosClient.post(url,data);
    }
}