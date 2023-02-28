import http from 'src/utils/http';

export const requestOTPApi = async (phone: string) => {
  try {
    const {data} = await http.post('/auth', {phone});
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTPApi = async (phone: string, code: string) => {
  try {
    const {data} = await http.post('/auth/code', {phone, code});
    return data;
  } catch (error) {
    console.log(error);
  }
};
