import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { auth, storage } from "../firebase";
import SettingMenu from "../src/components/organisms/SettingMenu";
import {
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import Header from "../src/components/organisms/header";
import UpdateInput from "../src/components/atoms/input/UpdateInput";
import IconModal from "../src/components/organisms/IconModal";
import Panel from "../src/components/molecules/Panel";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import Image from "next/image";
import * as admin from "firebase-admin";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const ProfileChange = () => {
  //ログインユーザー
  const [user, setUser] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  //icon表示用URL
  const [iconImgUrl, setIconImgUrl] = useState("");

  //モーダルウィンドウ
  const [isOpenModal, setIsOpenModal] = useState(false);

  // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        console.log("ログアウト状態");
      } else {
        setUser(currentUser);
        //ログイン判定が終わったタイミングでloadingはfalseに変わる
        setLoading(false);
      }
    });
  },[]);

  console.log(user.uid);

  //ログインユーザーの情報取得
  const { data: users, error } = useSWR(() => `/api/userData?user_id=${user.uid}`,fetcher);

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  console.log("data", users);

//icon表示するためにURL取得
const imageUpload = async () => {
  const fileRef = ref(
    storage,
    `user_icons/${user.uid}/user_icon.png`
  );
  const url = await getDownloadURL(fileRef);

//   const admin = require("firebase-admin");
//   // storageのbucketのインスタンスを取得
// const bucket = admin.storage().bucket();
//  const exists = await bucket.file(uploadedPath).exists();
// const file = await admin.storage().bucket("gs://firstgram-next.appspot.com/").file(`user_icons`).exists();
// const isFileExists = await bucket.file(fileName).exists();
// if (isFileExists && isFileExists[0]) {
//      // do something
// }
  // if (exists(url)){
    // console.log(file);
  setIconImgUrl(url);
  // }
};
imageUpload();

  //icon変更モーダルウィンドウ
  const toggleModal = (e:any) => {
    if (e.target === e.currentTarget) {
      setIsOpenModal(!isOpenModal);
    }
  };

  //ボタンがクリックされたときの処理(データ更新)
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const { name, userName, profile } = e.target.elements;
    fetch(`/api/userUpdate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.uid,
        name: name.value,
        user_name: userName.value,
        profile: profile.value,
      }),
    }).then((res) => res.json());
  };

  return (
    <>
      {!loading && (
        <div className="flex" id="root">
          <Header />
          <div className="flex gap-12 border border-solid border-neutral-300 ml-96 mr-32 my-6 w-3/4">
            <SettingMenu />
            <form
            className="flex flex-col gap-2.5 w-full"
            onSubmit={handleSubmit}
            >
              <div className="flex items-center gap-8">
                {iconImgUrl !== "" ? (
              <img
              src={iconImgUrl}
              alt="icon"
              // width={40}
              // height={40}
              className="bg-white rounded-full border border-solid border-gray-200 w-1/4 object-cover"
            />
                ) : (
                  <Image
                  src="/noIcon.png"
                  alt="icon"
                  width={40}
                  height={40}
                  className="bg-gray-200 rounded-full border border-solid border-gray-200 w-1/4 object-cover"
                  />
                )
              }
                <button type="button" onClick={toggleModal}>プロフィール写真を変更</button>
                {isOpenModal && (
                  <IconModal close={toggleModal}>
                    <Panel uid={user.uid} setIconImgUrl={setIconImgUrl}/>
                  </IconModal>
                )}
              </div>

              <div>
                <UpdateInput
                data={users[0].name}
                title={"名前"}
                name={"name"}
                pattern={"{,30}"}
                errorMessage={"1文字以上30文字以内"}
                />
                <UpdateInput
                data={users[0].user_name}
                title={"ユーザーネーム"}
                name={"userName"}
                pattern={"^([a-zA-Z0-9]{4,15})$"}
                errorMessage={"半角英数字4文字以上15文字以内"}
                />
                <UpdateInput
                data={users[0].profile}
                title={"プロフィール"}
                name={"profile"}
                pattern={"{,200}"}
                errorMessage={"200文字以内"}
                />
              </div>

              <button className="w-32">
                変更
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileChange;
