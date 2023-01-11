import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../types/types";
import data from "./api/data";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase";
import SettingMenu from "../src/components/organisms/SettingMenu";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const ProfileChange = () => {

  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState(true);

   // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (currentUser: any) => {
  //     if (!currentUser) {
  //     <></>
  //     } else {
  //       setUser(currentUser);
  //       //ログイン判定が終わったタイミングでloadingはfalseに変わる
  //       setLoading(false);
  //     }
  //     console.log(currentUser.uid);
  //   })
  //   console.log(user.uid);

  // })
  // console.log(user.uid)

  // const { data: users, error } = useSWR(`/api/users/${user.uid}`, fetcher);

  // console.log(users);

  // if (typeof users !== 'undefined'){
  // const userName = users[0].userName;

  // const [userNameValue, setUserNameValue]= useState(userName);

  // setUserNameValue(userName);



  // if (error) {
  //   return <p>error!</p>;
  // }
  // if (!users) {
  //   return <p>loading...</p>;
  // }

  // console.log("data", users);
  // return users.map(
  //   (d: User, index:number) => <div>{index}番目のデータ: {JSON.stringify(d)}</div>
  // )

// console.log(users[0])

  return (
    <div className="flex  gap-12">
    <SettingMenu />
    <div>
      <div>
        <p>icon</p>
        {/* <p>{users[0].userName}</p> */}
      </div>
      <div>
        <div>
          <p>名前</p>
          {/* <input type="text" value={users[0].name} /> */}
        </div>
        <div>
          <p>ユーザーネーム</p>
          {/* <input type="text" value={users[0].userName} /> */}
        </div>
        <div>
          <p>自己紹介</p>
          {/* <input type="text" value={users[0].profile} /> */}
        </div>
      </div>
      <button>変更</button>
    </div>
    </div>
  );
};

export default ProfileChange;
