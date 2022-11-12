import { IonSkeletonText } from "@ionic/react";
export default function SkeletonList() {
    return (<>
        {
            [1, 2, 3, 4, 5, 6, 7].map((item, index) =>
                <IonSkeletonText key={index} animated={true} className='my-4 mx-4 w-auto rounded-lg h-[90px] ' />
            )
        }</>)
}