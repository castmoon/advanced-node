import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { FacebookAuthenticationService } from '@/data/services/';
import { AuthenticationError } from '@/domain/errors';

describe('Facebook authentication service', () => {
  let sut: FacebookAuthenticationService;
  let loadFacebookApi: LoadFacebookUserApi;
  beforeEach(() => {
    loadFacebookApi = {
      loadUserBy: jest.fn()
    };
    sut = new FacebookAuthenticationService(loadFacebookApi as any);
  });

  test('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token: 'any_token' });

    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledWith({ token: 'any_token' });
    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledTimes(1);
  });

  test('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookApi.loadUserBy = async () => undefined;

    const authResult = await sut.perform({ token: 'any_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
