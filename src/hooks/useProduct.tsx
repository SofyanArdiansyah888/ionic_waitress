import { useIonAlert } from "@ionic/react";
import { useQuery } from "react-query";
import { ApiService } from "../services/api.service";

const apiService = new ApiService();
export function useProducts() {
    const [present] =  useIonAlert();
    function fetchProducts() {
        return () => apiService.get(`products`);
    }
    return useQuery(['products'], fetchProducts(), {
        staleTime: 3 * 60 * 60 * 1000,
        onError: () => {
            present('Silahkan Cek Koneksi Anda !')
        },
        select: (data) => data?.data?.data
    })

}