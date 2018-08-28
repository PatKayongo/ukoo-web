import http from '../common/http';

export default {
  register: (email, password) => http.post('/api/user', { email, password }),
};
