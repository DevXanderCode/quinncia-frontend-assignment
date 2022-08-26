import { message } from 'antd';
import axiosclient from './axiosclient';

const apiCall = async ({ body, path, method }) => {
  try {
    const client = await axiosclient();
    let res = null;
    if (method === 'post') res = await client.post(path, body);
    else if (method === 'get') res = await client.get(path);
    else if (method === 'put') res = await client.put(path, body);
    else if (method === 'delete') res = await client.delete(path);

    try {
      const response = await Promise.resolve(res?.data);
      if (response?.success) {
        if (method !== 'get') message.success(response.message || 'Success');
        return response;
      }
      if (method !== 'get') message.error(response.message || 'Something went wrong!', 6);
      return response;
    } catch (error) {
      if (method !== 'get') message.error(error?.response?.message || 'Something went wrong!', 6);
    }
    return true;
  } catch (error) {
    const errorResponse = await Promise.resolve(error?.response?.data);
    message.error(errorResponse?.message || 'Something went wrong!', 6);
    return false;
  }
};

export default apiCall;
