import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useIonToast } from "@ionic/react";

interface VariantProps {
    setVariantModal: Dispatch<SetStateAction<boolean>>;
    setSelectedProduct: Dispatch<SetStateAction<any>>;
    setSelectedMenu: Dispatch<SetStateAction<any>>;
    selectedMenu: any;
    selectedProduct: any;
}

const schema = yup.object({
    quantity: yup.number().min(1).required(),
    description: yup.string().required(),
});
type FormInputs = {
    product_name: string;
    item_price: number;
    quantity: number;
    description: string;
};

export default function Variant({
    setVariantModal,
    setSelectedMenu,
    selectedMenu,
    selectedProduct
}: VariantProps) {
    const [presentToast] = useIonToast();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const [selectedVariant, setSelectedVariant] = useState<any>();

    useEffect(() => {
        setValue('product_name', selectedProduct.name)
        setValue('item_price', selectedProduct.price)
    }, [selectedProduct.name, selectedProduct.price, setValue])


    const onSubmit = (data: any) => {
        if (selectedVariant) {
            let isExist = selectedMenu.some((menu: any) => {
                return menu.product_id === selectedProduct.id && menu.variant_id === selectedVariant.id
            })
            if (isExist) {
                let temp = selectedMenu.map((menu: any) => {
                    if (menu.product_id === selectedProduct.id && menu.variant_id === selectedVariant.id) {
                        menu.quantity += data.quantity
                        menu.description += ", " + data.description
                    }
                    return menu;
                });
                setSelectedMenu(temp)
            } else {
                setSelectedMenu([
                    ...selectedMenu,
                    {
                        "product_id": selectedProduct.id,
                        "product_name": selectedProduct.name,
                        "variant_id": selectedVariant?.id,
                        "variant_name": selectedVariant?.name,
                        "quantity": data.quantity,
                        "item_price": data.item_price,
                        'description': data.description,
                        'created_at': null
                    }
                ])
            }
        } else {
            let isExist = selectedMenu.some((menu: any) => {
                return menu.product_id === selectedProduct.id
            })
            if (isExist) {
                let temp = selectedMenu.map((menu: any) => {
                    if (menu.product_id === selectedProduct.id) {
                        menu.quantity += data.quantity
                        menu.description += ", " + data.description
                    }
                    return menu;
                });
                setSelectedMenu(temp)
            } else {
                setSelectedMenu([
                    ...selectedMenu,
                    {
                        "product_id": selectedProduct.id,
                        "product_name": selectedProduct.name,
                        "variant_id": "",
                        "variant_name": "",
                        "quantity": data.quantity,
                        "item_price": data.item_price,
                        'description': data.description,
                        'created_at': null
                    }
                ])
            }
        }

        // let menus = selectedMenu.map((menu: any) => {
        //     if(menu.product_id === selectedProduct.id && menu.variant_id)
        // });

        presentToast({
            message: 'Item Telah Ditambahkan!',
            duration: 1000,
            position: "bottom",
        });
        setVariantModal(false)
    }

    const handleSelectVariant = (variant: any) => {
        setValue('item_price', variant.price)
        setSelectedVariant(variant);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4 flex flex-col gap-3">
                {selectedProduct.variants.length > 0 &&
                    <div className="form-control" >
                        <label className="font-semibold">Pilih Variant</label>
                        {selectedProduct.variants.map((variant: any) =>
                            <div onClick={() => handleSelectVariant(variant)} className={`box ${selectedVariant?.id === variant.id ? "bg-secondary" : "bg-gray-100"} w-full h-[50px] mt-2 rounded-md text-center pt-2 text-xl`}>
                                {variant.name}
                            </div>)}
                    </div>}
                <div className="form-control">
                    <label className="font-medium mb-2">Nama Produk</label>
                    <input type="text" {...register("product_name", { required: true })} placeholder="Nama Produk" className="input input-bordered input-md w-full " disabled />
                    {errors.product_name && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="font-medium mb-2">Harga Item</label>
                    <input type="text" {...register("item_price", { required: true })} placeholder="Harga Item" className="input input-bordered input-md w-full " disabled />
                    {errors.item_price && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="font-medium mb-2">Jumlah</label>
                    <input type="text" {...register("quantity", { required: true })} placeholder="Jumlah" className="input input-bordered input-md w-full " />
                    {errors.quantity && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>
                <div className="form-control">
                    <label className="font-medium mb-2">Catatan Pelanggan</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full " placeholder="Deskripsi"></textarea>
                    {errors.description && <span className="text-xs text-red-700 mt-1 font-semibold">This field is required</span>}
                </div>

                <div className="form-control flex flex-row gap-6">
                    <button className="btn btn-outline btn-md flex-1">Tambah Item</button>
                    <button className="btn btn-primary btn-md flex-1" onClick={() => setVariantModal(false)}>Kembali</button>
                </div>
            </div>
        </form>
    )
}