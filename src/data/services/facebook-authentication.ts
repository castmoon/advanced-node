import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import { CreateFacebookAccountRepository, LoadUserAccountRepository, UpdateFacebookAccountRepository } from '../contracts/repos';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const facebookData = await this.facebookApi.loadUserBy({ token: params.token });
    if (facebookData === undefined) {
      return new AuthenticationError();
    }

    const accountData = await this.userAccountRepo.load({ email: facebookData.email });
    if (accountData === undefined) {
      await this.userAccountRepo.createFromFacebook(facebookData);
    }

    await this.userAccountRepo.updateWithFacebook({
      facebookID: facebookData.facebookID,
      id: accountData?.id as string,
      name: accountData?.name
    });
    return {
      accessToken: ''
    };
  }
}
