import topupApi from '../api/topupApi'

export const TopupWithPaypal = (id,data) => {
    return topupApi.paypalTopup(id,data);
}