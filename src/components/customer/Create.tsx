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
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutate, isLoading: isCreateCustomer } = useCreateCustomer((data: any) => {
        const customer = data?.data?.data;
        setSelectedCustomer({
            customer_id: customer?.id,
            customer_name: customer?.name,
            customer_phone: customer?.phone,
            customer_email: customer?.email,
        })
        queryClient.invalidateQueries({ queryKey: ['customers'] })
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
                    <button className="btn btn-outline btn-sm" disabled={isCreateCustomer}>Tambah Customer</button>
                </div>
            </div>
        </form>
    )
}