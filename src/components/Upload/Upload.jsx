import axios from "axios";

export const uploadOne = async (file) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fleettracker");
    data.append(`api_key`, process.env.REACT_APP_API_KEY);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
      data
    );
    return res.data.secure_url;
  } catch (error) {
    console.log(error, 'error:');
  }
};
