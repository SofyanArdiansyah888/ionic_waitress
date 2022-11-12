import { IonItemSliding, IonModal, useIonModal } from "@ionic/react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import Customer from "../../components/customer/Customer";
import { useQuery } from "react-query";
import { ApiService } from "../../services/api.service";
import { ChangeEventHandler, Dispatch, Key, SetStateAction, useEffect, useState } from "react";
import EmptyBox from "../../components/EmptyBox";
import SkeletonList from "../../components/SkeletonList";
import { formatRupiah } from "../../utils/formatter";

const apiService = new ApiService();
export default function Meja() {
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const history = useHistory()
  const tableId = history?.location?.pathname?.split('/')[2];
  const { isFetching, data, error, refetch } = useQuery(['table-order'], () => apiService.get(`tables/${tableId}/orders`))

  const [present, dismiss] = useIonModal(Menu, {
    onDismiss: () => { dismiss() }
  })


  const handleSimpan = () => {

  }
  const handleTambah = () => {
    present({
      animated: true
    })
  }

  const filterData = () => {
    return data?.data?.data.filter((item: any) =>
      item.pivot.product_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  }

  return (
    <>
      {/* <Navbar isBackButton={true} /> */}
      <SearchBar handleChange={(event) => {
        setSearch(event.target.value)
      }}
        setCustomerModalOpen={setCustomerModalOpen}
        selectedCustomer={selectedCustomer} />
      <div className="container mx-auto h-screen overflow-scroll pb-32 ">
        {isFetching && <SkeletonList />}
        {
          data?.data?.data.length === 0 && !isFetching ? <EmptyBox /> : null
        }

        {!isFetching && <>{filterData().map((product: any, index: Key | null | undefined) =>
          <>
            <div key={index} className=' flex flex-row gap-4 relative m-2 bg-gray-50 rounded-md p-2'>

              <div className="text-left">
                <h6 className='font-semibold text-md capitalize'>{product?.pivot?.product_name}</h6>
                <p className='text-xs  rounded-md  mt-1 capitalize'>{product?.pivot?.variant_name}</p>
                <p className='text-xs  rounded-md  mt-1'>{product?.pivot?.description}</p>
              </div>
              <div className="absolute flex gap-2 text-red-400 right-2 bottom-2 text-sm font-medium z-50">
                <input placeholder="0" className=" w-16 h-auto input input-bordered input-sm" value={product.pivot.quantity} />
                <button className="items-center btn btn-error btn-sm text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>

              <p className="absolute right-2 top-2 text-sm font-medium">{formatRupiah(product?.pivot?.item_price ?? 0, 'Rp.')}</p>
            </div>
          </>
        )}
          {/* <div className="text-right text-sm font-semibold mr-8">Total Payment: {formatRupiah(0,'Rp.')}</div>
        <div className="text-right text-sm font-semibold mr-8">Total Quantity: 0</div> */}
        </>
        }

      </div>
      <div className="absolute bottom-0 w-full px-4 py-2 text-center bg-base-100 flex gap-2 z-50">
        <button className=" btn btn-primary flex-1 " onClick={handleSimpan}>Simpan</button>
        <button className=" btn btn-outline flex-1 " onClick={handleTambah}>Tambah</button>
      </div>
      <IonModal isOpen={customerModalOpen}>
        <Customer
          setCustomerModalOpen={setCustomerModalOpen}
          setSelectedCustomer={setSelectedCustomer}
          selectedCustomer={selectedCustomer} />
      </IonModal>
    </>
  );
}
interface SearchBarProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  setCustomerModalOpen: Dispatch<SetStateAction<boolean>>
  selectedCustomer: any | null
}

const SearchBar = ({ handleChange, setCustomerModalOpen, selectedCustomer }: SearchBarProps) => {

  const history = useHistory()

  return (<>
    <div className="search-form   flex items-center space-x-4  mx-auto max-w-screen-xl
  transform duration-500 transition-all">
      <div className="flex bg-gray-100 rounded-lg my-2 mx-2 pl-4 p-2 w-full space-x-2  items-center ">
        <svg onClick={() => {
          history.goBack()
        }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <input
          className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
          type="text" placeholder="Search for menu..."
          onChange={handleChange} />


        <label tabIndex={0} className="btn btn-ghost btn-circle text-gray-500" onClick={() => setCustomerModalOpen(true)}>
          <div className={`indicator ${!selectedCustomer && "text-red-900"}`}  >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><circle cx="12" cy="10" r="2"></circle><line x1="8" y1="2" x2="8" y2="4"></line><line x1="16" y1="2" x2="16" y2="4"></line></svg>
          </div>
        </label>
      </div>

    </div>
  </>)
}