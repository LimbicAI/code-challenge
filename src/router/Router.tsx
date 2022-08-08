import { Routes, Route } from 'react-router-dom'
import { appRoutePaths } from './Router.utils'
import { PrivateRoute, ClientRoute } from './PrivateRoute'

import Home from 'pages/Home/home'
import Question from 'pages/Question/question'
import AdminSignin from 'pages/Auth/Login/Admin/SignIn'
import UserSignin from 'pages/Auth/Login/User/Signin'
import SingleClient from 'pages/Home/singleClient'
import Client from 'pages/Client/Client'

const Router = () => {
  return (
    <Routes>
      <Route
        path={appRoutePaths.root}
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutePaths.singleClient}
        element={
          <PrivateRoute>
            <SingleClient />
          </PrivateRoute>
        }
      />

      <Route
        path={appRoutePaths.question}
        element={
          <PrivateRoute>
            <Question />
          </PrivateRoute>
        }
      />
      <Route path={appRoutePaths.signin} element={<UserSignin />} />
      <Route path={appRoutePaths.adminSignin} element={<AdminSignin />} />
      <Route
        path={appRoutePaths.client}
        element={
          <ClientRoute>
            <Client />
          </ClientRoute>
        }
      />
    </Routes>
  )
}

export default Router
