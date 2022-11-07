import Navbar from "../../components/Navbar";
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
export default function Menu() {
  return (
    <>
      {/* <Navbar /> */}

      <div className="search-form   flex items-center space-x-4  mx-auto max-w-screen-xl
  transform duration-500 transition-all">
        <div className="flex bg-slate-300 pl-4 p-2 w-full space-x-2  items-center">

          <input
            className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
            type="text" placeholder="Search for menu..." />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-75 " fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <p>Minuman</p>
                <p>Makanan</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <IonSegment value="default">
        <IonSegmentButton value="default">
          <IonLabel className="text-xs">Menu</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="segment">
          <IonLabel className="text-xs">Manual</IonLabel>
        </IonSegmentButton>
      </IonSegment>

 

      <div className="container mx-auto h-screen overflow-scroll">
        {/* <div className="grid grid-cols-2"> */}
        {[1, 2, 3, 4, 5].map((data, index) => <>
          <div key={index} className=' flex flex-row gap-4 relative m-2 bg-gray-100 rounded-md p-2'>
            <img className="h-[48px] w-[48px] rounded-md" src="https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/IDITE2021080412405056421/detail/menueditor_item_89773e1c5ff14a66a5a2c8a8daa92a25_1628080769929268301.webp" alt="Gambar Makanan" />
            <div className="text-left">
              <h6 className='font-semibold text-md'>Ikan Pepes</h6>
              <p className='text-xs  rounded-md  mt-1'>Rica-rica</p>
            </div>
            <p className="absolute right-1 top-1 text-sm font-medium">Rp. 20.000</p>
          </div></>)}
        {/* </div> */}

      </div>
      <div className="absolute bottom-2 w-full px-4 text-center">
      <button className=" btn btn-primary w-full ">Simpan</button>
      </div>
      
    </>
  );
}


