import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import InputCPass from './inputCPass';
import InputEmail from './inputEmail';
import InputRegister from './inputRegister';
import InputRegisterPass from './inputRegisterPass';
import InputRequiredRegister from './inputRequiredRegister';
import RegisterButton from './registerButton';

function register() {
//ログイン状態保持(userが値を持てばログイン状態)
const [user, setUser] = useState<any>("");

  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

//ログアウトが成功するとログインページにリダイレクトする
    const logout = async () => {
        await signOut(auth);
        navigate("/login/");
      };

      const emailChange = (e: { target: HTMLButtonElement }) => {
        setRegisterEmail(e.target.value);
      };
      const passChange = (e: { target: HTMLButtonElement }) => {
        setRegisterPassword(e.target.value);
      };

//Authenticationへのユーザー登録、FireStoreへのデータ新規追加
const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      //Authenticationへのユーザー登録
      //登録するのと同時にログインされる
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert("正しく入力してください");
    }
  };

//ログインしているかどうかを判断する
useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
        {user ? (
            <div>
        <Link href="/">Home</Link>
        <br />
        <button onClick={logout}>ログアウト</button>
        </div>
      ) : (
        <>
        <div className="mx-auto my-10 w-96 "></div>
            <form onSubmit={handleSubmit}>
            <InputEmail
          emailChange={emailChange}
          valueEmail={registerEmail}
          requiredIcon={<span>＊</span>}
        />

<InputRequiredRegister
          type={"text"}
          name={"userName"}
          placeholder={"ユーザーID(半角英数字4文字以上) 例:taro123"}
          pattern={"^([a-zA-Z0-9]{4,})$"}
          message={"半角英数字4文字以上"}
        />

<InputRequiredRegister
          type={"text"}
          name={"name"}
          placeholder={"ネーム"}
        />

<InputRegisterPass
          valuePassword={registerPassword}
          passChange={passChange}
        />

        <InputCPass passwordValue={registerPassword} />

        <InputRegister
          type={"textarea"}
          name={"profile"}
          placeholder={"自己紹介"}
        />

        <RegisterButton />

            </form>
        <p>アカウントをお持ちですか？
        <Link href="/login">ログインする</Link>
        </p>
        </>
      )}

    </div>
  )
}

export default register
