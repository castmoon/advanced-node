import { AuthenticationError } from '@/domain/errors';
import { FacebookAuthentication } from '@/domain/features';

class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (private readonly loadFacebookByUserTokenApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const result = await this.loadFacebookByUserTokenApi.loadUserBy({ token: params.token });
    if (result === undefined) {
      return new AuthenticationError();
    }
    return {
      accessToken: ''
    };
  }
}

interface LoadFacebookUserApi {
  loadUserBy: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUserBy (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token;
    return this.result;
  }
}

describe('Facebook authentication service', () => {
  test('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookByUserTokenApi = new LoadFacebookUserApiSpy();
    const facebookAuthenticationService = new FacebookAuthenticationService(loadFacebookByUserTokenApi);

    await facebookAuthenticationService.perform({ token: 'any_token' });

    expect(loadFacebookByUserTokenApi.token).toBe('any_token');
  });

  test('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookByUserTokenApi = new LoadFacebookUserApiSpy();
    loadFacebookByUserTokenApi.result = undefined;
    const facebookAuthenticationService = new FacebookAuthenticationService(loadFacebookByUserTokenApi);

    const authResult = await facebookAuthenticationService.perform({ token: 'any_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
