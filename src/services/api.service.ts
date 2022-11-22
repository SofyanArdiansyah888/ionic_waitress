/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { DatabaseService } from './database.service';

// BASE CONFIGURATION
  export const baseUrlImage = "http://127.0.0.1:8000/uploads/"
  export const baseUrl = `http://127.0.0.1:8000/api`;
  export class ApiService {
    baseConfig = {
         headers: {Authorization: ''}
     };
     

    databaseService = new DatabaseService()

    async get(url: string) {
      this.baseConfig.headers.Authorization =  `Bearer ${this.databaseService.getAccessToken()}`;
      return await axios.get(`${baseUrl}/${url}`, this.baseConfig);
    }

    async post(url: string, data: any) {
      this.baseConfig.headers.Authorization =  `Bearer ${this.databaseService.getAccessToken()}`;
      return await axios.post(`${baseUrl}/${url}`, data, this.baseConfig);
    }

    async put(url: string, data: any) {
      this.baseConfig.headers.Authorization =  `Bearer ${this.databaseService.getAccessToken()}`;
      return await axios.put(`${baseUrl}/${url}`, data, this.baseConfig);
    }
  }

