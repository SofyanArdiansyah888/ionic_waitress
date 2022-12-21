import { useIonAlert } from "@ionic/react";
import { useQuery } from "react-query";
import { ApiService } from "../services/api.service";

const apiService = new ApiService();
export function useUsers() {
    const [present] =  useIonAlert();
  function fetchUser() {
    return apiService.get(`users?role=WAITRESS`);
  }
  return useQuery(["users"], fetchUser, {
    onError: () => {
        present('Silahkan Cek Koneksi Anda !')
    },
    select: (data) => data.data.data,
  });
}
