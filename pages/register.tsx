import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import RegisterForm from "../molecules/RegisterForm";

function Register() {
  // //ログイン状態保持(userが値を持てばログイン状態)
  const [user, setUser] = useState<any>("");

  //ログインしているかどうかを判断する
  //onAuthStateChanged関数はfirebaseの関数
  //ログイン判定は1度だけでいいからuseEffectを使用
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
          <div className="registerContents">
            <RegisterForm />
            <p>
              アカウントをお持ちですか？
                <span className="registerContents__loginLink">ログインする</span>
            </p>
          </div>
        </>
  );
}

export default Register;
