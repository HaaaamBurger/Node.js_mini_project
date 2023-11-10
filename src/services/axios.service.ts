import axios from "axios";

import { base_urls } from "../constants";
import { ApiError } from "../errors";

class AxiosService {
    public async getCurrencies() {
        return await axios.get(base_urls.private_bank_currencies)
            .then(response => response.data)
            .catch(error => {
                throw new ApiError(error.message, error.status);
            })
    }
}

export const axiosService = new AxiosService();