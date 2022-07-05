import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import {
  SaveFacebookAccountRepository,
  LoadUserAccountRepository
} from '../contracts/repos';
import { FacebookAccount } from '@/domain/models';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository &
    SaveFacebookAccountRepository
  ) {}

  async perform (
    params: FacebookAuthentication.Params
  ): Promise<FacebookAuthentication.Result> {
    const facebookData = await this.facebookApi.loadUserBy(params);
    if (facebookData === undefined) {
      return new AuthenticationError();
    }

    const accountData = await this.userAccountRepo.load({
      email: facebookData.email
    });

    const facebookAccount = new FacebookAccount(facebookData, accountData);

    await this.userAccountRepo.saveWithFacebook(facebookAccount);
    return {
      accessToken: ''
    };
  }
}
