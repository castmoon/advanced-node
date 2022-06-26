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

export namespace CreateFacebookAccountRepository {
  export type Params = {
    facebookID: string
    name: string
    email: string
  }

  export type Result = undefined
}

export interface CreateFacebookAccountRepository {
  createFromFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<CreateFacebookAccountRepository.Result>
}

export namespace UpdateFacebookAccountRepository {
  export type Params = {
    id: string
    facebookID: string
    name?: string
  }

  export type Result = undefined
}

export interface UpdateFacebookAccountRepository {
  updateWithFacebook: (params: UpdateFacebookAccountRepository.Params) => Promise<UpdateFacebookAccountRepository.Result>
}
