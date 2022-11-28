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
        onError: () => {
            present('Silahkan Cek Koneksi Anda !')
        },
        select: (data) => {
           let products =  data?.data?.data
           return products.map((product: any) => {
            if(!product.materials){
                product.available = true;
            }else{
                product.materials.sort(( a:any, b:any ) =>  a.stock - b.stock )
                if(product.materials[0].stock > 0){
                    product.available = true;
                }else{
                    product.available = false;
                }
            }
            return product
           })
        }
    })

}