import instance from '..';
import handleError from '../ultis/handleError';

export default async(userId: string) => {
  if (!userId) {
    return handleError({message: 'User ID is required'});
  }
  const response = await instance.get(`users/${userId}`);
  return response.data;
};
