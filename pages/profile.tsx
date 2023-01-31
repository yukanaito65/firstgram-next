
import React from 'react'
import Image from 'next/image';
import AddFollowButton from '../src/components/atoms/button/addFollowButton';
import Link from 'next/link';
import RemoveFollowButton from '../src/components/atoms/button/RemoveFollowButton';

import { useRouter } from "next/router";
import useSWR from "swr";


const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

function Profile() {
  //各ページからuser_idを引き継ぎ、userIdに代入
  const router = useRouter();
  const userId = router.query.userId;
  console.log(userId);

  //userテーブルからユーザーの情報取得
  const { data, error } = useSWR(
    () => `/api/userData?user_id=${userId}`,
    fetcher
  );

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

  return (
    <div className="flex pt-7 mx-auto w-max ">
      <div className="border-border-rounded-fullmt-7 pt-3">
        <Image
          src="/noIcon.png"
          alt="アイコン"
          width={145}
          height={145}
          className=" border border-gray-300 bg-gray-300 rounded-full "
        />
      </div>




      <div className="pl-16 py-5 flex flex-col max-h-145 justify-between">
        <div className="flex">
          <div className="h-8 pt-1 text-xl">{data[0].user_name}</div>
          <button
            className="
            border border-gray-100  rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-gray-100
            "
          >
            フォロー中
          </button>
             {/* {{user.uid}.includes (user.uid) ? ( */}
  {/* profileuserのフォローに, ログインしているユーザーのidが、 */}
  <>
                  <RemoveFollowButton />
                </>
              {/* ) : ( */}
                <>
                  <AddFollowButton />
                </>
              {/* )} */}
          <button
            className="border border-gray-100  rounded  ml-2 h-8 px-3 py-1 text-sm font-bold bg-gray-100"
            onClick={dmButton}
          >
            メッセージを送信
          </button>
        </div>

        <div className="flex">
          <div>投稿{2}件</div>
          <div className="ml-9">フォロー{2}人</div>
          <div className="ml-9">フォロワー{2}人</div>
        </div>

        <div className="font-bold">えみり</div>
        <div>Tokyo 1996</div>
      </div>

    </div>
  );
}

export default Profile;
