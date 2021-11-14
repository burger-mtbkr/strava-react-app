export const mockStravaSession = {
  token_type: 'token',
  expires_at: Math.round(+new Date(2099, 12, 31) / 1000),
  expires_in: 181164654564564,
  refresh_token: 'abcdef',
  access_token: 'kjghkjhiughu',
  athlete: {
    id: 12345,
    firstname: 'bob',
    lastname: 'biker',
  },
};
