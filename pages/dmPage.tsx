import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { auth } from "../firebase";
import AnotherUser from "../src/components/organisms/AnotherUser";
import Header from "../src/components/organisms/header";
import styles from "./dmPage.module.css";

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

function DmPage() {
  //uid
  const [currentUser, setCurrentUser] = useState<string>("");
  //入力されるメッセージ
  const [message, setMessage] = useState("");

  //プロフィールページからuser_idを引き継ぐ
  const router = useRouter();
  const userId = router.query.userId;
  console.log(userId);

  //messageテーブルからデータ取得
  const { data: messages, error } = useSWR(
    () => `/api/myMessage?user_id=${currentUser}&&with_user_id=${userId}`,
    fetcher
  );
  console.log(messages);

  //データ更新のため
  const { mutate } = useSWRConfig();

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        <></>;
      } else {
        // ログインユーザーのid取得
        setCurrentUser(user.uid);
      }
    });
  }, []);

  console.log(currentUser);

  const handleSendMessage = (e: any) => {
    // 再ロードされないようにする
    e.preventDefault();

    //dbに情報追加
    fetch(`/api/postMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        user_id: currentUser,
        with_user_id: userId,
      }),
    }).then((res) => res.json());
    mutate("/api/myMessage"), setMessage("");
  };

  if (error) {
    return <p>error!</p>;
  }
  if (!messages) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="border border-solid border-neutral-300 ml-96 mr-3 my-6 w-3/5">
        <AnotherUser userId={userId} />
        <div className={styles.dmContent}>
          {messages === undefined ? (
            <p>loading...</p>
          ) : (
            messages.map((data: any, index: any) => {
              return (
                <>
                  {data.user_id === currentUser ? (
                    <div className="w-2/5 my-3 mr-3 ml-auto" key={data.user_id}>
                      <p className="rounded-2xl bg-gray-200 p-4">
                        {data.message}
                      </p>
                      <p>{data.to_char}</p>
                    </div>
                  ) : (
                    <div className="w-2/5 my-3 mr-auto ml-3" key={data.user_id}>
                      <p className="rounded-2xl border border-solid border-gray-200 p-4">
                        {data.message}
                      </p>
                      <p>{data.to_char}</p>
                    </div>
                  )}
                </>
              );
            })
          )}
        </div>
        {/* form入力をし、enterキーを押したときにonSubmitの中の関数が実行される */}
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className="my-2 mx-2 bg-white h-10 text-center"
        >
          <input
            className="w-10/12 border border-solid border-neutral-200 rounded-2xl py-0.5 px-2.5 h-8"
            placeholder="メッセージを入力..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="bg-transparent border-none text-blue-500 font-bold">
            送信
          </button>
        </form>
      </div>
    </>
  );
}

export default DmPage;
