export interface LoadFacebookUserApi {
  loadUserBy: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = {
    facebookID: string
    email: string
    name: string
  } | undefined
}
