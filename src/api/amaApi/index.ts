import api from '../../utils/middleware';

export const createQuestion = (data: any) => {
  return api.post('/Byway/IMAdmin/AMA', data);
};

export const assignQuestion = (data: any) => {
  return api.post('/IMProfile/Questions/Assign', data);
};

export const submitAnswer = (data: any) => {
  return api.post('/IMProfile/Questions/submit-answer', data);
};

export const getUserQuestionById = (id: any) => {
  return api.get(`/Byway/IMProfile/Question/${id}`);
};

export const getAnswer = (data: any) => {
  return api.post('/IMProfile/Questions/GetAnswer', data);
};

export const updateAnswer = (data: any) => {
  return api.post('/IMProfile/Questions/update-answer', data);
};

export const questionStatus = (data: any) => {
  return api.post('/IMProfile/Questions/Status', data);
};

export const deleteQuestion = (data: any) => {
  return api.post('/IMProfile/Questions/Delete', data);
};

export const getAllQuestions = () => {
  return api.get('/Byway/IMAdmin/AMA');
};
