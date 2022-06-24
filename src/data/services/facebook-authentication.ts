import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repos';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const facebookData = await this.facebookApi.loadUserBy({ token: params.token });
    if (facebookData === undefined) {
      return new AuthenticationError();
    }

    const result = await this.userAccountRepo.load({ email: facebookData.email });
    if (result === undefined) {
      await this.userAccountRepo.createFromFacebook(facebookData);
    }
    return {
      accessToken: ''
    };
  }
}
