const pathResolver = (modulePath: string) => modulePath

export const appRoutes = {
  root: () => '/',
  about: () => pathResolver('/about'),
}

export const appRoutePaths: {
  root: string
  about: string
} = {
  root: appRoutes.root(),
  about: appRoutes.about(),
}
