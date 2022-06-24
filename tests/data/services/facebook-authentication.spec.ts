import { FacebookAuthentication } from '@/domain/features';

class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (private readonly loadFacebookByUserTokenApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    await this.loadFacebookByUserTokenApi.loadUserBy({ token: params.token });
    return {
      accessToken: ''
    };
  }
}

interface LoadFacebookUserApi {
  loadUserBy: (params: LoadFacebookUserApi.Params) => Promise<void>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUserBy (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token;
  }
}

describe('Facebook authentication service', () => {
  test('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookByUserTokenApi = new LoadFacebookUserApiSpy();
    const facebookAuthenticationService = new FacebookAuthenticationService(loadFacebookByUserTokenApi);

    await facebookAuthenticationService.perform({ token: 'any_token' });

    expect(loadFacebookByUserTokenApi.token).toBe('any_token');
  });
});
