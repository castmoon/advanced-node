import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repos';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly loadFacebookByUserTokenApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository,
    private readonly createFacebookAccountRepo: CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const facebookData = await this.loadFacebookByUserTokenApi.loadUserBy({ token: params.token });
    if (facebookData === undefined) {
      return new AuthenticationError();
    }

    const result = await this.loadUserAccountRepo.load({ email: facebookData.email });
    if (result === undefined) {
      await this.createFacebookAccountRepo.createFromFacebook(facebookData);
    }
    return {
      accessToken: ''
    };
  }
}
