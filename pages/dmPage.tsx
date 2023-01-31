import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { auth } from "../firebase";
import AnotherUser from "../src/components/organisms/AnotherUser";
import Header from "../src/components/organisms/header";
import MobileFooter from "../src/components/organisms/MobileFooter";
import MobileHeader from "../src/components/organisms/MobileHeader";
import { getWindowSize } from "../src/components/utils/GetWindowSize";
import styles from "./dmPage.module.css";

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

function DmPage() {
  //uid
  const [currentUser, setCurrentUser] = useState<string>("");
  //入力されるメッセージ
  const [message, setMessage] = useState("");

  //プロフィールページ,投稿詳細ページからuser_idを引き継ぐ
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
    }).then((res) => {
      res.json();
      mutate(`/api/myMessage?user_id=${currentUser}&&with_user_id=${userId}`);
    });
    setMessage("");
  };

  const { height, width } = getWindowSize();

  if (error) {
    return <p>error!</p>;
  }
  if (!messages) {
    return <p>loading...</p>;
  }
  console.log(messages)

  return (
    <>
    {width > 768 ? (
      <Header />
    ) : (
<MobileHeader />
    )}
      <div className="md:border md:border-solid md:border-neutral-300 md:ml-96  mt-7 md:w-1/2 bg-white"
        style={{ height: "650px" }}
        >
        <AnotherUser userId={userId} />
        <div className={styles.dmContent} id="container">
          {messages === undefined ? (
            <p>loading...</p>
          ) : (
            messages.map((data: any, index: any) => {
              return (
                <>
                  {data.user_id === currentUser ? (
                    //送信メッセージ
                    <div className={`${styles.message} my-3 mr-3 ml-auto`} key={data.user_id}>
                      <p className="rounded-2xl bg-gray-200 p-4 text-xl">
                        {data.message}
                      </p>
                      <p className="text-lg text-right">{data.to_char}</p>
                    </div>
                  ) : (
                    //受信メッセージ
                    <div className={`${styles.message} my-3 mr-auto ml-3`} key={data.user_id}>
                      <p className="rounded-2xl border border-solid border-gray-200 p-4 text-xl">
                        {data.message}
                      </p>
                      <p className="text-lg text-left">{data.to_char}</p>
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
          className=" bg-white h-20 text-center items-center flex gap-3"
          id="form"
        >
          <input
            className="w-10/12 border border-solid border-neutral-200 rounded-2xl py-0.5 px-2.5 h-4/5 text-xl my-1 mx-2"
            placeholder="メッセージを入力..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="input"
          />
          <button className="bg-transparent border-none text-blue-500 font-bold" id="button">
            送信
          </button>
        </form>
      </div>
      {width > 768 ? (
        <></>
      ): (
        <MobileFooter />
      )}
    </>
  );
}

export default DmPage;
