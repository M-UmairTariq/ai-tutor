import { CONSTANTS } from "@/constants/constants";
import { LoginCredentials } from "@/types/auth";
import axios from "axios"


class AuthService {
  static APICall = (endpoint: string, method: string, data?: any) => {
    return axios({
      method,
      url: endpoint,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') ? {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        } : {})
      }
    });
  };

  static LoginService = (credentials: LoginCredentials) => {
    return this.APICall(CONSTANTS.API.AUTH.LOGIN, CONSTANTS.POST, credentials);
  };
}

export default AuthService;