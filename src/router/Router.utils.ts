const pathResolver = (modulePath: string) => modulePath

export const appRoutes = {
  root: () => '/',
  singleClient:() => '/:id',
  about: () => pathResolver('/question'),
  signin: () => pathResolver('/auth/sign-in'),
  adminSignin: () => pathResolver('/auth/admin-sign-in')
}

export const appRoutePaths: {
  root: string
  question: string
  signin: string
  adminSignin: string
  singleClient: string
} = {
  root: appRoutes.root(),
  singleClient: appRoutes.singleClient(),
  question: appRoutes.about(),
  signin: appRoutes.signin(),
  adminSignin: appRoutes.adminSignin()
}
