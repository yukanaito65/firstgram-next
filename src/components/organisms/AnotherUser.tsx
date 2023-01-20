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
  const [iconImgUrl, setIconImgUrl] = useState("");

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
  const imageUpload = async () => {
    const fileRef = ref(storage, `user_icons/${data[0].user_id}/user_icon.png`);
    const url = await getDownloadURL(fileRef);
    setIconImgUrl(url);
    // console.log(url);
  };
  imageUpload();
  // }, []);
  console.log(iconImgUrl);

  return (
    <div
      className={`${styles.titleWrapper} flex items-center gap-3 px-8 bg-white py-0 px-11`}
    >
      <Link href="">
        <div>
          <img
            src={iconImgUrl}
            alt="icon"
            // width={25}
            // height={25}
            className="rounded-full border border-solid border-gray-200 w-full bg-white"
          />
        </div>
      </Link>
      <Link href="" id={styles.title_link}>
        <div>
          <p className="font-bold">{data[0].name}さん</p>
        </div>
      </Link>
    </div>
  );
}

export default AnotherUser;
