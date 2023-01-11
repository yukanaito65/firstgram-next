import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import InputEmail from './inputEmail'
import InputPass from './inputPass'
import LoginButton from './loginButton'

function login2() {

  const [user, setUser] = useState();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const emailChange = (e:{ target: HTMLButtonElement }) => {
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
        <Link href="/">Home</Link>
        <button onClick={logout}>ログアウト</button>
        </div>
                ) : (
         <form onSubmit={handleSubmit}>
        <InputEmail emailChange={emailChange} valueEmail={loginEmail} />
        <InputPass passChange={passChange} valuePassword={loginPassword} />
        <LoginButton />
        </form>
                )}
    </div>
  )
}

export default login2
