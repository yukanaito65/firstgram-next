import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";

import InputEmail from "../src/components/atoms/input/inputEmail";
import InputRegister from "../src/components/atoms/input/inputRegister";
import InputRegisterPass from "../src/components/atoms/input/inputRegisterPass";
import InputRequiredRegister from "../src/components/atoms/input/inputRequiredRegister";
import RegisterButton from "../src/components/atoms/button/registerButton";
import InputCPass from "../src/components/atoms/input/inputCPass";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Header from "../src/components/organisms/header";


function Register() {
  //ログイン状態保持(userが値を持てばログイン状態)
  const [user, setUser] = useState<any>("");

  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueName, setValueName] = useState("");
  const [cpass, setCpass] = useState("");
  const [valueProfile, setValueProfile] = useState("");

  //loadingしているかしてないか監視する
  const [loading, setLoading] = useState(false);
  // 画像のアップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);
  //画像のURL
  const [imgSrc, setImgSrc] = useState("");

    //ログインしているかどうかを判断する
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
      });
    }, []);



  //画像アップロード＆URL取得
  // const InputImage = (e: any) => {
  //   const file = e.target.files[0];

  //   console.log(userId);
  //   // const router = useRouter();

  //   // パスと名前で参照を作成
  //   const storageRef = ref(storage, `user_icons/${userId}/user_icon`);

  //   // 画像のアップロード
  //   const uploadImage = uploadBytesResumable(storageRef, file);
  //   uploadImage.on(
  //     "state_changed",
  //     // upload開始したらloading中になる(loadingがtrueになる)
  //     (snapshot) => {
  //       setLoading(true);
  //     },
  //     (err) => {
  //       <></>;
  //     },
  //     //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
  //     () => {
  //       setLoading(false);
  //       setIsUploaded(true);

  //       getDownloadURL(storageRef).then((url) => {
  //         setImgSrc(url);
  //       });
  //     }
  //   );
  // };

  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    // navigate("/login/");
  };

  const emailChange = (e: { target: HTMLButtonElement }) => {
    setRegisterEmail(e.target.value);
  };
  const passChange = (e: { target: HTMLButtonElement }) => {
    setRegisterPassword(e.target.value);
  };

  const userNameChange = (e: { target: HTMLButtonElement }) => {
    setValueUserName(e.target.value);
  };

  const nameChange = (e: { target: HTMLButtonElement }) => {
    setValueName(e.target.value);
  };

  const CpassChange = (e: { target: HTMLButtonElement }) => {
    setCpass(e.target.value);
  };

  const profileChange = (e: { target: HTMLButtonElement }) => {
    setValueProfile(e.target.value);
  };



  //Authenticationへのユーザー登録、データベースへのデータ新規追加
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //Authenticationへのユーザー登録
      //登録するのと同時にログインされる
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          <></>;
        } else {
          fetch(`api/registerUsers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user.uid,
              user_name: valueUserName,
              name: valueName,
              email: registerEmail,
              profile: valueProfile,
              password: registerPassword,
              cpassword: cpass,
            }),
          }).then((res) => res.json());
        }
      });
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  return (
    <div>
      {/* <Header /> */}
      {user ? (
        <div>
          <Link href="myPage">myPage</Link>
          <br />
          <button onClick={logout}>ログアウト</button>
        </div>
      ) : (
        <>
          <div className="mx-auto my-10 w-1/2"
          style={{height: "550px"}}>
            <form onSubmit={handleSubmit}>
              <div className="border border-gray-300 bg-white"
              style={{height:"550px"}}>
                <div className="w-48 mx-auto">
                  <Image
                    src="/logo_transparent.png"
                    alt="ロゴ"
                    width={192}
                    height={192}
                  />
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
                    value={valueUserName}
                    onChange={userNameChange}
                  />

                  <InputRequiredRegister
                    type={"text"}
                    name={"name"}
                    placeholder={"ネーム"}
                    value={valueName}
                    onChange={nameChange}
                  />

                  <InputRegisterPass
                    valuePassword={registerPassword}
                    passChange={passChange}
                  />

                  <InputCPass value={cpass} onChange={CpassChange} />

                  <InputRegister
                    type={"textarea"}
                    name={"profile"}
                    placeholder={"自己紹介"}
                    value={valueProfile}
                    onChange={profileChange}
                  />

                  <RegisterButton />
                </div>
              </div>
            </form>
          </div>

          <div className="mx-auto my-10 w-1/2 bg-white">
            <div className="border border-gray-300 mt-3 h-16 flex">
              <div className="mx-auto my-auto">
                アカウントをお持ちですか？
                <Link className="text-blue-600 ml-1 font-bold" href="/login">
                  ログインする
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;
