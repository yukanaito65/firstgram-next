import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Image from "next/image";
import Link from "next/link";
import UserName from "../src/components/atoms/userName";
import PostList from "./postList";
import { auth } from "../firebase.js";
import PostLength from "./postLength";
import FollowLength from "./followLength";
import FollowerLength from "./followerLength";

interface Users {
  userId: string;
  userName: string;
  name: string;
  email: string;
  password: string;
  Cpassword: string;
  follow: string[];
  follower: string[];
  favoritePosts: string[];
  profile: string;
  posts: string[];
  keepPosts: string[];
}

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function MyPage() {
  // データ取得
  // const { data: users, error } = useSWR("/api/users", fetcher);
  // const { data: users, error } = useSWR("/api/test", fetcher);

  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトさせないようにする(ログイン判定するには時間がかかるから、ページ遷移を先にされてしまうと表示がおかしくなってしまう)
  const [loading, setLoading] = useState(true);

  // const { mutate } = useSWRConfig();

  // const auth = getAuth();
  // const currentUserId = auth.currentUser?.uid;

  // console.log(currentUserId)

  // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        <></>;
      } else {
        setUser(currentUser);
        //ログイン判定が終わったタイミングでloadingはfalseに変わる
        setLoading(false);
      }
    });
  }, []);

  //ログインページにリダイレクトする
  // const login = async () => {
  //   await signOut(auth);
  //   navigate("/myPage/");
  // };

  // データ取得

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`/api/userData?user_id=${user.uid}`, fetcher);
  // const { data: users, error } = useSWR("/api/users", fetcher);
  // const { data: users, error } = useSWR(`/api/test?user_id=${userId}`, fetcher);
  // const { data: users, error } = useSWR(
  //   () => `/api/userData?user_id=${user.uid}`,
  //   fetcher
  // );
  if (error) {
    return <p>error!</p>;
  }

  if (!users) {
    return <p>error!</p>;
  }
  if (isLoading) {
    return <p>loading</p>;
  }

  // const { data: posts, error:postserror, isLoading:postsisLoading } = useSWR(`/api/userPostData?user_id=${user.uid}`, fetcher);
  // if (postserror) {
  //   return <p>error!</p>;
  // }
  // if (posts) {
  //   return <p>error!</p>;
  // }
  // if(postsisLoading ){
  //   return <p>loading</p>
  // }

  return (
    <>
      {/* loadingがfalseのときのみマイページを表示する設定。loadingがfalseのときのみ */}
      {!loading && (
        <>
          {/* ログインしていない状態でマイページ表示しようとするとログインページにリダイレクトする設定(!userがログインしていない場合のこと) */}
          {!user ? (
            <>
              <p>ログインしてないです</p>
              {/* <button onClick={login}>login</button> */}
              {/* {login} */}
            </>
          ) : (
            <>
              {/* {users.map(
            <div>{users[0].userName}</div>
            )} */}
              <div className="pt-7 mx-auto w-max">
                <div className="flex pt-7 mx-auto w-max ">
                  <div className="border-border-rounded-fullmt-7 pt-3">
                    {users[0].icon_img ? (
                      <Image
                        src={users[0].icon_img}
                        alt="アイコン"
                        width={80}
                        height={80}
                        className=" border border-gray-300 bg-gray-300 rounded-full "
                      />
                    ) : (
                      <Image
                        src="/noIcon.png"
                        alt="アイコン"
                        width={80}
                        height={80}
                        className=" border border-gray-300 bg-gray-300 rounded-full "
                      />
                    )}
                  </div>

                  {/* 追加 */}
                  {/* <div>
  <p>{users[0].name}</p>
</div> */}
                  <div className="pl-16 py-3 flex flex-col max-h-145 justify-between">
                    <div className="flex">
                      <div className="h-8 pt-1 text-xl">
                        {users[0].user_name}
                        {/* <UserName uid={userId}/> */}
                      </div>
                      <button
                        className="
            border border-gray-100  rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-gray-100
            "
                      >
                        プロフィールを編集
                      </button>
                      <button className="ml-2">○</button>
                    </div>

                    <div className="flex">
                      <div>
                        <PostLength />
                      </div>
                      <Link href="followPage">
                        <button className="ml-9">
                          <FollowLength />
                        </button>
                      </Link>
                      <Link href="followerPage">
                        <button className="ml-9">
                          <FollowerLength />
                        </button>
                      </Link>
                    </div>

                    <div>
                      <div className="font-bold">{users[0].name} </div>
                      <div className="text-sm">{users[0].profile}</div>
                    </div>
                  </div>
                </div>

                <div className="">
                <PostList
                // userId={user.uid}
                />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MyPage;
