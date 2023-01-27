import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../src/styles/home.module.css";
import { NextPage } from "next";
import { clientRequestInstance } from "../modules/request";
import useSWR, { useSWRConfig } from "swr";
import { features } from "process";
import Link from "next/link";
import Header from "../src/components/organisms/header";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaTelegramPlane,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { MutableRefObject } from "react";
import { useSession } from "next-auth/react";


interface Message {
  messageId: string;
  message: string;
  timestamp: Date;
  userId: string;
  withUserId: string;
}

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const Page: NextPage = () => {
  const [inputComment, setInputComment] = useState<string>("");
  // selectbutton表示非表示
  const [select, setSelect] = useState<boolean>(false);
  const { data: session } = useSession();

    // ログインユーザー情報
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    console.log(`ログインユーザーID:${currentUserId}`);
  
    // 結合データ取得
    const {
      data: connectData,
      error: connectDataError,
      isLoading: connectDataIsLoading,
    } = useSWR("api/getAllPostIdQuery?post_id=22", fetcher);

    // コメントデータ取得
  const {
    data: commentsData,
    error: commentsDataError,
    isLoading: commentsDataIsLoading,
  } = useSWR("api/getCommentsData?post_id=22", fetcher);

  // Favoritesデータ取得
  const {
    data: favsData,
    error: favsDataError,
    isLoading: favsDataIsLoading,
  } = useSWR("api/getFavsDataPostIdQuery?post_id=22", fetcher);

  const {
    data: currentUserFav,
    error: currentUserFavError,
    isLoading: currentUserFavIsLoading,
  } = useSWR(
    `api/getCuurentUserFavQuery?post_id=22&user_id=${currentUserId}`,
    fetcher
  );

  // keepsデータ取得
  const {
    data: keepsData,
    error: keepsDataError,
    isLoading: keppsDataIsLoading,
  } = useSWR("api/getKeepsDataPostIdQuery?post_id=22", fetcher);

  const {
    data: currentUserKeep,
    error: kcurrentUserKeepError,
    isLoading: currentUserKeepIsLoading,
  } = useSWR(
    `api/getCuurentUserKeepQuery?post_id=22&user_id=${currentUserId}`,
    fetcher
  );

  const { mutate } = useSWRConfig();

  const inputCommentEl: MutableRefObject<null> = useRef(null);
  if (
    connectDataIsLoading ||
    commentsDataIsLoading ||
    favsDataIsLoading ||
    keppsDataIsLoading ||
    currentUserFavIsLoading ||
    currentUserKeepIsLoading
  )
    return <div>loading...</div>;
  if (
    connectDataError |
    commentsDataError |
    favsDataError |
    keepsDataError |
    currentUserFavError |
    kcurrentUserKeepError
  )
    return <div>failed to load</div>;

  // コメントアイコンクリック時にinputタグにフォーカス
  const onClickCommentIcon: () => void = () => {
    if (inputCommentEl.current) {
      inputCommentEl.current.focus();
    }
  };

  // postのtimestampの表記を設定
  const postTimestamp = Date.parse(connectData[0].timestamp);
  const postTimestampData = new Date(postTimestamp).toLocaleString();
  const timestampUntilMinits = postTimestampData.slice(0, -3);

  // コメントを追加
  const onClickSendCommnet = (e: any) => {
    mutate("/api/postCommentsData");
    e.preventDefault();
    fetch("/api/postCommentsData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        comment: inputComment,
        post_id: 22,
        user_name: connectData[0].user_name,
      }),
    }).catch((e) => console.log(e));
    setInputComment("");
  };

  // いいね追加ボタン
  const onClickAddGood = () => {
    if (currentUserId) {
      fetch("/api/postFavsData", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          post_id: 22,
          user_id: connectData[0].user_id,
          user_name: connectData[0].user_name,
        }),
      })
        .then(() => {
          mutate("/api/postFavsData");
        })
        .catch((e) => console.log(e));
    }
  };

  // いいね解除ボタン
  const onClickDeleteGood = (e: any) => {
    if (currentUserId) {
      fetch("/api/deleteFavData", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          post_id: 22,
          user_id: connectData[0].user_id,
        }),
      })
        .then(() => {
          mutate("/api/deleteFavData");
        })
        .catch((e) => console.log(e));
    }
  };
  // 保存追加ボタン
  const onClickAddKeep = () => {
      if (currentUserId) {
        fetch("/api/postKeepsData", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            post_id: 22,
            user_id: connectData[0].user_id,
          }),
        })
          .then(() => {
            mutate("/api/postKeepsData");
          })
          .catch((e) => console.log(e));
      }
  };
  // 保存解除ボタン
  const onClickDeleteKeep = (e: any) => {
    if (currentUserId) {
      fetch("/api/deleteKeepData", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          post_id: 22,
          user_id: connectData[0].user_id,
        }),
      })
        .then(() => {
          mutate("/api/deleteKeepData");
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
    <div id="root">
      <Head>
        <title>secondgram</title>
      </Head>
      <Header />
      

      <div className="flex mt-5">
      {connectData && connectData.map((data: any, index: number) => {
        <div className="mr-auto ml-auto w-3/5" key={index}>
        <div className="flex">
          <img src={data.icon_img} alt={`${data.user_name}のアイコン`} className={`mr-1 w-1/12 bg-white ${styles.userIcon}`} />
          <p className="font-semibold mr-1">{data.user_name}</p>
          <p className={styles.timestamp}>・{data.timestamp}</p>
        </div>
        <img src={data.post_img} alt="投稿画像" className="w-full" />
        <div className="flex pt-3 px-4">
              {currentUserFav.length > 0 ? (
                <button onClick={onClickDeleteGood} className="my-2 mr-2">
                  <FaHeart size={25} color={"red"} />
                </button>
              ) : (
                // favoritesに自分のuser_nameがない時
                <button onClick={onClickAddGood} className="my-2 mr-2">
                  <FaRegHeart size={25} />
                </button>
              )}
              <button onClick={onClickCommentIcon} className="m-2">
                <FaRegComment size={25} />
              </button>
              {"otherUserId" === currentUserId ? (
                <></>
              ) : (
                <Link href="/dmPage?user_id=otherUserId">
                  <button className="m-2">
                    <FaTelegramPlane size={25} />
                  </button>
                </Link>
              )}
              <p className="mt-auto mb-auto mx-1">
                いいね：{favsData.length}人
              </p>
              {currentUserKeep.length > 0 ? (
                <button onClick={onClickDeleteKeep} className="ml-auto m-2">
                  <FaBookmark size={25} />
                </button>
              ) : (
                <button onClick={onClickAddKeep} className="ml-auto m-2">
                  <FaRegBookmark size={25} />
                </button>
              )}
            </div>
        <div>
          {/* {comments &&
              comments.map((comment: Comment, index: number) => {
                return ( */}
          <div key={"index"} className="flex py-1 mb-2.5">
            <p className="mr-1 font-semibold">comment.user_name</p>
            <p>comment.comment</p>
          </div>
          {/* );
              })} */}
        </div>
        <hr />
      </div>
      })}
        
      
        <div className="flex ml-5">
          <Image width={30} src="" alt="自分のアイコン"  className={`mr-1 w-1/12 bg-white ${styles.userIcon}`} />
          <div>
            <p className="font-semibold mr-1">ユーザーネーム</p>
            <p className="timestamp">ネーム</p>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Page;
