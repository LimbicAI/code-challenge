import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { appRoutePaths } from './Router.utils'

import Home from '../pages/home'
import About from '../pages/about'

const Router: FC = () => (
  <Routes>
    <Route path={appRoutePaths.root} element={<Home />} />
    <Route path={appRoutePaths.about} element={<About />} />
  </Routes>
)

export default Router
