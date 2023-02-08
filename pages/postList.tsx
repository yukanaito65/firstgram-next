import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { auth } from "../firebase";
import PostDetailsModal from "../src/components/molecules/PostDetailsModal";
import PostDetails from "./PostDetails";

interface Props {
  userId: any;
}

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function PostList(props: Props) {
  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: posts, error } = useSWR(
    `/api/userPostData?user_id=${props.userId}`,
    fetcher
  );
  if (error) {
    return <p>error!</p>;
  }
  if (!posts) {
    return <p>loading</p>;
  }

  console.log(posts);

  // モーダル管理
  if (typeof document === "object") {
    const body: HTMLBodyElement | null = document.querySelector("body");
    if (body && isOpenModal) {
      body.style.overflow = "hidden";
    }
  }

  const toggleModal = (e: any) => {
    // if (e.target === e.currentTarget) {
    setIsOpenModal(!isOpenModal);
    console.log("クリックされたよ！");
    // }
  };

  // const postImagArray = posts.map((postImg:any)=>{postImg.post_img})
  // console.log(postImagArray)

  // w-[calc((100%_-_6px) / 3)]
  // aspect-square
  // gap-x-3
  return (
    <div className="flex display flex-wrap ">
      {posts.map((data: any) => {
        return (
          <>
            <div
              style={{ width: "calc((100% - 20px) / 3)", aspectRatio: "1/1" }}
            >
              <Link
                href={`/PostDetails?postId=${data.post_id}`}
              >
                <img
                  src={data.post_img}
                  alt="img"
                  // width={120}
                  // height={120}
                  // className="
                  // w-[calc((100%_-_6px) / 3)]
                  // aspect-square"
                  className="w-full h-full object-cover p-2"
                />
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default PostList;
