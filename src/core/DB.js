import axios from "axios";
import { base_headers, file_headers } from "../api/configAPI"

const ERROR_AUTHEN = "401";

export const getData = async (url) => {
    try {
      const response = await axios({
        method: "GET",
        url: url,
        headers: base_headers(),
      });
      if (response.status === ERROR_AUTHEN) {
        window.location = "/login";
      }
  
      if (response.status === 200) {
        if (response.data.code === ERROR_AUTHEN) {
          window.location = "/login";
        }
        console.log("Returned: " + response.data)
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