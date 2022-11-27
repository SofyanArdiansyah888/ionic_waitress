import { useIonLoading } from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useCreateCustomer } from "../../hooks/useCustomer";

interface CreateProps {
    setSelectedCustomer: Dispatch<SetStateAction<any>>;
    setCustomerModalOpen: Dispatch<SetStateAction<any>>;
}

export const Create = ({ setSelectedCustomer, setCustomerModalOpen }: CreateProps) => {
    const queryClient = useQueryClient()
    const [present, dismiss] = useIonLoading();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const {mutate} = useCreateCustomer((data:any) => {
        setSelectedCustomer(data?.data?.data)
        queryClient.invalidateQueries({queryKey:['customers']})
        dismiss()
        setCustomerModalOpen(false)
    });
    
    return (
        <form onSubmit={handleSubmit((data) => mutate(data))}>
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