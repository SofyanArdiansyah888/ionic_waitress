import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import Navbar from '../../components/Navbar';

import './Home.css';

const Home: React.FC = () => {
  const history = useHistory()
  const handleTable = () => { 
    history.push({
      pathname: 'meja/1',
    })
  }
  return (
    <>
      <Navbar isBackButton={false} />
      <div className='container mx-auto h-screen overflow-scroll'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9,10].map((item,index) =>

          <div className='card m-2 px-3 py-6  h-[90px] bg-gray-50' key={index} onClick={handleTable}>
            <div className=' flex flex-row gap-4 relative'>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
              <div>
                <h6 className='font-semibold text-md'>Meja 1</h6>
                <p className='text-xs bg-success text-center rounded-md text-white mt-1'>Order</p>
              </div>
              <p className='absolute right-0 top-0 text-xs font-semibold'>2 Jam 15 Menit</p>
              <p className='absolute right-0 bottom-0 text-xs font-semibold'>Rp. 100.000</p>

            </div>
          </div>
        )}
      </div>
    </>
  );
};



export default Home;
