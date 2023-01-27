import React, { useEffect, useState } from "react";
import useSWR from "swr";
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
        setLoading(false);
      }
    });
  }, []);

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
  // const imageUpload = async () => {
  //   const fileRef = ref(
  //     storage,
  //     `user_icons/${user.uid}/user_icon.png`
  //   );
  //   const url = await getDownloadURL(fileRef);
  //   setIconImgUrl(url);
  // };
  // imageUpload();

  //クリックした時の関数(submit関数)
  const dataUpdate = (e:any) => {
    e.preventDefault();

    // パスワード変更関数呼び出し
    updatePassword(nowPassValue, newPassValue);

    //DBのデータ更新
    fetch(`/api/passwordUpdate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.uid,
        password: newPassValue,
        cpassword: cNewPassValue,
      }),
    }).then((res) => res.json());
    //送信後inputを空に戻す
    setNowPassValue("");
    setNewPassValue("");
    setCNewPassValue("");

    //完了メッセージを表示
    const div = document.getElementById('complete');
     div?.classList.add(`${styles.active}`);
  };

  return (
    <>
    {!loading && (
    <div className="md:flex">
      <Header />
      <div className="flex gap-12 border border-solid border-neutral-300 ml-64 my-28 w-3/4 bg-white">
        <SettingMenu />
        <div className="flex flex-col gap-5 w-full mt-20">
          <div className="flex items-center gap-12 mb-6">
            <div className="w-48">
              {userData[0].icon_img !== "" ? (
            <img
              src={userData[0].icon_img}
              alt="icon"
              // width={40}
              // height={40}
              className="bg-white rounded-full border border-solid border-gray-200 w-16 h-16 object-cover mr-0 ml-auto my-0"
            />
              ) :(
                <Image
                  src="/noIcon.png"
                  alt="icon"
                  width={40}
                  height={40}
                  className="bg-gray-200 rounded-full border border-solid border-gray-200 w-16 h-16 object-cover mr-0 ml-auto my-0"
                  />
              )}
            </div>
            <p>{userData[0].user_name}</p>
          </div>

          <form onSubmit={dataUpdate}>
            <div className="flex items-start gap-12 my-4 relative h-20">
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
                  className="h-16 border-gray-300 border-solid border bg-gray-50 rounded-lg w-full text-xl"
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

            <div className="flex items-start gap-12 my-4 relative h-20">
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
                  pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,15}"
                  className="h-16 border-gray-300 border-solid border bg-gray-50 rounded-lg w-full text-xl"
                  placeholder="パスワード(半角英小文字、数字を含む6文字以上15文字以内)"
                  required
                />
                <span
                  className={`${styles.error_message} ${styles.messageBox}`}
                >
                  正しい形式で入力してください
                  <br />
                  (半角英小文字、数字を含む6文字以上15文字以内)
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

            <div className="flex items-start gap-12 my-4 relative h-20">
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
                  className="h-16 border-gray-300 border-solid border bg-gray-50 rounded-lg w-full text-xl"
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
            <div className="mt-20 mb-0 mx-auto w-48">
              {/* {nowPassValue === userData[0].password && newPassValue === cNewPassValue && cNewPassValue === newPassValue */}
              {nowPassValue.length >0 && newPassValue.length > 0 && cNewPassValue.length >0
               ? (
            <button className={styles.afterPassBtn}>
            パスワード変更
          </button>
              ) : (
                <button className={styles.beforePassBtn}>
            パスワード変更
          </button>
               )}
          </div>
          </form>
        </div>
      </div>

    </div>
    )}
     <div
     id="complete"
     className={styles.completeChange}
     >
          <p>変更完了しました</p>
        </div>
    </>
  );
};

export default PasswordChange;
