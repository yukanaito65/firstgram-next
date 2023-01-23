import Head from "next/head";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  FaRegHeart,
  FaEllipsisH,
  FaRegComment,
  FaTelegramPlane,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/postPage.module.css";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { getAuth } from "@firebase/auth";
import type { ChangeEvent } from "react";
import type { Comment } from "../../../types/types";
import type { MutableRefObject } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

type Props = {
  close?: (e: any) => void;
  post_id: number;
};

export default function PostDetails(props: Props) {
  const [postImgUrl, setPostImgUrl] = useState<string>("");
  const [iconImgUrl, setIconImgUrl] = useState<string>("");
  // favolitesを格納
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
  const [inputComment, setInputComment] = useState<string>("");
  // selectbutton表示非表示
  const [select, setSelect] = useState<boolean>(false);
  // コメントを取得&管理
  const { data: comments } = useSWR(`/api/getCommentsData?post_id=22`, fetcher);
  const [commentData, setCommentData] = useState<any>(comments);
  const [allData, setAllData] = useState<any>("");
  const { data: session } = useSession();

  // ログインユーザー情報
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  // ❶ propsで受け取ったpost_idでpostsテーブルからuser_idを取得
  const { data: post } = useSWR(`/api/getPostData2Query?post_id=22`, fetcher);
  console.log(post);
  // console.log(post[0].user_id);

  // const otherUserId: string = post[0].user_id;
  // const favoriteUserIds: string[] = post[0].favorites;
  // const keepUserIds: string[] = post[0].keeps;

  // ❷ user_idでusersテーブルからuser情報を取得
  const { data: user } = useSWR(
    `/api/getUserData?user_id=LjUrxuIgfwbbmOgoLQXLGQ7GkZs2`,
    fetcher
  );
  console.log(user);
  // console.log(user[0].user_name);

  // ❸ user_idでStorageからiconを取得
  const iconUpload = async () => {
    const fileRef = ref(
      storage,
      // `user_icons/${otherUserId}/user_icon`
      `user_icons/1234567890qwertyuiopyukayuka/icon_users.png`
    );
    const url = await getDownloadURL(fileRef);
    setIconImgUrl(url);
    console.log(url);
  };
  iconUpload();

  // コメントを追加
  const onClickSendCommnet = (e:any) => {
    e.preventDefault();
    fetch("/api/postCommentsData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        comment: inputComment,
        post_id: 22,
        user_name: "yuka123",
      }),
    })
      .then(() => {
        console.log("aaa")
      })
      .catch((e) => console.log(e));
      
      setInputComment("");

      fetch("/api/comments")
      .then(response => response.json())
      .then(data => {
        const comments = data;
        console.log(commentData);
        setCommentData(comments);
        console.log(commentData);
      });
  };

  //コメント追加時の表示

  useEffect(() => {
    // 結合テーブル情報取得
    fetch("/api/getCommentPostUserId", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        post_id: 22,
      }),
    })
      .then((data) => {
        console.log(data);
        setAllData(data);
        console.log(allData);
      })
      .catch((e) => console.log(e));
    
    // Storageデータからpost画像を取得
    const postImgUpload = async () => {
      const fileRef = ref(
        storage,
        // `post_images/${props.post_id}/post_image`
        `post_images/22/post_image`
      );
      const url = await getDownloadURL(fileRef);
      setPostImgUrl(url);
      console.log(url);
    };
    postImgUpload();
    // Storageデータからユーザーアイコンを取得
    const iconUpload = async () => {
      const fileRef = ref(
        storage,
        // `user_icons/${posts[0].user_id}/user_icon`
        `user_icons/1234567890qwertyuiopyukayuka/icon_users.png`
      );
      const url = await getDownloadURL(fileRef);
      setIconImgUrl(url);
      console.log(url);
    };
    iconUpload();
  }, []);

  // いいね追加ボタン
  // const onClickAddGood = () => {
  //   favoriteUserIds.push(currentUserId);
  //   fetch("/api/updatePostsFavBody", {
  //     method: "PUT",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       favorites: favoriteUserIds,
  //       post_id: 22,
  //     }),
  //   })
  //     .then((res) => console.log(res.json()))
  //     .catch((e) => console.log(e));
  // };
  // いいね解除ボタン
  // const onClickDeleteGood = (e: any) => {
  //   var index = favoriteUserIds.indexOf(currentUserId);
  //   favoriteUserIds.splice(index, 1);
  //   fetch("/api/updatePostsFavBody", {
  //     method: "PUT",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       favorites: favoriteUserIds,
  //       post_id: 22,
  //     }),
  //   })
  //     .then((res) => console.log(res.json()))
  //     .catch((e) => console.log(e));
  // };

  // 保存追加ボタン
  // const onClickAddKeep = () => {
  //   keepUserIds.push(currentUserId);
  //   fetch("/api/updatePostsKeepBody", {
  //     method: "PUT",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       keeps: keepUserIds,
  //       post_id: 22,
  //     }),
  //   })
  //     .then((res) => console.log(res.json()))
  //     .catch((e) => console.log(e));
  // };
  // // 保存解除ボタン
  // const onClickDeleteKeep = (e: any) => {
  //   var index = keepUserIds.indexOf(currentUserId);
  //   keepUserIds.splice(index, 1);
  //   fetch("/api/updatePostsKeepBody", {
  //     method: "PUT",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       keeps: keepUserIds,
  //       post_id: 22,
  //     }),
  //   })
  //     .then((res) => console.log(res.json()))
  //     .catch((e) => console.log(e));
  // };

  // コメントアイコンクリック時にinputタグにフォーカス
  const inputCommentEl: MutableRefObject<null> = useRef(null);
  const onClickCommentIcon = () => {
    inputCommentEl?.current.focus();
  };

  // 右上のセレクトボタン
  const onClickSelectOpen = (e: any) => {
    setSelect(true);
  };
  const onClickSelectClose = (e: any) => {
    setSelect(false);
  };

  if (session) {
    return (
      <>
        再度ログインしてください
        {/* {session.user.email} */}
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{}</title>
      </Head>
      <div className="h-screen flex relative">
        <IoClose
          size={30}
          onClick={props.close}
          className={`absolute top-8 right-8 text-white ${styles.closeBtn}`}
        />
        <div className="w-9/12 bg-black m-auto h-5/6 items-center flex">
          <div className="w-6/12">
            <img className="w-full" src={postImgUrl} alt="投稿画像" />
          </div>
          <div className="w-6/12 h-full postText bg-white">
            <div className="flex my-3 px-4">
              <img
                src={iconImgUrl}
                className={`w-1/12 bg-white ${styles.userIcon}`}
                alt="ユーザーアイコン"
              />
              <div className="post-icon-image">
                {/* {props.icon !== "" ? (
          <img src={props.icon} alt="icon" className="" />
        ) : (
          <img
            className=""
            src={`${process.env.PUBLIC_URL}/noIcon.png`}
            alt="NoImage"
          />
        )} */}
              </div>

              <p className="my-auto mx-3 font-medium">
                {/* {users[0].user_name} */}
              </p>
              {select ? (
                <>
                  <div className="postdetalis__select">
                    <nav className="postdetalis__nav">
                      <ul className="postdetails__ul">
                        <li className="postdetails__li">
                          <Link href="/PostEditing?post_id=22&user_id=ontherUserId">
                            <button className="navBtn">編集</button>
                          </Link>
                        </li>
                        <li className="postdetails__liButtom">
                          <Link href="/Delete">
                            <button
                              // onClick={ClickDelition}
                              className="navBtn"
                            >
                              削除
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="postdetails__closebtn">
                    <AiOutlineClose
                      className="postdetails__closebtnicon"
                      size={27}
                      color={"rgb(38, 38, 38)"}
                      onClick={onClickSelectClose}
                    />
                  </div>
                </>
              ) : (
                <>
                  <button onClick={onClickSelectOpen} className="ml-auto m-2">
                    <FaEllipsisH size={25} />
                  </button>
                </>
              )}
            </div>
            <div className="h-3/4 py-3 px-4 overflow-scroll">
              {/* <p>{posts[0].caption}</p> */}
              <p>
                キャプション(仮)スクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロール
                テストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテスト
                スクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテスト
                スクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテスト
                スクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテスト
                テストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテストテストスクロールテストスクロールテストスクロールテストスクロール
                テストスクロールテストスクロールテストスクロールテストスクロールテストスクロールテスト
              </p>

              {comments &&
                comments.map((comment: Comment, index: number) => {
                  return (
                    <div key={index} className="flex py-1">
                      <p className="mr-1">{comment.user_name}</p>
                      <p>{comment.comment}</p>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="flex pt-3 px-4">
              {favorites.includes(currentUserId) ? (
                <button className="my-2 mr-2">
                  <FaHeart size={25} color={"red"} />
                </button>
              ) : (
                <button className="my-2 mr-2">
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
                いいね：{favorites.length}人
              </p>
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
            <p className="px-4 pb-3 text-xs text-gray-500">
              {/* {posts[0].timestamp} */}
            </p>
            <hr />
            <form onSubmit={onClickSendCommnet} className="m-auto w-full">
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
                // onClick={onClickSendCommnet}
              >
                投稿する
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
