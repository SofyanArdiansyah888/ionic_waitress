import { useIonAlert } from "@ionic/react";
import { useQuery } from "react-query";
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