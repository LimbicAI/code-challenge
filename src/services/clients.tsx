import axios from 'axios';
import { BaseUrl } from 'const/baseUrl';
import { API } from 'const';

export const clientService = {
    fetch: async () => {
        let resp = "";

        await axios
            .get(BaseUrl + `${API.CLIENTS}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                resp = response.data;
            });
        return resp;
    }
}
