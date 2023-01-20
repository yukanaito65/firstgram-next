import Head from "next/head";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  FaRegHeart,
  FaEllipsisH,
  FaRegComment,
  FaTelegramPlane,
  FaRegBookmark,
} from "react-icons/fa";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import styles from "../../styles/postPage.module.css";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

type Props = {
  close?: (e: any) => void;
};

export default function PostDetails(props: any) {
  const [imageUrl, setImageUrl] = useState("");
  // favolitesを格納
  const [favorites, setFavorites] = useState<any>([]);
  const [favbtn, setFavbtn] = useState(1);

  const { data: posts, error } = useSWR("/api/posts", fetcher);
  // /const { data: comments } = useSWR("/api/getCommentsData?postId=mhbukjdi84ndhsu8eijt", fetcher);
  const { data: comments } = useSWR(() => '/api/getCommentsData?post_id=mhbukjdi84ndhsu8eijt', fetcher)

  const { data: session } = useSession();

  // Storageデータ表示
  useEffect(() => {
    if (!posts) return;
    const imageUpload = async () => {
      const fileRef = ref(
        storage,
        `image/${posts[0].post_id}/onepiece01_luffy.png`
      );
      const url = await getDownloadURL(fileRef);
      setImageUrl(url);
      console.log(url);
    };
    imageUpload();
    
  }, [posts]);
  console.log(comments)

  // // お気に入りボタンがクリックされたら
  // const Favorite = async (e:any) => {
  //   // 押された投稿のFavolitesにloginUserNameを配列で追加
  //   FavoriteUpdata(postid, loginUserName, arrayUnion);
  //   // firestoreからfavolitesを取得、保持
  //   await firebasePostDetails(postid, userid).then((postData) => {
  //     setFavorites(postData.Favorites);
  //   });
  //   setFavbtn(favbtn + 1);
  // };

  // // お気に入り取り消し機能
  // const NoFavorite = async (e:any) => {
  //   // 押された投稿のFavolitesからloginUserNameを削除
  //   FavoriteUpdata(postid, loginUserName, arrayRemove);
  //   // firestoreからfavolitesを取得、保持
  //   await firebasePostDetails(postid, userid).then((postData) => {
  //     setFavorites(postData.Favorites);
  //   });
  // };

  if (error) {
    return <p>error!</p>;
  }
  if (!posts) {
    return <p>loading...</p>;
  }
  console.log("posts", posts);
  console.log(posts[0].user_id);
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
            <img className="w-full" src={imageUrl} alt="投稿画像" />
          </div>
          <div className="w-6/12 h-full postText bg-white">
            <div className="flex my-3 px-4">
              <img
                src={imageUrl}
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

              <p className="my-auto mx-3 font-medium">{posts[0].userId}</p>
              <button className="ml-auto m-2">
                <FaEllipsisH size={25} />
              </button>
            </div>
            <div className="h-3/4 py-3 px-4 overflow-scroll">
              <p>{posts[0].caption}</p>
            </div>
            <hr />
            <div className="flex pt-3 px-4">
              <button className="my-2 mr-2">
                <FaRegHeart size={25} />
              </button>

              {/* {favorites.includes(loginUserName) ? (
                  <FaRegHeart size={30} color={"red"} onClick={NoFavorite} />
                ) : (
                  <FaRegHeart
                    size={30}
                    color={"rgb(38, 38, 38)"}
                    onClick={Favorite}
                  />
                )} */}

              <button className="m-2">
                <FaRegComment size={25} />
              </button>
              <button className="m-2">
                <FaTelegramPlane size={25} />
              </button>
              <p className="mt-auto mb-auto mx-1">いいね：3人</p>
              <button className="ml-auto m-2">
                <FaRegBookmark size={25} />
              </button>
            </div>
            <p className="px-4 pb-3 text-xs text-gray-500">
              {posts[0].timestamp}
            </p>
            <hr />
              <div className="m-auto w-full">
              <input
                className="w-4/5"
                id="name"
                placeholder="コメントを追加..."
              />
              <button className={`w-1/5 font-bold ${styles.addCommentBtn}`}>
                投稿する
              </button>
              </div>
            </div>
        </div>
      </div>
      {/* <button onClick={imageUpload}>画像表示</button> */}
    </div>
  );
}
