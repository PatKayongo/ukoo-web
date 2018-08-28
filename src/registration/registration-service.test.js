import registrationService from './registration-service';
import http from '../common/http';

describe('Registration Service', () => {
  beforeAll(() => {
    jest.spyOn(http, 'post');
  });

  beforeEach(() => {
    http.post.mockReset();
  });

  afterAll(() => {
    http.post.mockRestore();
  });

  it('should call the http method', (done) => {
    http.post.mockReturnValue(Promise.resolve({}));

    registrationService.register('us@ukoo.com', 'P@ssw0rd1').then(() => {
      expect(http.post).toHaveBeenCalledWith('/api/user', {
        email: 'us@ukoo.com',
        password: 'P@ssw0rd1',
      });
      done();
    });
  });
});
