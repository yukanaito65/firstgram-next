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
import Header from "../src/components/organisms/header";

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
  const [user, setUser] = useState<any>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        <></>;
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
  }, []);

  //ログインページにリダイレクトする
  // const login = async () => {
  //   await signOut(auth);
  //   navigate("/myPage/");
  // };

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`/api/userData?user_id=${user.uid}`, fetcher);
  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>error!</p>;
  }
  if (isLoading) {
    return <p>loading</p>;
  }
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
               <Header />
              <div className="pt-7 mx-auto w-3/4">
                <div className="flex pt-7 mx-auto  ">

                  <div className="border-border-rounded-fullmt-7 pt-3 w-44 h-44">
                    {users[0].icon_img ? (
                      <img
                        src={users[0].icon_img}
                        alt="アイコン"
                        // width={80}
                        // height={80}
                        className="bg-white rounded-full border border-solid border-gray-200 object-cover w-full h-full"
                      />
                    ) : (
                      <img
                        src="/noIcon.png"
                        alt="アイコン"
                        width={80}
                        height={80}
                        className="bg-white rounded-full border border-solid border-gray-200 object-cover w-full h-full"
                        // className=" border border-gray-300 bg-gray-300 rounded-full "
                      />
                    )}
                  </div>

                  <div className="pl-16 py-3 flex flex-col max-h-145 justify-between">

                    <div className="flex">
                      <div className="h-8 pt-1 text-xl">
                        {users[0].user_name}
                      </div>
                      <Link href="profileChange">
                      <button
                        className="border border-gray-100  rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-gray-100">
                        プロフィールを編集
                      </button>
                      </Link>
                      {/* <button className="ml-2">○</button> */}
                    </div>

                    <div className="flex">
                      <div>
                        <PostLength id={user.uid}/>
                      </div>
                      <Link href="followList">
                        <button className="ml-9">
                          <FollowLength id={user.uid}/>
                        </button>
                      </Link>
                      <Link href="followerList">
                        <button className="ml-9">
                          <FollowerLength id={user.uid}/>
                        </button>
                      </Link>
                    </div>

                    <div>
                      <div className="font-bold">{users[0].name} </div>
                      <div className="text-sm">{users[0].profile}</div>
                    </div>

                  </div>

                </div>

                <div className="mt-16">
                  <PostList
                  userId={users[0].user_id}
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
