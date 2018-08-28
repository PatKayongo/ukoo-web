import axios from 'axios';
import http from './http';

jest.mock('axios');

describe('http library', () => {
  beforeEach(() => {
    axios.mockReset();
  });

  it('should use the GET method for a get call', () => {
    axios.mockReturnValue(Promise.resolve({}));
    http.get('/example');
    expect(axios).toHaveBeenLastCalledWith({
      method: 'GET',
      url: '/example',
      data: undefined,
      headers: {},
    });
  });

  it('should use the POST method for a post call', () => {
    axios.mockReturnValue(Promise.resolve({}));
    http.post('/example', { prop: 'yes' });

    
    expect(axios).toHaveBeenLastCalledWith({
      method: 'POST',
      url: '/example',
      data: { prop: 'yes' },
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('should return errors from reject if error message included', (done) => {
    const error = new Error('Something went wrong');
    error.response = {
      data: {
        errors: ['You have wrong information'],
      },
      status: 400,
    };

    axios.mockReturnValue(Promise.reject(error));
    http.post('/example', { prop: 'yes' }).catch((e) => {
      expect(e.message).toEqual('You have wrong information');
      done();
    });
  });

  it('should return errors from reject if error message not included', (done) => {
    const error = new Error('Oh dear');
    error.response = {
      data: {},
      status: 400,
    };

    axios.mockReturnValue(Promise.reject(error));
    http.post('/example', { prop: 'yes' }).catch((e) => {
      expect(e.message).toEqual(
        'We are currently experiencing technical difficulties'
      );
      done();
    });
  });
});
