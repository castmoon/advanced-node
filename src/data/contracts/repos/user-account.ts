export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = {
    id: string
    name?: string
  } | undefined
}

export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace SaveFacebookAccountRepository {
  export type Params = {
    facebookID: string
    name: string
    email: string
    id?: string
  }

}

export interface SaveFacebookAccountRepository {
  saveWithFacebook: (params: SaveFacebookAccountRepository.Params) => Promise<void>
}
