import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";


interface ManualProps {
    setSelectedMenu: Dispatch<SetStateAction<any>>;
}
export function Manual({ setSelectedMenu }: ManualProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data: any) => {
        const dataToStore = {
            product_id: 1,
            variant_name: null,
            variant_id: 1,
            ...data
        }
        setSelectedMenu((menu: any) => [
            ...menu,
            dataToStore
        ])
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4 flex flex-col gap-6">
                <div className="form-control">
                    <input type="text" {...register("product_name", { required: true })} placeholder="Nama Produk" className="input input-bordered input-md w-full " />
                    {errors.product_name && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <input type="text" {...register("item_price", { required: true })} placeholder="Harga Item" className="input input-bordered input-md w-full " />
                    {errors.item_price && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <input type="text" {...register("quantity", { required: true })} placeholder="Jumlah" className="input input-bordered input-md w-full " />
                    {errors.quantity && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full " placeholder="Deskripsi"></textarea>
                    {errors.description && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <button className="btn btn-outline btn-sm">Tambah Item</button>
                </div>
            </div>
        </form>
    )
}