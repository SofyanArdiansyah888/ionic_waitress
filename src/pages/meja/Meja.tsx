import { useIonModal } from "@ionic/react";
import { useHistory } from "react-router";
import Navbar from "../../components/Navbar";
import Menu from "../menu/Menu";

export default function Meja() {
  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(Menu, {
    onDismiss: handleDismiss,
  })

  const tables = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const handleSimpan = () => {

  }
  const handleTambah = () => {
    present({
      animated: true
    })
  }
  return (
    <>
      <Navbar isBackButton={true} />
      <div className="container mx-auto h-screen overflow-scroll pb-32 ">
        {/* <div className="grid grid-cols-2"> */}
        
        {tables.map((data, index) => <>
          <div key={index} className=' flex flex-row gap-4 relative m-2 bg-gray-50 rounded-md p-2 -z-10'>

            <div className="text-left">
              <h6 className='font-semibold text-md'>Ikan Pepes</h6>
              <p className='text-xs  rounded-md  mt-1'>Rica-Rica</p>
              <p className='text-xs  rounded-md  mt-1'>Lorem ipsum sit dolor</p>
            </div>
            <div className="absolute right-2 bottom-2 text-sm font-medium">
             <input placeholder="test" className=" w-12 h-auto input input-bordered input-sm" value="1" />
            </div>

            <p className="absolute right-2 top-2 text-sm font-medium">Rp. 20.000</p>
          </div></>)}
        {/* </div> */}

      </div>
      <div className="absolute bottom-0 w-full px-4 py-2 text-center bg-base-100 flex gap-2">
        <button className=" btn btn-primary flex-1 " onClick={handleSimpan}>Simpan</button>
        <button className=" btn btn-outline flex-1 " onClick={handleTambah}>Tambah</button>
      </div>
    </>
  );
}
