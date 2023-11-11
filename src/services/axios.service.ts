import axios from "axios";

import { base_urls } from "../constants";
import { ApiError } from "../errors";
import { IBankResponse } from "../interfaces";

class AxiosService {
    public async getCurrencies(): Promise<IBankResponse[]> {
        return await axios.get(base_urls.private_bank_currencies)
            .then(response => response.data)
            .catch(error => {
                throw new ApiError(error.message, error.status);
            })
    }
}

export const axiosService = new AxiosService();