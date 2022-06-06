import api from '../config';

const postSignUp = async (email: string, password: string) => {
  const response = await api.post('/auth/signup', {
    firstName: 'Phong',
    lastName: 'Nguyen',
    email: email,
    password: password,
  });
  console.log(response);

  return response?.data;
};
export default postSignUp;
