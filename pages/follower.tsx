import React from "react";
import Image from "next/image";
import useSWR from "swr";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function follower() {
    const { data: loginUsers, error } = useSWR(`/api/loginUser`, fetcher);
if (error) {
    return <p>error!</p>;
  }
  if (!loginUsers) {
    return <p>loading...</p>;
  }

console.log(loginUsers)
  return (
    <>
    {loginUsers.map(()=>{
        return(
            <>
              <div className="flex">
              <div>フォロー中</div>
              <div className="ml-20">×</div>
            </div>
            <div className="flex">
              <div>
                <Image
                  src="/noIcon.png"
                  alt="アイコン"
                  width={80}
                  height={80}
                  className=" border border-gray-300 bg-gray-300 rounded-full "
                />
              </div>
      
              <div className="pl-4 py-3 flex flex-col max-h-80 content-between">
                <div>ringo_yasuo</div>
                <div>えみり</div>
              </div>
            </div>
            </>
    )
})}
    </>
  );
}

export default follower;
