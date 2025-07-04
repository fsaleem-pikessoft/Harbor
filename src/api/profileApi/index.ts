import api from '../../utils/middleware';

export const getAllProfiles = () => {
  return api.get('/Byway/IMProfile/Profile/All');
};

export const getProfile = () => {
  return api.get('/Byway/IMProfile/Profile');
};

export const getProfileById = (id: any) => {
  return api.get(`/Byway/IMProfile/Profile/${id}`);
};

export const createProfile = () => {
  return api.post('/Byway/IMProfile/Profile/Create');
};

export const addProfile = (data: any) => {
  return api.post('IMProfile/Add', data);
};

export const updateProfile = (data: any) => {
  return api.post('/Byway/IMProfile/Profile/Update', data);
};

export const uploadFile = (data: any) => {
  return api.post('/Byway/IMProfile/Profile/UploadBioVideo', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProfileActivity = () => {
  return api.get('/Byway/IMProfile/Profile/Activity');
};
