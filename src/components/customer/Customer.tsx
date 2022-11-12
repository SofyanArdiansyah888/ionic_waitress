/* eslint-disable no-sequences */
import { useIonAlert } from "@ionic/react";
import React, { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { ApiService } from "../../services/api.service";
import EmptyBox from "../EmptyBox";
import SkeletonList from "../SkeletonList";
import { SearchBar } from "./SearchBar";
import { Tab1 } from "./Tab1";



const apiService = new ApiService()
interface CustomerProps {
  setCustomerModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCustomer: Dispatch<SetStateAction<any>>;
  selectedCustomer: any | null;
}

function Customer({ setCustomerModalOpen, setSelectedCustomer, selectedCustomer }: CustomerProps) {
  const [presentAlert] = useIonAlert();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const { isFetching, data, error, refetch } = useQuery(['customers'], () => apiService.get(`customers`), {
    staleTime: 1 * 3600 * 1000
  });

  const handleClick = (data: any) => {
    setSelectedCustomer(data);
    setCustomerModalOpen(false);
  };

  const filterData = () => {
    return data?.data?.data.filter((item: any) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <SearchBar handleChange={(event) => {
        setSearch(event.target.value);
      }}
        setCustomerModalOpen={setCustomerModalOpen} />
      <div className="flex  ">
        <div className="tabs my-4">
          <button className={`tab tab-lifted text-lg ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)}>List</button>
          <button className={`tab tab-lifted text-lg  ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Buat Baru</button>
        </div>
      </div>



      <div className="container mx-auto h-screen overflow-scroll  ">
        {tab === 0 &&
          <>
            {isFetching && <SkeletonList />}
            {data?.data?.data.length === 0 && !isFetching ? <EmptyBox /> : null}
            {!isFetching && <>   {filterData().map((customer: any, index: React.Key | null | undefined) => <div key={index} className={`flex flex-row gap-4 relative m-2 ${selectedCustomer && selectedCustomer.id === customer.id ? "bg-secondary" : "bg-gray-50"} hover:bg-secondary rounded-md p-2 z-[9999]`} onClick={() => handleClick(customer)}>

              <div className="text-left ">
                <h6 className='font-semibold text-md'>{customer.name}</h6>
                <p className='text-xs  rounded-md  mt-1'>{customer.email ?? "-"}</p>

              </div>
              <p className="absolute right-2 top-2 text-xs font-medium">{customer.phone ?? "-"}</p>

            </div>)}
            </>}
          </>}
        {tab === 1 && <Tab1 setSelectedCustomer={setSelectedCustomer} setCustomerModalOpen={setCustomerModalOpen} />}

      </div>

    </>
  );
}





export default Customer;