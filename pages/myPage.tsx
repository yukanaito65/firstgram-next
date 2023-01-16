import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import useSWR from "swr";
import Image from 'next/image';

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

function myPage() {
  // データ取得
  const { data: users, error } = useSWR("/api/users", fetcher);

  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトさせないようにする(ログイン判定するには時間がかかるから、ページ遷移を先にされてしまうと表示がおかしくなってしまう)
  const [loading, setLoading] = useState(true);

  //取得してきたデータを保持
  const [usersData, setUsersData] = useState<any>([]);
  // const [posts, setPosts] = useState<QuerySnapshot[]>([]);
  const [posts, setPosts] = useState<any>([]);

  //userのfollow配列
  // const [followList, setFollowList] = useState<any>({ follow: [] });
  const [followList, setFollowList] = useState<any>([]);

  //userのfollower配列
  // const [followerList, setFollowerList] = useState<any>({ follower: [] });
  const [followerList, setFollowerList] = useState<any>([]);

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

        // データ取得
        // const { data:users, error } = useSWR("/api/users", fetcher);

        if (error) {
          return <p>error!</p>;
        }
        if (!users) {
        //   // users.map(
        //   //     (user: Users)=>{JSON.stringify(user)}
        //   // )
        //   setFollowList([1,2]);
        //   setFollowerList([1]);

        //   // const postDataArray = users[0].posts.map((users[0].userid) => users[0].userid);
        //   // setPosts(postDataArray);

        //   setPosts([1,2]);
        <p>loading</p>
        }
      }
    });
  }, []);

  //ログインページにリダイレクトする
  const login = async () => {
    await signOut(auth);
    navigate("/myPage/");
  };

  return (
    <>
      {/* loadingがfalseのときのみマイページを表示する設定。loadingがfalseのときのみ */}
      {!loading && (
        <>
          {/* ログインしていない状態でマイページ表示しようとするとログインページにリダイレクトする設定(!userがログインしていない場合のこと) */}
          {!user ? (
            <>
              <p>ログインしてないです</p>
              <button onClick={login}>login</button>
              {/* {login} */}
            </>
          ) : (
            <>
            {/* {users.map(
            <div>{users[0].userName}</div>
            )} */}
            <div className="flex">
            <div className="bg-gray-300 border-rounded-2xl mt-7 ">
               <Image src="/noIcon.png" alt="アイコン" width={55} height={55} />
            </div>
            <div className="ml-2">userName</div>
            <button className="border border-gray-300">プロフィール編集</button>
            <button>設定</button>
            </div>
          

            <div className="flex ml-16">
            <div>投稿{posts.length}件</div>
            <div>フォロー{followList.length}人</div>
            <div>フォロワー{followerList.length}人</div>
            </div>

            <div className="ml-16">name</div>
         
            </>

          )}
        </>
      )}
    </>
  );
}

export default myPage;
