import axios from 'axios'
import { BaseUrl } from 'const/baseUrl'
import { API } from 'const'

export const answersService = {
  create: async (data: any) => {
    let resp = ''
    const answer = JSON.stringify(data)

    await axios
      .post(BaseUrl + `${API.ANSWERS}`, answer, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resp = response.data
      })
    return resp
  },

  retrive: async (id: any) => {
    let resp = ''

    await axios
      .get(BaseUrl + `${API.ANSWERS}/?user_id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resp = response.data
      })
    return resp
  },
}
