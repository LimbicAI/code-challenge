import { FC } from 'react'
import { Router as BrowserRouter } from 'react-router-dom'
import history from '../utils/history'
import { getBaseUrlPath } from '../utils/location'
import Router from '../router/Router'

const App: FC = () => {
  const basename = getBaseUrlPath()

  return (
    <BrowserRouter location={basename} navigator={history}>
      <Router />
    </BrowserRouter>
  )
}

export default App
