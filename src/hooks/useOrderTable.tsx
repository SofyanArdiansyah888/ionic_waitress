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
            presentAlert('Silahkan Cek Koneksi Anda !')
        },
        select: (data) => data.data
    })

}

interface CreateOrder{
    tempData:any;
    tableId: any;
}

export function useCreateOrder() {
    const queryClient = useQueryClient();
    const [presentAlert] = useIonAlert();
    function createOrder({tempData, tableId} : CreateOrder) {
        return apiService.post(`tables/${tableId}/orders`, tempData)
    }
    return useMutation(createOrder, {
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
