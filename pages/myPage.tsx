import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Image from "next/image";
import Link from "next/link";
import UserName from "../src/components/atoms/userName";
import PostList from "./postList";
import { auth } from "../firebase.js";
import PostLength from "./postLength";

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
  const { data: users, error, isLoading } = useSWR(`/api/userData?user_id=${user.uid}`, fetcher);
  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>error!</p>;
  }
  if(isLoading ){
    return <p>loading</p>
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

                <div className="pl-16 py-3 flex flex-col max-h-145 justify-between">
                  <div className="flex">
                    <div className="h-8 pt-1 text-xl">{users[0].user_name}
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
                    <div>投稿<PostLength /></div>
                    <Link href="follow"><button className="ml-9">フォロー{0}人</button></Link>
                    <Link href="follower"><button className="ml-9">
                      フォロワー{0}人
                    </button></Link>
                  </div>

                  <div>
                    <div className="font-bold">{users[0].name} </div>
                    <div className="text-sm">{users[0].profile}</div>
                  </div>
                </div>
              </div>

              <div>
    {/* <PostList userId={user.uid} /> */}
              {/* <Image
                  src="/img.jpeg"
                  alt="img"
                  width={200}
                  height={200}
                  className="w-[calc(100%_-_6px /3)] aspect-square"
                />
                            <Image
                  src="/img.jpeg"
                  alt="img"
                  width={200}
                  height={200}
                  className="w-[calc(100%_-_6px /3)] aspect-square"
                />
                  <Image
                  src="/img.jpeg"
                  alt="img"
                  width={200}
                  height={200}
                  className="w-[calc(100%_-_6px /3)] aspect-square"
                />
                                <Image
                  src="/img.jpeg"
                  alt="img"
                  width={200}
                  height={200}
                  className="w-[calc(100%_-_6px /3)] aspect-square"
                /> */}
         
           
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MyPage;
