import api from '../../utils/middleware';

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const userLogin = (data: LoginData) => {
  return api.post('/User/authenticate', data);
};

export const signUp = (data: SignUpData) => api.post('/user/register', data);

export const meAuth = () => api.get('/User/me');
