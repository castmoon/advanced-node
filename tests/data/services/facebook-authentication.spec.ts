import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos';
import { FacebookAuthenticationService } from '@/data/services/';
import { AuthenticationError } from '@/domain/errors';

describe('Facebook authentication service', () => {
  let sut: FacebookAuthenticationService;
  let loadFacebookApi: LoadFacebookUserApi;
  let loadUserAccountRepo: LoadUserAccountRepository;
  let createFacebookAccountRepo: CreateFacebookAccountRepository;
  const token = 'any_token';
  const fbResponse = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookID: 'any_fb_facebook_id'
  };
  beforeEach(() => {
    loadFacebookApi = {
      loadUserBy: jest.fn()
    };
    loadUserAccountRepo = {
      load: jest.fn()
    };
    createFacebookAccountRepo = {
      createFromFacebook: jest.fn()
    };
    sut = new FacebookAuthenticationService(
      loadFacebookApi,
      loadUserAccountRepo,
      createFacebookAccountRepo
    );
  });

  test('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token });

    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledWith({ token });
    expect(loadFacebookApi.loadUserBy).toHaveBeenCalledTimes(1);
  });

  test('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookApi.loadUserBy = async () => undefined;

    const authResult = await sut.perform({ token });

    expect(authResult).toEqual(new AuthenticationError());
  });

  test('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    loadFacebookApi.loadUserBy = async () => (fbResponse);

    await sut.perform({ token });

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' });
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1);
  });

  test('should call CreateUserAccountRepo when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookApi.loadUserBy = async () => (fbResponse);

    loadUserAccountRepo.load = async () => undefined;

    await sut.perform({ token });

    expect(createFacebookAccountRepo.createFromFacebook).toHaveBeenCalledWith(fbResponse);
    expect(createFacebookAccountRepo.createFromFacebook).toHaveBeenCalledTimes(1);
  });
});
