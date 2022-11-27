import { useMutation } from "react-query";
import { ApiService } from "../services/api.service";

const apiService = new ApiService();
export function useLogin(onSuccess: any, onError: any) {
    function login(data:  any) {
      return apiService.post(`login-waiters`, data);
    }
    return useMutation(login, {
      onSuccess,
      onError
    });
  }