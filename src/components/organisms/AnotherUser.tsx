import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { auth, storage } from "../../../firebase";
import { User } from "../../../types/types";
import styles from "./anotherUser.module.css"

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

function AnotherUser(props:any) {
  const [anotherIcon, setAnotherIcon] = useState<string>("");
  const [anotherName, setAnotherName] = useState<string>("");
  const [anotherUserName, setAnotherUserName] = useState<string>("");
  const [anotherUserId, setAnotherUserId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [iconImgUrl, setIconImgUrl] = useState("");

  const { data, error } = useSWR(`/api/userData?user_id=${props.userId}`, fetcher);

  useEffect(() => {
    const imageUpload = async () => {
      const fileRef = ref(
        storage,
        `user_icons/1234567890qwertyuiopyukayuka/icon_users.png`
      );
      const url = await getDownloadURL(fileRef);
      setIconImgUrl(url);
      console.log(url);
    };
    imageUpload();
  }, []);

  // useEffect(() => {
  //   //ログイン判定
  //   onAuthStateChanged(auth, async (user) => {
  //     if (!user) {
  //       <></>;
  //     } else {
  //       // ログインユーザーのid取得
  //       setCurrentUser(user.uid);


        // const anotherUser = users.filter(
        //   (user: User) => user.user_id === "zH0MYM3RrZWusExUypzX5SGZHaI3"
        // );
        // console.log(anotherUser);
        // if (!anotherUser) {
        //   <></>;
        // } else {
        //   // setAnotherIcon(anotherUser[0].icon);
        //   setAnotherName(anotherUser[0].name);
        //   setAnotherUserName(anotherUser[0].user_name);
        //   setAnotherUserId(anotherUser[0].user_id);
        // }
  //     }
  //   });
  // }, []);


  if (error) {
    return <p>error!</p>;
  }
  if (!data) {
    return <p>loading...</p>;
  }

  return (
        <div className={styles.titleWrapper}>
        {/* // "flex items-center gap-3 px-8 bg-white border-b border-gray-300 border-solid" */}
           <Link href="">
          <div>
            <Image
              src="/noIcon.png"
              alt="icon"
              width={25}
              height={25}
              className="bg-gray-200 rounded-full"
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
