import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import  useSWR  from 'swr'
import { auth } from '../firebase';
import AddFollowButton from '../src/components/atoms/button/addFollowButton';
import RemoveFollowButton from '../src/components/atoms/button/RemoveFollowButton';
import Header from "../src/components/organisms/header";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function FollowerPage() {
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

  const { data: datas, error:error, isLoading:isLoading } = useSWR(`/api/myPageFollower?user_id=${user.uid}`, fetcher);
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
        <Header />
        <div className="m-32">
      {datas.map((data:any)=>{
        return(
          <div className="flex m-14">

<Link href={{ pathname:data.user_id === user.uid ? "/myPage":"/profile" ,
                query: {userId : data.user_id}}}>
               <div className=" w-32 h-32">
              {data.icon_img ? (
                <img
                src={data.icon_img}
                alt="アイコン"
                // width={80}
                // height={80}
                className="bg-white rounded-full border border-solid border-gray-200 object-cover w-full h-full"
                />
                ):(
                <img
                src="/noIcon.png"
                alt="アイコン"
                width={80}
                height={80}
                className=" border border-gray-300 bg-gray-300 rounded-full "/>
                )}
            </div>
            </Link>

            <Link href={{ pathname:data.user_id === user.uid ? "/myPage":"/profile" ,
                query: {userId : data.user_id}}}>
            <div className="pl-4 py-3 flex flex-col max-h-80 content-between">
            <div>{data.user_name}</div>
            <div>{data.name}</div>
            </div>
            </Link>
            
            <div className='m-10'>
            <AddFollowButton />
            </div>

            </div>
        )
      

      })}
      </div>
    </div>
  )
}

export default FollowerPage
