type FacebookModel = {
  id?: string
  name: string
  email: string
  facebookID: string
};

type AccountModel = {
  id?: string
  name?: string
};

export class FacebookAccount {
  id?: string;
  name: string;
  email: string;
  facebookID: string;

  constructor (facebookModel: FacebookModel, accountModel?: AccountModel) {
    this.id = accountModel?.id;
    this.name = accountModel?.name ?? facebookModel.name;
    this.email = facebookModel.email;
    this.facebookID = facebookModel.facebookID;
  }
}
