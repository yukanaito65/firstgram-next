// import useSWR from "swr";

// const fetcher =(resource:string)=> fetch(resource).then((res)=>res.json());

// export default function Login(){
//     const {data:users, error} =  useSWR("/api/users", fetcher);
//     if(error){
//         return <p>error!</p>
//       }
//       if(!users) {
//         return <p>loading...</p>
//       }
//       console.log("users",users)
//       return (
//       <>
//       <p>{users[0].userId}</p>
//       </>
//       )
//     }

import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import LoginForm from "./loginForm";

function Login() {
  //ログインを判定する設定
  const [user, setUser] = useState();

  //onAuthStateChangedでログインしているかどうかを監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      {/* <Header show={false} /> */}
          <div>
            <div>
              {/* <h1>
                <Logo />
              </h1> */}
              <LoginForm />

              <p>
                <div className="font-bold text-4xl text-red-700">アカウントをお持ちでないですか？</div>
                <br />
                {/* <Link to={`/index`}> */}
                  <span>登録する</span>
                {/* </Link> */}
              </p>
            </div>
          </div>
        </>
  );
}

export default Login;
