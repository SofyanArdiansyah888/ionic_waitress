import { useIonAlert } from "@ionic/react";
import React, { useState } from "react";
const Customer: React.FC<{ onDismiss: () => void; }> = ({ onDismiss }) => {
  const [presentAlert] = useIonAlert();
  const [tab, setTab] = useState(0)


  const handleClick = (data: any) => {
 
  }

  return (
    <>
      <SearchBar onDismiss={onDismiss} />
      <div className="flex self-center  ">
        <div className="tabs my-4">
          <button className={`tab tab-lifted text-lg ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)} >List</button>
          <button className={`tab tab-lifted text-lg  ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Buat Baru</button>
        </div>
      </div>



      <div className="container mx-auto h-screen overflow-scroll  ">
        {
          tab === 0 &&
          <>
            {[1, 2, 3, 4, 5].map((data, index) =>
              <div key={index} className=' flex flex-row gap-4 relative m-2 bg-gray-50 hover:bg-secondary rounded-md p-2 z-[9999]' onClick={() => handleClick(data)}>
                
                <div className="text-left">
                  <h6 className='font-semibold text-md'>Endank Soekamti</h6>
                  <p className='text-xs  rounded-md  mt-1'>endang@gmail.com</p>
                  
                </div>
                <p className="absolute right-2 top-2 text-xs font-medium">085211818885</p>
        
              </div>)}
          </>
        }
        {
          tab === 1 && <>
            <div className="m-4 flex flex-col gap-6">
              <div className="form-control">
                <input type="text" placeholder="Nama" className="input input-bordered input-md w-full " />
              </div>
              <div className="form-control">
                <input type="email" placeholder="Email" className="input input-bordered input-md w-full " />
              </div>
              <div className="form-control">
                <input type="text" placeholder="Telepon" className="input input-bordered input-md w-full " />
              </div>
              <div className="form-control">
                <button className="btn btn-outline btn-sm">Tambah Customer</button>
              </div>
            </div>
          </>
        }

      </div>
      {/* <div className="absolute bottom-2 w-full px-4 text-center">
        <button className=" btn btn-primary w-full " onClick={() => onDismiss()}>Simpan</button>
      </div> */}

    </>
  );
}

interface SearchBarProps {
  onDismiss: () => void;
}

const SearchBar = ({ onDismiss }: SearchBarProps) => {

  return (<>
    <div className="search-form   flex items-center space-x-4  mx-auto max-w-screen-xl
  transform duration-500 transition-all">
      <div className="flex bg-gray-100 rounded-lg my-2 mx-2 pl-4 p-2 w-full space-x-2  items-center">
        <div onClick={() => onDismiss()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </div>

        <input
          className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
          type="text" placeholder="Search for customer..." />

      </div>

    </div>
  </>)
}

export default Customer;