import { onAuthStateChanged } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import useSWR,{ useSWRConfig } from 'swr';
import { auth } from '../firebase';
import AnotherUser from '../src/components/organisms/AnotherUser';
import Header from '../src/components/organisms/header';
import { DirectMessage, User } from '../types/types';
import styles from "./dmPage.module.css"

const fetcher = (resource:any,init:any) => fetch(resource,init).then((res) => res.json());

function DmPage() {
  //相手のuser情報
  const [anotherIcon, setAnotherIcon] = useState<string>("");
  const [anotherName, setAnotherName] = useState<string>("");
  const [anotherUserName, setAnotherUserName] = useState<string>("");
  const [anotherUserId, setAnotherUserId] = useState<string>("");
  //uid
  const [currentUser, setCurrentUser] = useState<string>("");
  //相手と自分のメッセージデータ
  const [MesseDisplay, setMesseDisplay] = useState<{ user_id: string; message: string; timestamp: Date; }[]>([]);
  const [message, setMessage] = useState("");

  const [messageTest,setMessageTest] = useState<{user_id: string; message: string; timestamp: Date;}[]>([]);

  const router = useRouter();
  // const { userId } = router.state as State;
  const {data:messages, error} = useSWR('/api/message',fetcher);
  // const {data:users, usersError} = useSWR('/api/users',fetcher);
  const { mutate } = useSWRConfig();
  console.log(messages)
  // console.log(users)

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async(user) => {
      if (!user) {
        <></>
      } else {
        // ログインユーザーのid取得
        setCurrentUser(user.uid);

        if (error) {
          return <p>error!</p>;
        }
        if (!messages) {
          return <p>loading...</p>;
        }
        // if (usersError) {
        //   return <p>error!</p>;
        // }
        // if (!users) {
        //   return <p>loading...</p>;
        // }


        // メッセージの箱を用意
        const MesseList: {
          user_id: string;
          message: string;
          timestamp: Date;
        }[] = [];

         // ログインユーザーのデータをmessageから取得(MesseListにuseridとmessageとtimestampを追加する)
         //テーブルのuseridとログインユーザーidが等しい＋withuseridと相手のuseridが等しいデータを取得する
         console.log(currentUser)
       const sendMessage =messages.filter((message:DirectMessage) => message.user_id === "mJr5Sh743bavx0WkLhFALfjJ0Av1" && message.with_user_id === "zH0MYM3RrZWusExUypzX5SGZHaI3")
      console.log(sendMessage)

         sendMessage.forEach((sendMessage:DirectMessage) => {
          MesseList.push({
            user_id: sendMessage.user_id,
            message: sendMessage.message,
            timestamp: sendMessage.timestamp,
          })
         },);



          // 会話相手の情報をmessageから取得し、MesseListにuserid、message,timestamp追加(メッセージ表示のため)
          //テーブルのuseridと相手のuseridが等しい＋withuseridとログインユーザーidが等しいデータ
          const receiveMessage = messages.filter((message:DirectMessage) => message.user_id === "zH0MYM3RrZWusExUypzX5SGZHaI3" && message.with_user_id === "mJr5Sh743bavx0WkLhFALfjJ0Av1")
          console.log(receiveMessage)
          //追加してある配列をMesseDisplayに格納
          receiveMessage.forEach((receiveMessage:DirectMessage) => {
          MesseList.push({
            user_id: receiveMessage.user_id,
            message: receiveMessage.message,
            timestamp: receiveMessage.timestamp,
          })
         },);
          setMesseDisplay(MesseList);
          console.log(MesseList)

           // 会話相手の情報をusersから取得(ユーザーデータ表示のため)相手のuseridと等しいuserテーブルを取得して、set関数に格納する
          //  const anotherUser = users.filter((user:User)=>user.userid === "zH0MYM3RrZWusExUypzX5SGZHaI3")
          //  console.log(anotherUser);
//            if (!anotherUser) {
//             <></>
//                     } else {
//                       setAnotherIcon(anotherUser.icon);
//                       setAnotherName(anotherUser.name);
//                       setAnotherUserName(anotherUser.username);
//                       setAnotherUserId(anotherUser.userid);
//                       console.log(anotherUser.username)
// console.log(anotherName)
//                     }

                    // MesseList.sort((a: any, b: any) => {
                    //   return a.timestamp.toDate() < b.timestamp.toDate() ? -1 : 1;
                    // });
        }
                  })
                },[]);

                console.log(currentUser)

  const handleSendMessage = (e:any) => {
     // 再ロードされないようにする
     e.preventDefault();

     //dbに情報追加
     fetch(`/api/postMessage`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: message,
        // timestamp: "2023-01-01 10:00:00",
        // timestamp: serverTimestamp(),
        user_id: currentUser,
        with_user_id: "zH0MYM3RrZWusExUypzX5SGZHaI3",
      }),
     })
     .then((res)=> res.json())
        setMessage("")
        mutate('/api/message')
  }



  return (
    <>
    <Header />
    <div className="border border-solid border-neutral-300 ml-96 mr-3 my-6 w-3/5">{/*className="dmPage"*/}
      <AnotherUser />
      {/* <div className="dmPage__top">
        <Link href="">
          <div className="dmPage__top--anotherUser">
            <div className="dmPage__top--anotherUser-icon">
            <Image src="/noIcon.png" alt="icon" width={25} height={25} className="bg-gray-200 rounded-full"/>
            </div>
            <div className="dmPage__top--anotherUser-text">
              <p className="dmPage__top--anotherUser-nameText">{anotherName}</p>
              <p className="dmPage__top--anotherUser-userNameText">{anotherUserName}</p>
            </div>
          </div>
        </Link>
      </div> */}
      <div className={styles.dmContent}>
      {MesseDisplay === undefined ? (
        <p>ローディング中...</p>
      ) : (
        MesseDisplay.map((data: any, index: any) => {
          // const timestamp = data.postDate.toDate().getTime();
          const timestamp = data.timestamp.toDate();

          const Year = timestamp.getFullYear();
          const Month = timestamp.getMonth() + 1;
          const Day = timestamp.getDate();
          const Hour = timestamp.getHours();
          const Min = timestamp.getMinutes();

          return (
            <>
              {data.user_id === currentUser ? (
                <div className="w-2/5 my-3 mr-3 ml-auto" key={data.user_id}>
                  <p className="rounded-2xl bg-gray-200 p-4">{data.message}</p>
                  {/* {Min.toString().length === 1 ? (
                    <p className="block text-right pr-2">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:0{Min}
                    </p>
                  ) : (
                    <p className="block text-right pr-2">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:{Min}
                    </p>
                  )} */}
                </div>
              ) : (
                <div className="w-2/5 my-3 mr-auto ml-3" key={data.user_id}>
                  <p className="rounded-2xl border border-solid border-gray-200 p-4">{data.message}</p>
                  {/* {Min.toString().length === 1 ? (
                    <p className="pl-2">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:0{Min}
                    </p>
                  ) : (
                    <p className="pl-2">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:{Min}
                    </p>
                  )} */}
                </div>
              )}
            </>
          );
        })
      )}
      </div>
      {/* <div> */}
        {/* form入力をし、enterキーを押したときにonSubmitの中の関数が実行される */}
        <form onSubmit={handleSendMessage} className="my-2 mx-2 bg-white h-10 text-center">
          {/* <div className="w-full pt-4 pr-2.5 pb-8 pl-5"> */}
            <input
            className="w-10/12 border border-solid border-neutral-200 rounded-2xl py-0.5 px-2.5 h-8"
              placeholder="メッセージを入力..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button className="bg-transparent border-none text-blue-500 font-bold">送信</button>
          {/* </div> */}
        </form>
      {/* </div> */}
      </div>
    </>
  )
}

export default DmPage
