import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { FacebookAuthenticationService } from '@/data/services/';
import { AuthenticationError } from '@/domain/errors';

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
