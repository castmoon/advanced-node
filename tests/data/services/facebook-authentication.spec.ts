import { FacebookAuthenticationService } from '@/data/services/';
import { AuthenticationError } from '@/domain/errors';

describe('Facebook authentication service', () => {
  test('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookApi = {
      loadUserBy: jest.fn()
    };
    const sut = new FacebookAuthenticationService(loadFacebookApi as any);

    await sut.perform({ token: 'any_token' });

    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledWith({ token: 'any_token' });
    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledTimes(1);
  });

  test('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookApi = {
      loadUserBy: jest.fn()
    };
    loadFacebookApi.loadUserBy.mockResolvedValue(undefined);
    const sut = new FacebookAuthenticationService(loadFacebookApi);

    const authResult = await sut.perform({ token: 'any_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
