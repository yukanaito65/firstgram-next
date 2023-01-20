import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { BsImages } from "react-icons/bs";
import styles from "../src/styles/newPost.module.css";
import { IoClose } from "react-icons/io5";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Header from "../src/components/organisms/header";
import { getAuth } from "@firebase/auth";
import { useRouter } from "next/router";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

type Props = {
  close?: (e: any) => void;
};

export default function NewPost(props: any) {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  // 画像のsrc
  const [postImgSrc, setPostImgSrc] = useState("");
  const [iconImgUrl, setIconImgUrl] = useState("");
  const [files, setFile] = useState<File>();
  //   キャプション
  const [caption, setCaption] = useState("");
  // post画像のプレビュー管理
  const [preview, setPreview] = useState("/img/no_image.png");

  // ログインユーザー情報
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  const handleChangeFile = (e: any) => {
    // const { files } = e.target.files[0];
    setFile(e.target.files[0]);
    console.log(files)
    // if (typeof files === "undefined") return;
    // setPreview(window.URL.createObjectURL(files));
    // setIsUploaded(true);
  };

  const { data: currentUserData } = useSWR(
    `/api/getCurrentUserData?user_id=${currentUserId}`,
    fetcher
  );
  const router = useRouter();


  // 閉じるボタン
  const closeModal = () => {
    const result = window.confirm(
      "投稿を破棄しますか？このまま移動すると、編集内容は保存されません。"
    );
    console.log(result)
    if (result) {
      props.close();
    }
  };

  useEffect(() => {
    if (typeof files === "undefined") return;
    setPreview(window.URL.createObjectURL(files));
    setIsUploaded(true);
  },[files])

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

  // postテーブルからcurrentUserの最新のpostのpost_idを取得
  const getPostsId = () => {
    fetch("/api/getPostData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //  post画像をStorageに保存
        // const file = e.target.files[0];

        const storageRef = ref(
          storage,
          `post_images/${res[0].post_id}/post_image`
        );
        if (typeof files === "undefined") return;
        const uploadImage = uploadBytesResumable(storageRef, files);
        uploadImage.on(
          "state_changed",
          () => {
            setLoading(true);
          },
          (err) => {
            console.log(err);
          },
          () => {
            setLoading(false);
            setIsUploaded(true);
            getDownloadURL(storageRef).then((url: string) => {
              setPostImgSrc(url);
            });
          }
        );
      });
  };

  //  postテーブルにpostデータを追加
  const onClickRegister = () => {
    fetch("/api/postPostsData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: currentUserId,
        caption: caption,
        favorites: null,
        keeps: null,
      }),
    })
      .then((res) => console.log(res.json()))
      .catch((e) => console.log(e));
    getPostsId();
    // onFileUploadToFirebase(preview);
    router.push('/');
  };

  if (loading) {
    <div>
      <Header />
      <IoClose size={30} className="absolute text-white top-8 right-8" />

      <div className="flex h-screen">
        <div className={`w-5/12 text-white ${styles.container}  m-auto h-3/4`}>
          <div className="">
            <div className="w-full">
              <p className={`text-center font-semibold ${styles.title}`}>
                新規投稿を作成
              </p>
            </div>
            <div className="text-center m-auto">
              <p>アップロード中...</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  if (isUploaded) {
    return (
      <>
        <Header />
        <IoClose
          onClick={closeModal}
          size={30}
          className="absolute top-8 text-white right-8"
        />

        <div className="flex h-screen">
          <div
            className={`w-10/12 text-white ${styles.container}  m-auto h-3/4`}
          >
            <div className="">
              <div className={`w-full flex ${styles.title}`}>
                <p className={`text-center font-semibold `}>新規投稿を作成</p>
                <button
                  type="button"
                  onClick={onClickRegister}
                  className={`ml-auto font-bold ${styles.shareBtn}`}
                >
                  シェア
                </button>
              </div>
              <div className="flex h-full">
                <div className="w-6/12 w-full flex m-auto">
                  {/* <img src={postImgSrc} className="m-auto" /> */}
                  <img src={preview} alt="preview" className="m-auto" />
                </div>
                <div>
                  <div className="flex my-3 px-4 ">
                    <img
                      src={iconImgUrl}
                      className={`w-1/12 bg-white ${styles.userIcon}`}
                      alt="ユーザーアイコン"
                    />
                    <p className="my-auto mx-3 font-medium">
                      {currentUserData[0].user_name}
                    </p>
                  </div>
                  <textarea
                    className={`w-full h-full border-0 ${styles.inputCaption}`}
                    cols={20}
                    rows={10}
                    wrap="soft"
                    placeholder="キャプションを入力..."
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <IoClose
        size={30}
        className="absolute top-8 text-white right-8"
        onClick={props.close}
      />

      <div className="flex h-screen">
        <div className={`w-5/12 text-white ${styles.container}  m-auto h-3/4`}>
          <div className="">
            <div className="w-full">
              <p className={`text-center font-semibold ${styles.title}`}>
                新規投稿を作成
              </p>
            </div>
            <div className="text-center m-auto">
              <div className="imageLogoAndText">
                <BsImages className="m-auto" size={80} />
                <p>ここに写真や動画をドラッグ</p>
              </div>
              <label htmlFor="inputFile">
                コンピュータから選択
                <input
                  type="file"
                  // onChange={onFileUploadToFirebase}
                  onChange={handleChangeFile}
                  accept=".png, .jpeg, .jpg"
                  id="inputFile"
                  className={styles.inputFile}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
