import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';

import InputEmail from '../src/components/atoms/input/inputEmail';
import InputRegister from '../src/components/atoms/input/inputRegister';
import InputRegisterPass from '../src/components/atoms/input/inputRegisterPass';
import InputRequiredRegister from '../src/components/atoms/input/inputRequiredRegister';
import RegisterButton from '../src/components/atoms/button/registerButton';
import InputCPass from '../src/components/atoms/input/inputCPass';

function register() {
//ログイン状態保持(userが値を持てばログイン状態)
const [user, setUser] = useState<any>("");

  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

//ログアウトが成功するとログインページにリダイレクトする
    const logout = async () => {
        await signOut(auth);
        navigate("/myPage/");
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
        <div className="mx-auto my-10 w-96 ">
            <form onSubmit={handleSubmit}>
            <div className="border border-gray-300">
            <div className="w-48 mx-auto">
                <Image src="/logo_transparent.png" alt="ロゴ" width={192} height={192} />
              </div>

              <div className="text-xs text-red-500 px-10 mb-3 ml-3">
              ＊必須項目
              </div>


              <div className="px-10 flex flex-col h-80 justify-between">

            <InputEmail
          emailChange={emailChange}
          valueEmail={registerEmail}
          requiredIcon={"＊"}
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
        </div>
        </div>
            </form>
            </div>
            <div className="mx-auto my-10 w-96 ">
            <div className="border border-gray-300 mt-3 h-16 flex">
            <div className="mx-auto my-auto">アカウントをお持ちですか？
        <Link className="text-blue-600 ml-1"   href="/login">ログインする</Link>
        </div>
        </div>
        </div>
        </>
      )}

    </div>
  )
}

export default register
