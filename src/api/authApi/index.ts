import api from '../../utils/middleware';

export const userLogin = (data: any) => {
  return api.post('/User/authenticate', data);
};

export const signUp = (data: any) => api.post('/user/register', data);

export const meAuth = () => api.get('/User/me');
