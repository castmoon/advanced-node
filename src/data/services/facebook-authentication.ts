import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import { LoadUserAccountRepository } from '../contracts/repos';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly loadFacebookByUserTokenApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const result = await this.loadFacebookByUserTokenApi.loadUserBy({ token: params.token });
    if (result === undefined) {
      return new AuthenticationError();
    }

    await this.loadUserAccountRepo.load({ email: result.email });
    return {
      accessToken: ''
    };
  }
}
