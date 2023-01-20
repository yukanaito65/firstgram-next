import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../types/types";
import data from "./api/data";
import {auth} from "../firebase";
import SettingMenu from "../src/components/organisms/SettingMenu";
import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { sqlExecuter } from "../modules/database";
import Header from "../src/components/organisms/header";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const ProfileChange = () => {


  //ログインユーザーのメアドとuid
  const [user, setUser] = useState<any>([]);
  // const [loading, setLoading] = useState(true);
  // const [loginUser, setLoginUser] = useState<any>("");



   // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
      console.log("ログアウト状態")
      } else {
        setUser(currentUser);
      //ログイン判定が終わったタイミングでloadingはfalseに変わる
        // setLoading(false);
      }
    })
  })

  console.log(user.uid)

  // const getData = () => {
    // fetch(`/api/userUpdate`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userid: user.uid
    //   }),
    // })
    // .then((res) => res.json());

// }

  const { data: users, error } = useSWR(()=>`/api/userData?user_id=${user.uid}`, fetcher);

  console.log(users);


  const [name, setName] = useState("");
  const onChangeName = (event: {target:HTMLInputElement}) => {
    setName(event.target.value);
  };

  const [userName, setUserName] = useState("");
  const onChangeUserName = (event: {target:HTMLInputElement}) => {
    setUserName(event.target.value);
  };
  const [profile, setProfile] = useState("");
  const onChangeProfile = (event: {target:HTMLInputElement}) => {
    setProfile(event.target.value);
  };




  // if (typeof users !== 'undefined'){
  // const userName = users[0].userName;

  // const [userNameValue, setUserNameValue]= useState(userName);

  // setUserNameValue(userName);


  // useEffect(() => {
  //   setName(users[0].name);
  //   setUserName(users[0].userName);
  //   setProfile(users[0].profile);
  //   // setIconValue(icon);
  // }, [profile]);

if (error) {
  return <p>error!</p>;
}
if (!users) {
  return <p>loading...</p>;
}

  console.log("data", users);

  //登録情報反映ボタン(db.jsonに登録されている情報をフォームに表示)
  const onClickData = () => {

    setName(users[0].name)
    setUserName(users[0].user_name);
    setProfile(users[0].profile);
  };

  const onClickCreate = () => {
     fetch(`/api/userUpdate`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.uid,
        name: name,
        user_name: userName,
        profile: profile,
      }),
    })
    .then((res) => res.json());
  };


  return (
    <div className="flex">
      <Header />
    <div className="flex gap-12 border border-solid border-neutral-300 ml-96 mr-32 my-6 w-3/4">
    <SettingMenu />
    <div  className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-8">
        <p>icon</p>
        <p className="text-#0d6efd">プロフィール写真を変更</p>
      </div>
      <div>
        <div className="flex items-center gap-8">
          <p className="font-bold w-28 text-right">名前</p>
          <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeName}
          className="h-8 border-gray-300 border-solid border rounded w-7/12" />
        </div>
        <div className="flex items-center gap-8">
          <p className="font-bold w-28 text-right">ユーザーネーム</p>
          <input
          type="text"
          name="userName"
          value={userName}
          onChange={onChangeUserName}
          className="h-8 border-gray-300 border-solid border rounded w-7/12" />
        </div>
        <div className="flex items-center gap-8">
          <p className="font-bold w-28 text-right">自己紹介</p>
          <input
          type="text"
          name="profile"
          value={profile}
          onChange={onChangeProfile}
          className="h-8 border-gray-300 border-solid border rounded w-7/12" />
        </div>
      </div>
      <button onClick={()=>onClickCreate()} className="w-32">変更</button>
      <button type="button" onClick={() => onClickData()} className="w-32">データ取得</button>
      {/* <button type="button" onClick={() => getData()} className="w-32"></button> */}
    </div>
    </div>
    </div>
  );
};

export default ProfileChange;


// export async function getStaticProps({ params }: any) {
//   // const id = params.id;
//   const res = await fetch(`http://localhost:3000/api/users/`);
//   const itemData = await res.json();
//   console.log('itemData', itemData);
//   if (!itemData.userid) {
//     return { notFound: true };
//   }
//   return { props: { itemData }, revalidate: 1 };
// }

// export async function getStaticPaths() {
//   const res = await fetch(`http://localhost:3000/api/users`);
//   const items = await res.json();
//   const paths = items.map((itemData: any) => ({
//     params: { userid: itemData.userid.toString() },
//   }));
//   console.log('paths', paths);
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }
