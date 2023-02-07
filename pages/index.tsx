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
import { auth } from "../firebase";
import CommentsList from "../src/components/molecules/CommentsList";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const Page: NextPage = () => {
  const [inputComment, setInputComment] = useState<string>("");
  const [currentUserData, setCurrentUserData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [commentTggle, setCommentTggle] = useState<boolean>(false);
  const [favbtn, setFavbtn] = useState<boolean>(false);

  // selectbutton表示非表示
  const [select, setSelect] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        <Link href="/login">ログインしてください</Link>;
      } else {
        setCurrentUserData(currentUser);
        setLoading(false);
      }
    });
  }, []);

  console.log(currentUserData.uid);

  const {
    data: topConnectApi,
    error: topConnectApiError,
    isLoading: topConnectApiIsLoading,
  } = useSWR(`/api/topConnectApi?user_id=${currentUserData.uid}`, fetcher);
  console.log(topConnectApi);

  // 結合データ取得
  const {
    data: connectData,
    error: connectDataError,
    isLoading: connectDataIsLoading,
  } = useSWR(`api/getTotalDataQuery?user_id=${currentUserData.uid}`, fetcher);

  // currentUserの投稿情報
  const {
    data: currentUserPostsData,
    error: currentUserPostsDataError,
    isLoading: currentUserPostsDataIsLoading,
  } = useSWR(`api/getPostData3Query?user_id=${currentUserData.uid}`, fetcher);

  // Favoritesデータ取得
  const {
    data: favsData,
    error: favsDataError,
    isLoading: favsDataIsLoading,
  } = useSWR(`api/getFavDataQuery`, fetcher);

  const {
    data: currentUserFav,
    error: currentUserFavError,
    isLoading: currentUserFavIsLoading,
  } = useSWR(
    `api/getFavsDataUserIdQuery?user_id=${currentUserData.uid}`,
    fetcher
  );

  // keepsデータ取得
  const {
    data: keepsData,
    error: keepsDataError,
    isLoading: keppsDataIsLoading,
  } = useSWR(
    `api/getKeepsDataUserIdQuery?user_id=${currentUserData.uid}`,
    fetcher
  );

  const { mutate } = useSWRConfig();

  const inputCommentEl: MutableRefObject<null> = useRef(null);
  if (
    connectDataIsLoading ||
    currentUserPostsDataIsLoading ||
    favsDataIsLoading ||
    keppsDataIsLoading ||
    currentUserFavIsLoading ||
    topConnectApiIsLoading
  )
    return <div>loading...</div>;
  if (
    connectDataError |
    currentUserPostsDataError |
    favsDataError |
    keepsDataError |
    currentUserFavError |
    topConnectApiError
  )
    return <div>failed to load</div>;

  // currentUserのお気に入りpost＿idの配列を作る
  const currentUserFavs: string[] = [];
  currentUserFav.map((data: any) => {
    currentUserFavs.push(data.post_id);
    console.log(data);
  });

  // currentUserの保存のpost＿idの配列を作る
  const currentUserKeeps: string[] = [];
  keepsData.map((data: any) => {
    currentUserKeeps.push(data.post_id);
  });
  // いいね数用の配列を作る
  const postFavs: number[] = [];
  favsData.map((data: any) => {
    postFavs.push(data.post_id);
  });

  const displayAllData: any[] = [];
  currentUserPostsData.map((data: any) => {
    displayAllData.push(data);
  });
  connectData.map((data: any) => {
    console.log(data);
    displayAllData.push(data);
  });
  console.log(displayAllData);

  displayAllData.sort(function (a, b) {
    return a.to_char < b.to_char ? 1 : -1;
  });

  console.log(displayAllData);

  // コメントアイコンクリック時
  const onClickCommentIcon: () => void = () => {
    setCommentTggle(!commentTggle);
  };

  return (
    <>
      {!loading && (
        <div id="root">
          <Head>
            <title>secondgram</title>
          </Head>
          <Header />

          <div className="mt-5">
            {displayAllData &&
              displayAllData.map((data: any, index: number) => {
                {
                  console.log(data.icon_img);
                }
                return (
                  <div className="mr-auto ml-auto w-3/5 mt-7" key={index}>
                    <div className="flex">
                      {!data.follow_user_id ? (
                        <>
                          <Link className="w-1/12" href={`/mypage`}>
                            {data.icon_img ? (
                              <img
                                src={data.icon_img}
                                alt={`${data.user_name}のアイコン`}
                                className={`mr-1 w-full bg-white ${styles.userIcon}`}
                              />
                            ) : (
                              <img
                                src="/noIcon.png"
                                alt="アイコン"
                                className={`mr-1 w-full bg-white ${styles.userIcon}`}
                              />
                            )}
                          </Link>
                          <Link href={`/mypage`} className="font-semibold mr-1">
                            {data.user_name}
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            className="w-1/12"
                            href={`/profile?userId=${data.follow_user_id}`}
                          >
                            <img
                              src={data.icon_img}
                              alt={`${data.user_name}のアイコン`}
                              className={`mr-1 w-full bg-white ${styles.userIcon}`}
                            />
                          </Link>
                          <Link
                            href={`/profile?userId=${data.follow_user_id}`}
                            className="font-semibold mr-1"
                          >
                            {data.user_name}
                          </Link>
                        </>
                      )}

                      <p className={styles.timestamp}>・{data.to_char}</p>
                    </div>
                    <Link href={`/PostDetails?postId=${data.post_id}`}>
                      <img
                        src={data.post_img}
                        alt="投稿画像"
                        className="w-full"
                      />
                    </Link>
                    <div>{data.caption}</div>
                    <div className="flex pt-3 mb-7">
                      {currentUserFavs.includes(data.post_id) ? (
                        <button
                          onClick={() => {
                            fetch("/api/deleteFavData", {
                              method: "PUT",
                              headers: { "Content-type": "application/json" },
                              body: JSON.stringify({
                                post_id: data.post_id,
                                user_id: connectData[0].user_id,
                              }),
                            })
                              .then(() => {
                                mutate("/api/deleteFavData");
                              })
                              .catch((e) => console.log(e));
                            setFavbtn(!favbtn);
                            mutate("/api/deleteFavData");
                          }}
                          className="my-2 mr-2"
                        >
                          <FaHeart size={25} color={"red"} />
                        </button>
                      ) : (
                        // favoritesに自分のuser_nameがない時
                        <button
                          onClick={() => {
                            fetch("/api/postFavsData", {
                              method: "POST",
                              headers: { "Content-type": "application/json" },
                              body: JSON.stringify({
                                post_id: data.post_id,
                                user_id: connectData[0].user_id,
                                user_name: connectData[0].user_name,
                              }),
                            })
                              .then(() => {
                                mutate("/api/postFavsData");
                              })
                              .catch((e) => console.log(e));
                            setFavbtn(!favbtn);
                          }}
                          className="my-2 mr-2"
                        >
                          <FaRegHeart size={25} />
                        </button>
                      )}
                      <button onClick={onClickCommentIcon} className="m-2">
                        <FaRegComment size={25} />
                      </button>
                      {!data.follow_user_id ? (
                        <></>
                      ) : (
                        <Link href={`/dmPage?userId=${data.follow_user_id}`}>
                          <button className="m-2">
                            <FaTelegramPlane size={25} />
                          </button>
                        </Link>
                      )}
                      <p className="mt-auto mb-auto mx-1">
                        いいね：
                        {
                          postFavs.filter(function (index) {
                            return index === data.post_id;
                          }).length
                        }
                        人
                      </p>
                      {currentUserKeeps.includes(data.post_id) ? (
                        <button
                          onClick={() => {
                            fetch("/api/deleteKeepData", {
                              method: "PUT",
                              headers: { "Content-type": "application/json" },
                              body: JSON.stringify({
                                post_id: data.post_id,
                                user_id: connectData[0].user_id,
                              }),
                            })
                              .then(() => {
                                mutate("/api/deleteKeepData");
                              })
                              .catch((e) => console.log(e));
                          }}
                          className="ml-auto"
                        >
                          <FaBookmark size={25} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            fetch("/api/postKeepsData", {
                              method: "POST",
                              headers: { "Content-type": "application/json" },
                              body: JSON.stringify({
                                post_id: data.post_id,
                                user_id: connectData[0].user_id,
                              }),
                            })
                              .then(() => {
                                mutate("/api/postKeepsData");
                              })
                              .catch((e) => console.log(e));
                          }}
                          className="ml-auto"
                        >
                          <FaRegBookmark size={25} />
                        </button>
                      )}
                    </div>

                    {commentTggle && (
                      <>
                        <CommentsList postId={data.post_id} />
                        <form
                          onSubmit={(e: any) => {
                            mutate("/api/postCommentsData");
                            e.preventDefault();
                            fetch("/api/postCommentsData", {
                              method: "POST",
                              headers: { "Content-type": "application/json" },
                              body: JSON.stringify({
                                comment: inputComment,
                                post_id: data.post_id,
                                user_name: connectData[0].user_name,
                              }),
                            }).catch((e) => console.log(e));
                            setInputComment("");
                          }}
                          className="m-auto w-full"
                        >
                          <input
                            className="w-4/5"
                            id="inputComment"
                            placeholder="コメントを追加..."
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setInputComment(e.target.value)
                            }
                            value={inputComment}
                            ref={inputCommentEl}
                          />
                          <button
                            className={`w-1/5 font-bold ${styles.addCommentBtn}`}
                          >
                            投稿する
                          </button>
                        </form>
                      </>
                    )}

                    <hr className="mb-5" />
                  </div>
                );
              })}

            {/* <div className="flex ml-5">
          <Image width={30} src="" alt="自分のアイコン"  className={`mr-1 w-1/12 bg-white ${styles.userIcon}`} />
          <div>
            <p className="font-semibold mr-1">ユーザーネーム</p>
            <p className="timestamp">ネーム</p>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
