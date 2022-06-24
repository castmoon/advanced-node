import { FacebookAuthentication } from '@/domain/features';
import { LoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (private readonly loadFacebookByUserTokenApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const result = await this.loadFacebookByUserTokenApi.loadUserBy({ token: params.token });
    if (result === undefined) {
      return new AuthenticationError();
    }
    return {
      accessToken: ''
    };
  }
}
