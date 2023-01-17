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
import { auth } from "../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Header from "../src/components/organisms/header";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const PasswordChange = () => {
  // const auth = getAuth();
  // const currentUser: any = auth.currentUser;
  const [user, setUser] = useState<any>([]);

  const [nowPassValue, setNowPassValue] = useState<any>("");
  const onChangePassword = (event: {target:HTMLInputElement}) => {
    setNowPassValue(event.target.value);
  };
  const [newPassValue, setNewPassValue] = useState<any>("");
  const onChangeNewPassword = (event: {target:HTMLInputElement}) => {
    setNewPassValue(event.target.value);
  };
  const [cNewPassValue, setCNewPassValue] = useState<any>("");
  const onChangeCNewPassword = (event: {target:HTMLInputElement}) => {
    setCNewPassValue(event.target.value);
  };

  const [errMessage, setErrMessage] = useState<string>("");

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

  // UPDATE table_name SET column_name = value WHERE 条件式
  //UPDATE users SET password = newPassValue, CpassWord= CNewPassValue WHERE userid = uid

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


  // const onClickCreate = () => {
  //   return fetch(`/api/users`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       password: newPassValue,
  //       cPassword: cNewPassValue,
  //     }),
  //   }).then((res) => res.json());
  // };



  // 目のアイコン
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  // apiからデータ取得
  const { data: users, error } = useSWR("/api/users", fetcher);

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }
  console.log("data", users);
  // return users.map(
  //   (d: User, index:number) => <div>{index}番目のデータ: {JSON.stringify(d)}</div>
  // )

   //   Authenticationを更新(クリックした時の関数)
   const dataUpdate: () => void = () => {
    // パスワード変更関数呼び出し
    updatePassword(nowPassValue, newPassValue);

    return fetch(`/api/users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: newPassValue,
        Cpassword: cNewPassValue,
      }),
    }).then((res) => res.json());
  };

  return (
    <div className="flex">
      <Header />
    <div className="flex gap-12 border border-solid border-neutral-300 ml-96 mr-3 my-6 w-3/4">
    <SettingMenu />
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-8">
        <p>icon</p>
        <p>{users[0].username}</p>
      </div>
      <div>
        <div className="flex items-center gap-8">
          <label htmlFor="settingPassword" className="font-bold">現在のパスワード</label>
          <input
          name="settingPassword"
          id="settingPassword"
          type={isRevealConfirmPassword ? "text" : "password"}
          value={nowPassValue}
          onChange={onChangePassword}
          pattern={users[0].password}
          className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12"
          required
          />
          <span
        onClick={toggleConfirmPassword}
        role="presentation"

      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>
      {/* <span className="CpassForm__error-message CpassForm__messageBox">
        パスワードが一致しません
      </span> */}
        </div>
        <div className="flex items-center gap-8">
          <label htmlFor="settingPassword" className="font-bold">新しいパスワード</label>
          <input
          name="settingPassword"
          id="settingPassword"
          type={isRevealConfirmPassword ? "text" : "password"}
          value={newPassValue}
          onChange={onChangeNewPassword}
          pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,}"
          className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12"
          required
          />
          <span
        onClick={toggleConfirmPassword}
        role="presentation"

      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>

      {/* <span className="registerPassForm__error-message registerPassForm__messageBox">
        正しい形式で入力してください<br />
        (半角英小文字、数字を含む6文字以上)
      </span> */}
        </div>
        <div className="flex items-center gap-8">
          <label htmlFor="settingPassword" className="font-bold text-right">新しいパスワード<br/>を確認</label>
          <input
          name="settingPassword"
          id="settingPassword"
          type={isRevealConfirmPassword ? "text" : "password"}
          value={cNewPassValue}
          onChange={onChangeCNewPassword}
          pattern={newPassValue}
          className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12"
          required
          />
          <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="CpassForm__isRevealPasswordIcon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>
      {/* <span className="CpassForm__error-message CpassForm__messageBox">
        パスワードが一致しません
      </span> */}
        </div>
      </div>
      <button className="w-32" onClick={dataUpdate}>パスワード変更</button>
    </div>
    </div>
    </div>
  );
};

export default PasswordChange;
