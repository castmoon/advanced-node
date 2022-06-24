import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { FacebookAuthenticationService } from '@/data/services/';
import { AuthenticationError } from '@/domain/errors';

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookApi: LoadFacebookUserApi
}

const makeSut = (): SutTypes => {
  const loadFacebookApi = {
    loadUserBy: jest.fn()
  };
  const sut = new FacebookAuthenticationService(loadFacebookApi as any);

  return {
    sut,
    loadFacebookApi
  };
};

describe('Facebook authentication service', () => {
  test('should call LoadFacebookUserApi with correct params', async () => {
    const { sut, loadFacebookApi } = makeSut();
    await sut.perform({ token: 'any_token' });

    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledWith({ token: 'any_token' });
    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledTimes(1);
  });

  test('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const { sut, loadFacebookApi } = makeSut();
    loadFacebookApi.loadUserBy = async () => undefined;

    const authResult = await sut.perform({ token: 'any_token' });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
