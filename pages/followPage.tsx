import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import  useSWR  from 'swr'
import { auth } from '../firebase';
import AddFollowButton from '../src/components/atoms/button/addFollowButton';
import RemoveFollowButton from '../src/components/atoms/button/RemoveFollowButton';

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function FollowPage() {
      //ログインしているとログイン情報を持つ
      const [user, setUser] = useState<any>("");
        useEffect(() => {
            onAuthStateChanged(auth, async (currentUser: any) => {
              if (!currentUser) {
                <></>;
              } else {
                setUser(currentUser);
              }
            }); 
          }, []);

  const { data: datas, error:error, isLoading:isLoading } = useSWR(`/api/myPageFollow?user_id=${user.uid}`, fetcher);
  if (error) {
    return <p>{error}</p>;
  }
  if (!datas) {
    return <p>エラ-</p>;
  }
  if(isLoading){
    return <p>loading</p>
  }
  
  return (
    <div>
      {datas.map((data:any)=>{
        return(
          <div className="flex">
            <div>
              {data.icon_img ? (
                <img
                src={data.icon_img}
                alt="アイコン"
                width={80}
                height={80}
                className=" border border-gray-300 bg-gray-300 rounded-full "/>
                ):(
                <img
                src="/noIcon.png"
                alt="アイコン"
                width={80}
                height={80}
                className=" border border-gray-300 bg-gray-300 rounded-full "/>
                )}
            </div>

            <div className="pl-4 py-3 flex flex-col max-h-80 content-between">
            <div>{data.user_name}</div>
            <div>{data.name}</div>
            </div>

            <RemoveFollowButton/>
            <AddFollowButton />

            </div>
        )
      

      })}
    </div>
  )
}

export default FollowPage

//               <div className="flex">
//             {/* {ログインしてるユーザーのフォロー配列に.includes(profileuserのuseridがあったら) ? (
//                 <>
//                   <RemoveFollowButton/>
//                 </>
//               ) : (
//                 <>
//                   <AddFollowButton />
//                 </>
//               )} */}
//               <div className="ml-20">×</div>
//             </div>
