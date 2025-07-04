import api from '../../utils/middleware';

export const arctypeQuestions = () => {
  return api.get('/Byway/IMAdmin/ArchType');
};

export const arctypeQuestionsById = (moduleId: any, userId: any) => {
  return api.get(`/Byway/IMAdmin/Question/${moduleId}/${userId}`);
};

export const getUserQuestionsById = (id: any) => {
  return api.get(`/Byway/IMProfile/Question/${id}`);
};

export const assignArctypeQuestions = (data: any) => {
  return api.post('/Byway/IMAdmin/Question/Assign', data);
};

export const arctypeAnswers = (data: any) => {
  return api.post('/Byway/IMProfile/Question/ArchType/Answer', data);
};

export const getArctypeAnswer = (UserId: any, QuestionId: any) => {
  return api.get(`/Byway/IMProfile/Question/ArchType/${UserId}/${QuestionId}`);
};

export const getVideoUrl = (id: any) => {
  return api.get(`/Byway/IMProfile/Question/Video/${id}`);
};
