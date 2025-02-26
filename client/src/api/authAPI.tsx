import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await axios.post('/api/auth/login', {userInfo});
    localStorage.setItem('token', response.data.token); //storing token in local
    return response.data;
  }
  catch (error) {
    throw new Error ('Login failed');
  }
};



export { login };
