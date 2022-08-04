const pathResolver = (modulePath: string) => modulePath

export const appRoutes = {
  root: () => '/',
  about: () => pathResolver('/question'),
  signin: () => pathResolver('/auth/sign-in'),
  adminSignin: () => pathResolver('/auth/admin-sign-in')
}

export const appRoutePaths: {
  root: string
  question: string
  signin: string
  adminSignin: string
} = {
  root: appRoutes.root(),
  question: appRoutes.about(),
  signin: appRoutes.signin(),
  adminSignin: appRoutes.adminSignin()
}
