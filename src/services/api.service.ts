/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import { DatabaseService } from './database.service';

// BASE CONFIGURATION

  export class ApiService {
    baseConfig = {
         headers: {Authorization: ''}
     };
    baseUrl = 'http://localhost:8000/api';

    databaseService = new DatabaseService()

    async get(url: string) {
      this.baseConfig.headers.Authorization =  `Bearer ${this.databaseService.getAccessToken()}`;
      return await axios.get(`${this.baseUrl}/${url}`, this.baseConfig);
    }

    async post(url: string, data: any) {
      this.baseConfig.headers.Authorization =  `Bearer ${this.databaseService.getAccessToken()}`;
      return await axios.post(`${this.baseUrl}/${url}`, data, this.baseConfig);
    }

    async put(url: string, data: any) {
      this.baseConfig.headers.Authorization =  `Bearer ${this.databaseService.getAccessToken()}`;
      return await axios.put(`${this.baseUrl}/${url}`, data, this.baseConfig);
    }
  }

