import React, { Children, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  Children: ReactNode
}

export const PrivateRoute = ({ children }: any) => {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem("admin")

  if (isAuthenticated === null || undefined) {
    navigate('/auth/admin-sign-in')
  }
  return children

}

export const ClientRoute = ({ children }: any) => {
  const navigate = useNavigate()
  const AuthUser = localStorage.getItem('client')

  if (AuthUser === null || undefined) {
    navigate('/auth/sign-in')
  }
  return children

}



