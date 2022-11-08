import { useIonAlert } from "@ionic/react";
import React, { useState } from "react";
const Menu: React.FC<{ onDismiss: () => void; }> = ({ onDismiss }) => {
  const [presentAlert] = useIonAlert();
  const [tab, setTab] = useState(0)

  const handleClick = (data:any) => {
    console.log(data)
    presentAlert({
      header: 'Detail Produk',
      buttons: [{
        text:'Ok',
        handler: (alertData) => {
          alert(JSON.stringify(alertData))
        }

      }],
      inputs: [
        {
          name:'quantity',
          type: 'number',
          placeholder: 'Jumlah',
          min: 1,
          max: 100,
        },
        {
          name:'description',
          type: 'textarea',
          placeholder: 'Keterangan...',
        },
      ],
    
    })
  }

  return (
    <>
      <SearchBar />
      <div className="flex self-center  ">
        <div className="tabs my-4">
          <button className={`tab tab-lifted text-lg ${tab === 0 && "tab-active"}`} onClick={() => setTab(0)} >Menu</button>
          <button className={`tab tab-lifted text-lg  ${tab === 1 && "tab-active"}`} onClick={() => setTab(1)}>Manual</button>
        </div>
      </div>



      <div className="container mx-auto h-screen overflow-scroll  ">
        {
          tab === 0 &&
          <>
            {[1, 2, 3, 4, 5].map((data, index) =>
              <div key={index} className=' flex flex-row gap-4 relative m-2 bg-gray-50 hover:bg-secondary rounded-md p-2 z-[9999]' onClick={() => handleClick(data)}>
                <img className="h-[48px] w-[48px] rounded-md" src="https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE2021080412405056421/detail/menueditor_item_89773e1c5ff14a66a5a2c8a8daa92a25_1628080769929268301.webp" alt="Gambar Makanan" />
                <div className="text-left">
                  <h6 className='font-semibold text-md'>Ikan Pepes</h6>
                  <p className='text-xs  rounded-md  mt-1'>Rica-rica</p>
                </div>
                <p className="absolute right-2 top-2 text-sm font-medium">Rp. 20.000</p>
              </div>)}
          </>
        }
        {
          tab === 1 && <>
            <div className="m-4 flex flex-col gap-6">
              <div className="form-control">
                <input type="text" placeholder="Harga Item" className="input input-bordered input-md w-full " />
              </div>
              <div className="form-control">
                <input type="text" placeholder="Jumlah" className="input input-bordered input-md w-full " />
              </div>
              <div className="form-control">
                <textarea className="textarea textarea-bordered w-full " placeholder="Deskripsi"></textarea>
              </div>
              <div className="form-control">
                <button className="btn btn-outline btn-sm">Tambah Item</button>
              </div>
            </div>
          </>
        }

      </div>
      <div className="absolute bottom-2 w-full px-4 text-center">
        <button className=" btn btn-primary w-full " onClick={() => onDismiss()}>Simpan</button>
      </div>

    </>
  );
}


const SearchBar = () => {
  return (<>
    <div className="search-form   flex items-center space-x-4  mx-auto max-w-screen-xl
  transform duration-500 transition-all">
      <div className="flex bg-gray-100 rounded-lg my-2 mx-2 pl-4 p-2 w-full space-x-2  items-center">

        <input
          className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
          type="text" placeholder="Search for menu..." />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-75 " fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator ">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </div>
          </label>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-24 bg-base-100 shadow ">
            <div className="card-body mx-0">
              <p>Minuman</p>
              <p>Makanan</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>)
}

export default Menu;