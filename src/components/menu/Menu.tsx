import { Dispatch, Key, SetStateAction, useState } from "react";
import { useProducts } from "../../hooks/useProduct";
import { baseUrlImage } from "../../services/api.service";
import { formatRupiah } from "../../utils/formatter";
import EmptyBox from "../EmptyBox";
import SkeletonList from "../SkeletonList";
import { SearchBar } from "./SearchBar";
import { Manual } from "./Manual";

interface MenuProps {
  setMenuModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedMenu: Dispatch<SetStateAction<any>>;
  selectedMenu: any;
}

function Menu({
  setMenuModalOpen, setSelectedMenu, selectedMenu
}: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const [tab, setTab] = useState(0);
  const { isLoading, data } = useProducts()

  const filterData = () => {
    let filterProducts = data.filter((item: any) =>
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    if (selectedCategory !== "All") {
      filterProducts = filterProducts.filter((item: any) =>
        item?.category?.name
          .toLocaleLowerCase()
          .includes(selectedCategory.toLocaleLowerCase())
      );
    }
    return filterProducts;
  };


  return (
    <>
      <SearchBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setMenuModalOpen={setMenuModalOpen}
        handleChange={(event) => {
          setSearch(event.target.value);
        }} />
      <div className="flex ">
        <div className="tabs my-4">
          <button className={`tab tab-lifted text-lg ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)}>Menu</button>
          <button className={`tab tab-lifted text-lg  ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Manual</button>
        </div>
      </div>



      <div className="container mx-auto h-screen overflow-scroll pb-24  ">
        {tab === 0 &&
          <>

            {isLoading && <SkeletonList />}
            {data && data.length === 0 && !isLoading ? <EmptyBox /> : null}
            {!isLoading &&
              <>
                {filterData().map((product: any, index: Key | null | undefined) => <>
                  <div className=' flex flex-row justify-between gap-4  m-2 bg-gray-50 hover:bg-secondary rounded-md p-2 '
                    onClick={() =>
                      setSelectedMenu([
                        ...selectedMenu,
                        {
                          "product_id": product.id,
                          "product_name": product.name,
                          "variant_id": product.variant_id,
                          "variant_name": product.variant_name,
                          "quantity": 1,
                          "item_price": product.price,
                          'description': '',
                          'created_at': null
                        }
                      ])
                    }>
                    <div className="flex">
                      <img className="h-[48px] w-[48px] rounded-md" src={`${baseUrlImage}/products/${product.photo}`} alt="Gambar Makanan" />
                      <div className="text-left ml-4">
                        <h6 className='font-semibold text-md'>{product.name}</h6>
                        <p className='text-xs  rounded-md  mt-1 w-full'>{product.variant_name ? product.variant_name : ''}
                          {
                            product.materials.length > 0 &&
                            <span className="text-right font-semibold"> (stock  {product?.materials[0]?.stock})</span>
                          }
                        </p>
                      </div>
                    </div>

                    <p className=" text-sm font-medium">{formatRupiah(product.variant_price ? product.variant_price : product.price ? product.price : 0, 'Rp.')}</p>
                  </div>
                </>
                )}
              </>}
          </>}
        {tab === 1 && <Manual setSelectedMenu={setSelectedMenu} />}

      </div>
      <div className="absolute bottom-0 py-2 w-full px-4 text-center bg-white border-none">
        <button className=" btn btn-primary w-full " onClick={() => setMenuModalOpen(false)}>Kembali</button>
      </div>

    </>
  );
}


export default Menu;