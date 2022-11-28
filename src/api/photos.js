import axios from 'axios';

export const getThumbnails = async (page, limit = 10) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/thumbnails?page=${page}&limit=${limit}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUploadUrl = async (formData) => {
  console.log(formData[0].name);
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/photos/${formData[0].name}`,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      // data: formData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadPhotos = async (formData, url) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${url}`,
      headers: {
        'Content-Type': formData.type,
        // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: formData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
