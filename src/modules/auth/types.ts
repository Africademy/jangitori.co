export interface EmailPasswordCreds {
  email: string
  password: string
}

export enum AuthRoute {
  Login = 'login',
  SignUp = 'register',
}
