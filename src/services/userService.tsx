
import request from './request';
import config from '../config'; 
import {User} from '../models/userModel';
import axios from 'axios';
import { UserProfile } from '../models/userProfileModel';



const api = axios.create({
  baseURL: config.apiURL, 
});
class UserService {
  private apiUrl = config.apiURL;

  private getHttpOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
      }
    };
  }

  

//   async getUser(userId: string): Promise<any> {
//   try {
//     const response = await request.get(`${this.apiUrl}/api/User/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     throw this.handleError(error);
//   }
// }

async getUser(userId: string | number): Promise<UserProfile> {
  try {
    const id = String(userId); // always ensure it's a string
    const response = await api.get(`/api/User/${id}`);
    
    // log to check actual shape
    console.log("getUser response:", response.data);

    return response.data; // or response.data.data depending on API
  } catch (error) {
    console.error('Error fetching user:', error);
    throw this.handleError(error);
  }
}


  async getUsers(): Promise<User[]> {
    const response = await api.get("/api/User"); // only relative path
    console.log("API raw response:", response.data);
    return response.data; // or response.data.data depending on your API shape
  }

  

  async addUser(user: any): Promise<any> {
    try {
      const response = await request.post(
        `${this.apiUrl}/api/User`,
        JSON.stringify(user),
        this.getHttpOptions()
      );
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw this.handleError(error);
    }
  }

  async updateUser(userId: string, user: any): Promise<any> {
    try {
      const response = await request.put(
        `${this.apiUrl}/api/User/${userId}`,
        JSON.stringify(user),
        this.getHttpOptions()
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw this.handleError(error);
    }
  }

  private handleError(error: any): { message: string; status?: number; data?: any } {
    if (error.response) {
      return {
        message: error.response.data?.message || 'API request failed',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      return { message: 'No response received from server' };
    } else {
      return { message: error.message || 'Unknown error occurred' };
    }
  }
}

const userService = new UserService();
export default userService;