import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Link from "next/link";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { auth } from "../firebase";
import InputEmail from "../src/components/atoms/input/inputEmail";
import InputPass from "../src/components/atoms/input/inputPass";
import LoginButton from "../src/components/atoms/button/loginButton";
import Header from "../src/components/organisms/header";

function Login() {
  const [user, setUser] = useState();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const emailChange = (e: { target: HTMLButtonElement }) => {
    setLoginEmail(e.target.value);
  };
  const passChange = (e: { target: HTMLButtonElement }) => {
    setLoginPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // signInWithEmailAndPasswordを実行することでログインを行う
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    //   signOut(auth);
    // navigate("/myPage/");
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  //onAuthStateChangedでログインしているかどうかを監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  });



  return (
    <div>
      {user ? (
        <div>
           {/* <Header /> */}
          <Link href="/myPage">myPage</Link>
          <br />
          <button onClick={logout}>ログアウト</button>
        </div>

      ) : (
        <>
           {/* <Header /> */}
        <div
        className="mx-auto my-10 w-1/2"
        style={{height: "500px"}}>
          <form onSubmit={handleSubmit}>
            <div
            className="border border-gray-300 h-3/4 bg-white"
            style={{height: "400px"}}
            >
              <div className="w-48 mx-auto">
                <Image src="/logo_transparent.png" alt="ロゴ" width={192} height={192} />
              </div>
              <div className="px-10">
                <InputEmail  emailChange={emailChange} valueEmail={loginEmail} />
                <InputPass passChange={passChange} valuePassword={loginPassword} />
                <LoginButton />
              </div>
            </div>
          </form>
          <div className="border border-gray-300 mt-3 h-24 flex bg-white">
            <div className="mx-auto my-auto">
            アカウントをお持ちでないですか？
            <Link className="text-blue-600 ml-1" href="/register">登録する</Link>
            </div>
          </div>
        </div>
        </>
      )}
    </div>

  );
}

export default Login;
