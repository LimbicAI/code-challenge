import jwtDecode from 'jwt-decode'
import axios from 'axios'

type JWTDecode = {
  id: string
  email: string
  iat: number
  exp: number
}

export default () => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const token: JWTDecode = jwtDecode(accessToken)
      const time = Date.now().valueOf() / 1000
      if (token.exp < time) {
        return false
      }
    } catch (error) {
      return false
    }

    axios.defaults.headers.common.Authorization = accessToken
    return !!accessToken
  }
}
