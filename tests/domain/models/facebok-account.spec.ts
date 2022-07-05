import { FacebookAccount } from '@/domain/models';

describe('Facebook account', () => {
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookID: 'any_fb _id'
  };

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData);

    expect(sut).toEqual({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookID: 'any_fb _id'
    });
  });

  it('should update name if its empty', () => {
    const accountData = {
      id: 'any_id',
      name: 'any_name'
    };
    const sut = new FacebookAccount(fbData, accountData);

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookID: 'any_fb _id'
    });
  });
});
