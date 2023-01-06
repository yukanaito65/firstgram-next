import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";

function RegisterForm() {
  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  //loadingしているかしてないか監視する
  const [loading, setLoading] = useState(false);

  // 画像のアップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);

  //画像のURL
  const [imgSrc, setImgSrc] = useState("");

  //画像アップロード＆URL取得
  const InputImage = (e: any) => {
    const file = e.target.files[0];

    // パスと名前で参照を作成
    const storageRef = ref(storage, "image/" + file.name);

    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      // upload開始したらloading中になる(loadingがtrueになる)
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        <></>;
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setLoading(false);
        setIsUploaded(true);

        getDownloadURL(storageRef).then((url) => {
          setImgSrc(url);
        });
      }
    );
  };

  //Authenticationへのユーザー登録、FireStoreへのデータ新規追加
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

      //FireStoreへのデータ新規追加
      const { userName, name, Cpassword, profile } = e.target.elements;

      //ログイン判定
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          <></>;
        } else {
          //ログイン済みユーザーのドキュメントへの参照を取得
          const docRef = doc(db, "user", user.uid);

          //上記を元にドキュメントのデータを取得
          const userDoc = await getDoc(docRef);

          //exists()でドキュメントの存在の有無を確認
          if (!userDoc.exists()) {
            //FireStoreにユーザー用のドキュメントが作られていなければ新規作成
            setDoc(docRef, {
              userId: user.uid,
              email: registerEmail,
              userName: userName.value,
              name: name.value,
              password: registerPassword,
              Cpassword: Cpassword.value,
              icon: imgSrc,
              follow: [],
              follower: [],
              posts: [],
              favoritePosts: [],
              keepPosts: [],
              profile: profile.value,
            });
          }
        }
      });
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  const emailChange = (e: { target: HTMLButtonElement }) => {
    setRegisterEmail(e.target.value);
  };
  const passChange = (e: { target: HTMLButtonElement }) => {
    setRegisterPassword(e.target.value);
  };

  return (
    <>
      {/* 登録ボタンを押した時にhandleSubmitを実行 */}
      <form onSubmit={handleSubmit} className="registerForm">
        <div className="registerForm__icon">
          {loading ? (
            <>
              <p>uploading</p>
              <input
                name="imageURL"
                id="iconImage"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={InputImage}
                className="registerForm__loading-input"
              />
            </>
          ) : (
            <>
              {isUploaded ? (
                <div className="registerForm__loaded-image">
                  <img
                    alt="icon"
                    src={imgSrc}
                    className="registerForm__loaded-image--img"
                  />
                </div>
              ) : (
                <>
                  <label htmlFor="iconImage">
                    <RegisterIcon />
                  </label>
                  <input
                    name="imageURL"
                    id="iconImage"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={InputImage}
                    className="registerForm__loading-input"
                  />
                </>
              )}
            </>
          )}
        </div>
        <p className="registerForm__requiredText">＊：必須項目</p>
        <InputEmail
          emailChange={emailChange}
          valueEmail={registerEmail}
          requiredIcon={<span className="registerForm__requiredIcon">＊</span>}
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
    </>
  );
}

export default RegisterForm;
