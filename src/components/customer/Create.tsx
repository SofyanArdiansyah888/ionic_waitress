import { useIonLoading } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { ApiService } from "../../services/api.service";

interface CreateProps {
    setSelectedCustomer: Dispatch<SetStateAction<any>>;
    setCustomerModalOpen: Dispatch<SetStateAction<any>>;
}
const apiService = new ApiService()
export const Create = ({ setSelectedCustomer, setCustomerModalOpen }: CreateProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const mutation = useMutation((data) => apiService.post(`customers`, data))
    const [present, dismiss] = useIonLoading();
    const queryClient = useQueryClient()

    useEffect(() => {
        if (mutation.isLoading)
            present({ message: "Loading..." })
        else {
            if (mutation.isSuccess) {
                console.log(mutation.data.data)
                setSelectedCustomer(mutation.data.data.data)
                queryClient.invalidateQueries({queryKey:['customers']})
                dismiss()
                setCustomerModalOpen(false)
            }
        }
        return () => { }
    }, [mutation.isLoading])

    const onSubmit = (data: any) => {
        mutation.mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4 flex flex-col gap-6">
                <div className="form-control">
                    <input type="text" placeholder="Nama" {...register("name", { required: true })} className="input input-bordered input-md w-full " />
                    {errors.name && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <input type="email" placeholder="Email" {...register("email")} className="input input-bordered input-md w-full " />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="Telepon" {...register("phone")} className="input input-bordered input-md w-full " />
                </div>
                <div className="form-control">
                    <button className="btn btn-outline btn-sm">Tambah Customer</button>
                </div>
            </div>
        </form>
    )
}