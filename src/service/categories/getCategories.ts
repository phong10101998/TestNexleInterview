import api from '../config';

const getCategories = async () => {
  api.setHeaders({
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjljMzk5YTJjMjY2MTVmNTJiYTE5ZmEiLCJpYXQiOjE2NTQ0MDU1MzEsImV4cCI6MTY1NDQ5MTkzMX0.bJdHJo1TFeZPP6q-OPeVhFyrkISme494w4ALw_1uCAQ',
  });
  const response = await api.get(
    'http://streaming.nexlesoft.com:4000/api/categories?pageSize=100&amp;pageNumber=0',
  );
  console.log(response);

  return response?.data;
};
export default getCategories;
