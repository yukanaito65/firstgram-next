import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../types/types";
import data from "./api/data";
import SettingMenu from "../src/components/organisms/SettingMenu";
import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { auth, storage } from "../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Header from "../src/components/organisms/header";
import Image from "next/image";
import { getDownloadURL, ref } from "firebase/storage";
import styles from "./passwordChange.module.css";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const PasswordChange = () => {
  // const auth = getAuth();
  // const currentUser: any = auth.currentUser;
  // console.log(currentUser);
  const [user, setUser] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  //icon表示用URL
  const [iconImgUrl, setIconImgUrl] = useState("");

  //現在のパスワード
  const [nowPassValue, setNowPassValue] = useState<any>("");
  const onChangePassword = (event: { target: HTMLInputElement }) => {
    setNowPassValue(event.target.value);
  };
  //新しいパスワード
  const [newPassValue, setNewPassValue] = useState<any>("");
  const onChangeNewPassword = (event: { target: HTMLInputElement }) => {
    setNewPassValue(event.target.value);
  };
  //新しいパスワード確認用
  const [cNewPassValue, setCNewPassValue] = useState<any>("");
  const onChangeCNewPassword = (event: { target: HTMLInputElement }) => {
    setCNewPassValue(event.target.value);
  };

  //エラーメッセージ
  const [errMessage, setErrMessage] = useState<string>("");



  //ログイン認証、uid取得
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        console.log("ログアウト状態");
      } else {
        setUser(currentUser);
    //     //ログイン判定が終わったタイミングでloadingはfalseに変わる
    //     setLoading(false);


      }
    });
  }, []);


  // useEffect(()=>{

  // },[])

  // パスワードの変更関数を定義(Authentication)
  const updatePassword = (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (user == null) {
        return reject();
      }

      // クレデンシャルの取得
      const credential = EmailAuthProvider.credential(
        user.email || "",
        oldPassword
      );

      // メールアドレスの再認証
      reauthenticateWithCredential(user, credential)
        .then((userCredential) => {
          // パスワードの更新
          firebaseUpdatePassword(userCredential.user, newPassword)
            .then(() => resolve())
            .catch((error) => reject(error));
        })
        .catch((error) => reject(setErrMessage("現在のパスワードが違います")));
    });
  };

  // 目のアイコン
  const [isRevealConfirmNowPassword, setIsRevealConfirmNowPassword] = useState(false);

  const toggleConfirmNowPassword = () => {
    setIsRevealConfirmNowPassword((prevState) => !prevState);
  };

  const [isRevealConfirmNewPassword, setIsRevealConfirmNewPassword] = useState(false);

  const toggleConfirmNewPassword = () => {
    setIsRevealConfirmNewPassword((prevState) => !prevState);
  };

  const [isRevealConfirmCNewPassword, setIsRevealConfirmCNewPassword] = useState(false);

  const toggleConfirmCNewPassword = () => {
    setIsRevealConfirmCNewPassword((prevState) => !prevState);
  };
  // apiからデータ取得
  const { data: userData, error } = useSWR(
    () => `/api/userData?user_id=${user.uid}`,
    fetcher
  );

  if (error) {
    return <p>error!</p>;
  }
  if (!userData) {
    return <p>loading...</p>;
  }
  console.log("data", userData);

  //icon表示するためにURL取得
  const imageUpload = async () => {
    const fileRef = ref(
      storage,
      `user_icons/${user.uid}/user_icon.png`
    );
    const url = await getDownloadURL(fileRef);
    setIconImgUrl(url);
  };
  imageUpload();

  //   Authenticationを更新(クリックした時の関数)
  const dataUpdate: () => void = () => {
    // パスワード変更関数呼び出し
    updatePassword(nowPassValue, newPassValue);

    fetch(`/api/passwordUpdate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.uid,
        password: newPassValue,
        cpassword: cNewPassValue,
      }),
    }).then((res) => res.json());
    setNowPassValue("");
    setNewPassValue("");
    setCNewPassValue("");
  };

  return (
    <div className="flex">
      <Header />
      <div className="flex gap-12 border border-solid border-neutral-300 ml-96 mr-3 my-6 w-3/4">
        <SettingMenu />
        <div className="flex flex-col gap-5 w-full my-7">
          <div className="flex items-center gap-8 mx-20">
            <img
              src={iconImgUrl}
              alt="icon"
              // width={40}
              // height={40}
              className="bg-white rounded-full border border-solid border-gray-200 w-1/4 object-cover"
            />
            <p>{userData[0].user_name}</p>
          </div>

          <div>
            <div className="flex items-start gap-8 my-4 relative">
              <label htmlFor="settingPassword" className="font-bold">
                現在のパスワード
              </label>
              <div className="w-7/12">
                <input
                  name="settingPassword"
                  id="settingPassword"
                  type={isRevealConfirmNowPassword ? "text" : "password"}
                  value={nowPassValue}
                  onChange={onChangePassword}
                  pattern={userData[0].password}
                  className="h-9 border-gray-300 border-solid border bg-gray-50 rounded w-full"
                  placeholder="現在のパスワード"
                  required
                />
                <span
                  className={`${styles.error_message} ${styles.messageBox}`}
                >
                  パスワードが一致しません
                </span>
              </div>
              <span
                onClick={toggleConfirmNowPassword}
                role="presentation"
                className={styles.isRevealPasswordIcon}
              >
                {isRevealConfirmNowPassword ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </span>
            </div>

            <div className="flex items-start gap-8 my-4 relative">
              <label htmlFor="settingPassword" className="font-bold">
                新しいパスワード
              </label>
              <div className="w-7/12">
                <input
                  name="settingPassword"
                  id="settingPassword"
                  type={isRevealConfirmNewPassword ? "text" : "password"}
                  value={newPassValue}
                  onChange={onChangeNewPassword}
                  pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,}"
                  className="h-9 border-gray-300 border-solid border bg-gray-50 rounded w-full"
                  placeholder="パスワード(半角英小文字、数字を含む6文字以上)"
                  required
                />
                <span
                  className={`${styles.error_message} ${styles.messageBox}`}
                >
                  正しい形式で入力してください
                  <br />
                  (半角英小文字、数字を含む6文字以上)
                </span>
              </div>
              <span
                onClick={toggleConfirmNewPassword}
                role="presentation"
                className={styles.isRevealPasswordIcon}
              >
                {isRevealConfirmNewPassword ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </span>
            </div>

            <div className="flex items-start gap-8 my-4 relative">
              <label htmlFor="settingPassword" className="font-bold text-right">
                新しいパスワード
                <br />
                を確認
              </label>
              <div className="w-7/12">
                <input
                  name="settingPassword"
                  id="settingPassword"
                  type={isRevealConfirmCNewPassword ? "text" : "password"}
                  value={cNewPassValue}
                  onChange={onChangeCNewPassword}
                  pattern={newPassValue}
                  className="h-9 border-gray-300 border-solid border bg-gray-50 rounded w-full"
                  placeholder="確認の為もう一度入力"
                  required
                />
                <span
                  className={`${styles.error_message} ${styles.messageBox}`}
                >
                  パスワードが一致しません
                </span>
              </div>
              <span
                onClick={toggleConfirmCNewPassword}
                role="presentation"
                className={styles.isRevealPasswordIcon}
              >
                {isRevealConfirmCNewPassword ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible />
                )}
              </span>
            </div>
          </div>

          <button
            className="w-32 bg-blue-300 border-none text-white rounded-lg font-bold py-1.5 my-0 mx-auto"
            onClick={dataUpdate}
          >
            パスワード変更
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
