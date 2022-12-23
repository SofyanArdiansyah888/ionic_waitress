import { useIonAlert } from "@ionic/react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { ApiService } from "../services/api.service";

const apiService = new ApiService();
export function useTables() {
    const [present] =  useIonAlert();
    function fetchTables() {
        return () => apiService.get(`tables`);
    }
    return useQuery(['tables'], fetchTables(), {
        onError: () => {
            present('Silahkan Cek Koneksi Anda !')
        },
        select: (data) => data?.data?.data
    })

}

export function useUpdateTables() {
    const queryClient = useQueryClient();
    const [present] =  useIonAlert();
    
    function updateTable({ id, ...data } : any) {
      return apiService.put(`tables/${id}`, data);
    }
    return useMutation(updateTable, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["tables"] });
      },
      onError: () => {
        present('Silahkan Cek Koneksi Anda !')
    },
    });
  }