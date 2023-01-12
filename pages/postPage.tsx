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
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import styles from "../src/styles/postPage.module.css";
import Image from "next/image";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

export default function PostDetails() {
  const [imageUrl, setImageUrl] = useState("");

  const { data: posts, error } = useSWR("/api/posts", fetcher);
  const { data: session } = useSession();

  // Storageデータ表示
  useEffect(() => {
    const imageUpload = async () => {
      const fileRef = ref(
        storage,
        `image/${posts[0].postId}/onepiece01_luffy.png`
      );
      const url = await getDownloadURL(fileRef);
      setImageUrl(url);
      console.log(url);
    };
  })

  if (error) {
    return <p>error!</p>;
  }
  if (!posts) {
    return <p>loading...</p>;
  }
  console.log("posts", posts);
  console.log(posts[0].userId);
  if (session) {
    return <>再度ログインしてください
     {/* {session.user.email} */}
     </>;
  }

  
  

  return (
    <div className="h-screen flex">
      <Head>
        <title>{}</title>
      </Head>
      <div className="w-9/12 bg-gray-400 m-auto h-4/5 items-center flex">
        <div className="w-6/12 styles.userIcon">
          <img src={imageUrl} alt="投稿画像" />
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
          <div className="h-4/6 py-3 px-4 overflow-scroll">
            <p>{posts[0].caption}</p>
          </div>
          <hr />
          <div className="flex pt-3 px-4">
            <button className="my-2 mr-2">
              <FaRegHeart size={25} />
            </button>
            
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
          <p className="px-4 pb-3 text-xs text-gray-500">{posts[0].timestamp}</p>
          <hr />
          <div className="flex">
          <input className="w-4/5" id="name" placeholder="コメントを追加..." />
          <button className={`font-bold ${styles.addCommentBtn}`}>投稿する</button>
          </div>
        </div>
      </div>
      <button onClick={imageUpload}>画像表示</button>
    </div>
  );
}
