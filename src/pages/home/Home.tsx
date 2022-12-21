import { IonContent, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useHistory } from 'react-router';
import Navbar from '../../components/Navbar';
import SkeletonList from '../../components/SkeletonList';
import { useTables } from '../../hooks/useTable';
import { formatRupiah, secondToHourMinute } from '../../utils/formatter';


const Home: React.FC = () => {
  const history = useHistory()

  const { isLoading, data, refetch } = useTables()

  const handleTable = (item: any) => {
    if (item.status === "OPEN" || item.status === "ORDERED")
      history.push({
        pathname: `meja/${item.id}`,
      })
  }

  return (
    <>

      <Navbar isBackButton={false} />
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>) => {
          refetch()
          event.detail.complete();
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className='container mx-auto h-screen overflow-scroll pb-16'>
          {isLoading && <SkeletonList />}
          {
            !isLoading && <>
              {data?.map((item: any, index: any) =>
                <div className='card m-2 px-3 py-6  h-[90px] bg-gray-50' key={index} onClick={() => handleTable(item)}>
                  <div className=' flex flex-row gap-4 relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                    <div>
                      <h6 className='font-semibold text-md'>{item.name}</h6>
                      
                      {
                        (item.status === 'CLOSED' || item.status === 'RESERVED') &&
                        <p className={`text-xs p-1  text-center rounded-md text-white mt-1  bg-error`}>{item.status}</p>
                      }
                      {
                        (item.status === 'OPEN') &&
                        <p className={`text-xs p-1  text-center rounded-md text-white mt-1  bg-success`}>{item.status}</p>
                      }
                      {
                        (item.status === 'ORDERED') &&
                        <p className={`text-xs p-1  text-center rounded-md text-white mt-1  bg-info`}>{item.status}</p>
                      }





                    </div>
                    <p className='absolute right-0 top-0 text-xs font-semibold'>{secondToHourMinute(item?.order?.diff_time ?? 0)}</p>
                    <p className='absolute right-0 bottom-0 text-xs font-semibold'>{formatRupiah(item?.order?.total_payment ?? 0, 'Rp.')}</p>

                  </div>
                </div>
              )}
            </>
          }

        </div>
      </IonContent>

    </>
  );
};



export default Home;
