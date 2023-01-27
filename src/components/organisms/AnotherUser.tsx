import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { auth, storage } from "../../../firebase";
import { User } from "../../../types/types";
import styles from "./anotherUser.module.css";

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

function AnotherUser(props: any) {
  const [loading, setLoading] = useState(true);

  const [iconImgUrl, setIconImgUrl] = useState("");


  // useEffect(() => {
  //   onAuthStateChanged(auth, async (currentUser: any) => {
  //     if (!currentUser) {
  //       console.log("ログアウト状態");
  //     } else {
  //       //ログイン判定が終わったタイミングでloadingはfalseに変わる
  //       setLoading(false);
  //     }
  //   });
  // },[]);

  const { data, error } = useSWR(
    `/api/userData?user_id=${props.userId}`,
    fetcher
  );

  if (error) {
    return <p>error!</p>;
  }
  if (!data) {
    return <p>loading...</p>;
  }

  //icon表示するためにURL取得
  // useEffect(() => {
  // const imageUpload = async () => {
  //   const fileRef = ref(storage, `user_icons/${data[0].user_id}/user_icon.png`);
  //   const url = await getDownloadURL(fileRef);
  //   setIconImgUrl(url);
  //   // console.log(url);
  // };
  // imageUpload();
  // }, []);
  // console.log(iconImgUrl);
  console.log(data);

  return (
    <>
    {/* {!loading && ( */}
    <div
      className={`${styles.titleWrapper} flex items-center gap-5 px-8 bg-white py-5 px-11`}
    >
      <Link href={{ pathname:"/profile",
        query: {userId : props.userId}}}>
        <div className="w-16 h-16">
          {data[0].icon_img !== "" ? (
          <img
            src={data[0].icon_img}
            alt="icon"
            // width={25}
            // height={25}
            className="rounded-full border border-solid border-gray-200 w-full bg-white object-cover"
          />
          ) : (
            <Image
            src="/noIcon.png"
            alt="icon"
            width={40}
            height={40}
            className="bg-gray-200 rounded-full border border-solid border-gray-200 w-full object-cover"
            />
          )
        }
        </div>
      </Link>
      <Link href={{ pathname:"/profile",
        query: {userId : props.userId}}} id={styles.title_link}>
        <div>
          <p className="font-bold">{data[0].name}さん</p>
        </div>
      </Link>
    </div>
    {/* )} */}
    </>
  );
}

export default AnotherUser;
