import { useIonAlert } from "@ionic/react";
import { useMutation, useQuery } from "react-query";
import { ApiService } from "../services/api.service";

const apiService = new ApiService();
export function useCustomers() {
    const [present] =  useIonAlert();
    function fetchCustomers() {
        return apiService.get(`customers`);
    }
    return useQuery(['customers'], fetchCustomers, {
        staleTime: 1 * 3600 * 1000,
        onError: () => {
            present('Silahkan Cek Koneksi Anda !')
        },
        select: (data) => data?.data?.data ? data?.data?.data : []
    })

}

export function useCreateCustomer(onSuccess: any) {
    function createCustomer(data:  any) {
      return apiService.post(`customers`, data);
    }
    return useMutation(createCustomer, {
      onSuccess,
      onError: () => {}
    });
  }
  