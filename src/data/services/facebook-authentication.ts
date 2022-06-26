import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import { SaveFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repos';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const facebookData = await this.facebookApi.loadUserBy({ token: params.token });
    if (facebookData === undefined) {
      return new AuthenticationError();
    }

    const accountData = await this.userAccountRepo.load({ email: facebookData.email });

    await this.userAccountRepo.saveWithFacebook({
      facebookID: facebookData.facebookID,
      id: accountData?.id,
      name: accountData?.name ?? facebookData.name,
      email: facebookData.email
    });
    return {
      accessToken: ''
    };
  }
}
