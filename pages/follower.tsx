import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function follower() {

// ログインしているuserのfollow配列を取ってくる
  const [userId,setUserId] = useState("");
  useEffect(() => {  
    onAuthStateChanged(auth, async (user: any) => {
      if (!user) {
        <></>;
      } else {
        setUserId(user.uid)
      }
    });

  }, []);
  const { data: loginUsers, error } = useSWR(`/api/test?user_id=${userId}`, fetcher);
if (error) {
    return <p>error!</p>;
  }
  if (!loginUsers) {
    return <p>loading...</p>;
  }

  // follow配列のidのuser情報を取ってくる
  {loginUsers.follower.map((id:string)=>{
    const { data: followerUsers, error } = useSWR(`/api/test?user_id=${id}`, fetcher);
    if (error) {
        return <p>error!</p>;
      }
      if (!followerUsers) {
        return <p>loading...</p>;
      }
  })}

  {followerUsers.user_id}


  return (
    <>
    {followerUsers.map((user:any)=>{
        return(
            <>
              <div className="flex">
            {/* {ログインしてるユーザーのフォロー配列に.includes(profileuserのuseridがあったら) ? (
                <>
                  <RemoveFollowButton/>
                </>
              ) : (
                <>
                  <AddFollowButton />
                </>
              )} */}
              <div className="ml-20">×</div>
            </div>
            <div className="flex">
              <div>
                {user.icon ? (
                  <Image
                  src={user.icon}
                  alt="アイコン"
                  width={80}
                  height={80}
                  className=" border border-gray-300 bg-gray-300 rounded-full "
                />
                ):(
                  <Image
                  src="/noIcon.png"
                  alt="アイコン"
                  width={80}
                  height={80}
                  className=" border border-gray-300 bg-gray-300 rounded-full "
                />
                )}
              </div>
      
              <div className="pl-4 py-3 flex flex-col max-h-80 content-between">
                <div>{user.user_name}</div>
                <div>{user.name}</div>
              </div>
            </div>
            </>
    )
})}
    </>
  );
}

export default follower;
