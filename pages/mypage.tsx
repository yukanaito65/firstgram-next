import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import useSWR from "swr";
import Image from "next/image";

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
  // const { data: users, error } = useSWR("/api/users", fetcher);
  const { data: users, error } = useSWR("/api/test", fetcher);

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
      }
    });
  }, []);

  //ログインページにリダイレクトする
  // const login = async () => {
  //   await signOut(auth);
  //   navigate("/myPage/");
  // };

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
    <p>loading</p>;
  }

  const data = () => {
    setFollowList(users[0].userId);
    setFollowerList(users[0].userId);
    setPosts(users[0].userId);
    console.log(users[0].userId);
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
                  <Image
                    src="/noIcon.png"
                    alt="アイコン"
                    width={145}
                    height={145}
                    className=" border border-gray-300 bg-gray-300 rounded-full "
                  />
                </div>

                <div className="pl-16 py-3 flex flex-col max-h-145 justify-between">
                  <div className="flex">
                    <div className="h-8 pt-1 text-xl">ringo_yasuo</div>
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
                    <div>投稿{posts.length}件</div>
                    <div className="ml-9">フォロー{followList.length}人</div>
                    <div className="ml-9">
                      フォロワー{followerList.length}人
                    </div>
                  </div>

                  <div>
                    <div className="font-bold">えみり </div>
                    <div className="text-sm">Tokyo 1996</div>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={data}>データ取得</button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default myPage;
