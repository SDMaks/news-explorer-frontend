const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_URL = NODE_ENV === 'development'
  ? 'http://localhost:3200'
  : 'https://www.api.emnews.students.nomoreparties.space';

export const configurl = {
  url: `${SERVER_URL}`,
};
