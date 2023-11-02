import axios from "axios";
const ERROR_AUTHEN = 401;

export const getData = async (url) => {
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      if (response.status === ERROR_AUTHEN) {
        window.location = "/login";
      }
  
      if (response.status === 200) {
        if (response.data.code === ERROR_AUTHEN) {
          window.location = "/login";
        }
        return response.data;
        
      } else {
        console.error("Failed to fetch data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  };

export const getDataParams = async (url, params) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      params: params,
    });
    if (response.status === ERROR_AUTHEN) {
      window.location = "/login";
    }

    if (response.status === 200) {
      if (response.data.code === ERROR_AUTHEN) {
        window.location = "/login";
      }
      return response.data;
    } else {
      console.error("Failed to fetch data:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};