
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import AddFollowButton from '../src/components/atoms/button/addFollowButton';
import Link from 'next/link';
import RemoveFollowButton from '../src/components/atoms/button/RemoveFollowButton';

import { useRouter } from "next/router";
import useSWR from "swr";
import PostLength from './postLength';
import FollowLength from './followLength';
import FollowerLength from './followerLength';
import PostList from './postList';
import Header from "../src/components/organisms/header";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

function Profile() {
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

  //各ページからuser_idを引き継ぎ、userIdに代入
  const router = useRouter();
  const userId = router.query.userId;
  console.log(userId);

  //userテーブルからユーザーの情報取得
  const { data, error } = useSWR(
    () => `/api/userData?user_id=${userId}`,
    fetcher
  );
 
   const { data: datas, error:error2, isLoading:isLoading2 } = useSWR(`/api/myPageFollow?user_id=${userId}`, fetcher);
   if (error2) {
     return <p>{error}</p>;
   }
   if (!datas) {
     return <p>エラ-</p>;
   }
   if(isLoading2){
     return <p>loading</p>
   }

  //dmページにuserIdを保持したまま遷移する
  const dmButton = () => {
    router.push({
      pathname: "/dmPage", //URL
      query: { userId: userId }, //検索クエリ
    });
  };


  if (error) {
    return <p>error!</p>;
  }
  if (!data) {
    return <p>loading...</p>;
  }


console.log(datas)
const profileUserFollow =datas.map((id:any)=>{return(id.user_id)})
console.log(profileUserFollow)


  return (
    <>
    <Header />
    <div className="pt-7 mx-auto w-max">
    <div className="flex pt-7 mx-auto w-max ">

      <div className="border-border-rounded-fullmt-7 pt-3 w-44 h-44">
      {data[0].icon_img ? (
      <img
       src={data[0].icon_img}
       alt="アイコン"
      //  width={80}
      //  height={80}
       className="bg-white rounded-full border border-solid border-gray-200 object-cover w-full h-full"
        />
        ) : (
        <img
        src="/noIcon.png"
        alt="アイコン"
        // width={80}
        // height={80}
        className=" border border-gray-300 bg-gray-300 rounded-full "
        />
        )}
      </div>


      <div className="pl-16 py-5 flex flex-col max-h-145 justify-between">
        <div className="flex">
          <div className="h-8 pt-1 text-xl">{data[0].user_name}</div>
            {profileUserFollow.includes(user.uid)? (
                <>
                  <RemoveFollowButton />
                </>
              ) : (
                <>
                  <AddFollowButton />
                </>
              )}
          <button
            className="border border-gray-100  rounded  ml-2 h-8 px-3 py-1 text-sm font-bold bg-gray-100"
            onClick={dmButton}
          >
            メッセージを送信
          </button>
        </div>

        <div className="flex">
        <div><PostLength id={data[0].user_id}/></div>
        <Link href="followPage"><button className="ml-9"><FollowLength id={data[0].user_id}/></button></Link>
        <Link href="followerPage"><button className="ml-9"><FollowerLength id={data[0].user_id}/></button></Link>
        </div>

<div>
        <div className="font-bold">{data[0].name}</div>
        <div>{data[0].profile}</div>
      </div>

      </div>
      </div>


      {/* <div className="mt-16"> */}
<PostList
userId={userId}
 />
{/* </div> */}

    </div>
    </>


  );
}

export default Profile;
