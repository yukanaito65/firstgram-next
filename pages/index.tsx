import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../src/styles/home.module.css";
import { NextPage } from "next";
import { clientRequestInstance } from "../modules/request";
import useSWR from "swr";
import { features } from "process";
import Link from "next/link";
import Header from "../src/components/organisms/header";
import { getAuth } from "@firebase/auth";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaTelegramPlane,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useEffect, useState } from "react";

interface Message {
  messageId: string;
  message: string;
  timestamp: Date;
  userId: string;
  withUserId: string;
}

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const Page: NextPage = () => {
  const [favorites, setFavorites] = useState<any>([
    "aaa",
    "bbb",
    "ccc",
    "ddd",
    "LjUrxuIgfwbbmOgoLQXLGQ7GkZs2",
  ]); //これは消す予定
  const [keeps, setKeeps] = useState<any>([
    "aaa",
    "bbb",
    "ccc",
    "ddd",
    "LjUrxuIgfwbbmOgoLQXLGQ7GkZs2",
  ]); //これは消す予定
  const [commentData, setCommentData] = useState<any>("comments");
  const [tableConnectData, setTableConnectData] = useState<any>(null);

  // ログインユーザー情報取得
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  console.log(currentUserId);

  // currentユーザーのfollw配列取得
  const { data: user } = useSWR(
    `/api/getUserData?user_id=${currentUserId}`,
    fetcher
  );
  // if(user){
  // console.log(user[0].follow)}
  // console.log(user);
  // const userIds: string[] = user[0].follow

  // follow配列の中のuser_idのpost情報を取得
  const { data: posts } = useSWR(`/api/getUserData?user_id=userIds`, fetcher);
  console.log(posts);

  useEffect(() => {
    // 結合テーブル情報取得
    fetch("/api/getAllUserId", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        post_id: 22,
      }),
    })
      .then((data) => {
        setTableConnectData(data)
        console.log(tableConnectData)
      })
      .catch((e) => console.log(e));
  },[])

  console.log(tableConnectData)

  return (
    <div id="root">
      <Head>
        <title>secondgram</title>
      </Head>
      <Header />
      

      <div className="flex mt-5">
      {tableConnectData && tableConnectData.map((data: any, index: number) => {
        <div className="mr-auto ml-auto w-3/5" key={index}>
        <div className="flex">
          <Image width={30} src="" alt="${name_name}のアイコン" className={`mr-1 w-1/12 bg-white ${styles.userIcon}`} />
          <p className="font-semibold mr-1">ユーザーネーム</p>
          <p className={styles.timestamp}>・timestamp</p>
        </div>
        <Image objectFit="contain" width={300} src="" alt="投稿画像" className="w-full" />
        <div className="flex pt-3 ">
          {favorites.includes(currentUserId) ? (
            <button className="my-2 mr-2">
              <FaHeart size={25} color={"red"} />
            </button>
          ) : (
            <button className="my-2 mr-2">
              <FaRegHeart size={25} />
            </button>
          )}

          <button className="m-2">
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

          <p className="mt-auto mb-auto mx-1">いいね：{favorites.length}人</p>
          {keeps.includes(currentUserId) ? (
            <button className="ml-auto m-2">
              <FaBookmark size={25} />
            </button>
          ) : (
            <button className="ml-auto m-2">
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
  );
};

export default Page;
