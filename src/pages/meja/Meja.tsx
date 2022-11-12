import { useIonModal } from "@ionic/react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import Customer from "../../components/Customer";

export default function Meja() {

  const [present, dismiss] = useIonModal(Menu, {
    onDismiss: () => dismiss()
  })

  const tables = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const handleSimpan = () => {

  }
  const handleTambah = () => {
    present({
      animated: true
    })
  }

  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }
  return (
    <>
      {/* <Navbar isBackButton={true} /> */}
      <SearchBar handleBack={handleBack} />
      <div className="container mx-auto h-screen overflow-scroll pb-32 ">

        {tables.map((data, index) => <>
          <div key={index} className=' flex flex-row gap-4 relative m-2 bg-gray-50 rounded-md p-2'>

            <div className="text-left">
              <h6 className='font-semibold text-md'>Ikan Pepes</h6>
              <p className='text-xs  rounded-md  mt-1'>Rica-Rica</p>
              <p className='text-xs  rounded-md  mt-1'>Lorem ipsum sit dolor</p>
            </div>
            <div className="absolute flex gap-2 text-red-400 right-2 bottom-2 text-sm font-medium z-50">
              <input placeholder="0" className=" w-16 h-auto input input-bordered input-sm" />
              <button className="items-center btn btn-error btn-sm text-white">
                <svg  xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
            </div>

            <p className="absolute right-2 top-2 text-sm font-medium">Rp. 20.000</p>
          </div></>)}

      </div>
      <div className="absolute bottom-0 w-full px-4 py-2 text-center bg-base-100 flex gap-2 z-50">
        <button className=" btn btn-primary flex-1 " onClick={handleSimpan}>Simpan</button>
        <button className=" btn btn-outline flex-1 " onClick={handleTambah}>Tambah</button>
      </div>
    </>
  );
}
interface SearchBarProps {
  handleBack: () => void;
}

const SearchBar = ({ handleBack }: SearchBarProps) => {
  const [present, dismiss] = useIonModal(Customer, {
    onDismiss: () => dismiss()
  })

  return (<>
    <div className="search-form   flex items-center space-x-4  mx-auto max-w-screen-xl
  transform duration-500 transition-all">
      <div className="flex bg-gray-100 rounded-lg my-2 mx-2 pl-4 p-2 w-full space-x-2  items-center">
        <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <input
          className="w-full py-2 px-2 bg-gray-50 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm sm:text-base"
          type="text" placeholder="Search for menu..." />


        <label tabIndex={0} className="btn btn-ghost btn-circle text-gray-500" onClick={() => present({
          animated: true
        })}>
          <div className="indicator ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><circle cx="12" cy="10" r="2"></circle><line x1="8" y1="2" x2="8" y2="4"></line><line x1="16" y1="2" x2="16" y2="4"></line></svg>
          </div>
        </label>
      </div>

    </div>
  </>)
}