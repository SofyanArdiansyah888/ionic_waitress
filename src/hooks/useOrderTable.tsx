import { useIonAlert } from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ApiService } from "../services/api.service";

const apiService = new ApiService();

export function useOrderTable(tableId: string, onSuccess: any) {
    const [presentAlert] = useIonAlert();
    function fetchTables(tableId: string) {
        return () => apiService.get(`tables/${tableId}/orders`);
    }
    return useQuery(['table-order'], fetchTables(tableId), {
        onSuccess,
        onError: () => {
            presentAlert({
                header: "Gagal Koneksi Ke Server",
                buttons: ['Ok']
              })
        },
        select: (data) => data.data
    })

}


export function useCreateOrder(tableId: string, data: any) {
    const queryClient = useQueryClient();
    const [presentAlert] = useIonAlert();
    function createOrder(data: any, tableId: string) {
        return () => apiService.post(`tables/${tableId}/orders`, data)
    }
    return useMutation(createOrder(data, tableId), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['table-order'] })
            presentAlert({
              header: "Berhasil Menginput data",
              buttons: ['Ok']
            })
        },
        onError: () => {
            presentAlert({
                header: "Gagal Menginput data",
                buttons: ['Ok']
              })
        }
    })
}
