import {apiGet, apiPost} from './config';

export const postSignUp = async (email: string, password: string) => {
  return await apiPost('/auth/signup', {
    firstName: 'Phong',
    lastName: 'Nguyen',
    email: email,
    password: password,
  });
};

export const getCategories = async () => {
  return await apiGet('/categories?pageSize=100&pageNumber=0');
};
export default getCategories;
