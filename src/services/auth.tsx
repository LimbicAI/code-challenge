import axios from 'axios'
import { BaseUrl } from 'const/baseUrl'
import { API } from 'const'

export const authService = {
    login: async (data: any) => {
        let resp = ''


        await axios
            .get(BaseUrl + `${API.CLIENTS}/?email=${data.email}`,  {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                resp = response.data
            })
        return resp
    }

}