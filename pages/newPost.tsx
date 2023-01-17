import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { BsImages } from "react-icons/bs";
import styles from "../src/styles/newPost.module.css";
import { IoClose } from "react-icons/io5";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

export default function NewPost() {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  // 画像のsrc
  const [postImgSrc, setPostImgSrc] = useState("");
  const [iconImgUrl, setIconImgUrl] = useState("");
//   キャプション
const [caption, setCaption] = useState("")

  const { data: posts, error } = useSWR("/api/posts", fetcher);
  const { data: session } = useSession();
  const { data: users } = useSWR("/api/users", fetcher);

  // Storageデータ表示
  useEffect(() => {
    if (!posts) return;
    const imageUpload = async () => {
      const fileRef = ref(
        storage,
        `image/${posts[0].postId}/onepiece01_luffy.png`
      );
      const url = await getDownloadURL(fileRef);
      setIconImgUrl(url);
      console.log(url);
    };
    imageUpload();
  }, [posts]);

  //   postgresqlデータ追加
  const onClickRegister = () => {
    fetch("/api/postPostsData")
      .then((res) => res.json())
      .then(() => {
        fetch("/api/postPostsData", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            postId: `1234567890zxcvbnmzxc`,
            userId: "0987654321poiuytrewq",
            caption: caption,
            timestamp: "2019-04-01 10:00:00",
            favorites: "",
            keeps: "",
          }),
        });
      });
  };

  //  画像をStorageに保存
  const onFileUploadToFirebase = (e: any) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/1234567890qwertyuiop/" + file.name); //imageの後はpostId(ランダム生成？)
    // uploadBytes(storageRef,file).then((snapshot) => {
    //     console.log("ファイルアップロード")
    // })
    const uploadImage = uploadBytesResumable(storageRef, file);
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
  };
  if (loading) {
    <p>アップロード中...</p>;
  }

  if (isUploaded) {
    return (
      <>
        <IoClose size={30} className="absolute top-8 right-8" />

        <div className="flex h-screen">
          <div
            className={`w-10/12 text-white ${styles.container}  m-auto h-3/4`}
          >
            <div className="">
              <div className={`w-full flex ${styles.title}`}>
                <p className={`text-center font-semibold `}>
                  新規投稿を作成
                </p>
                <button type="button" onClick={onClickRegister} className={`ml-auto font-bold ${styles.shareBtn}`}>シェア</button>
              </div>
              <div className="flex h-full">
                <div className="w-6/12 w-full flex m-auto">
                  <img src={postImgSrc} className="m-auto" />
                </div>
                <div>
                  <div className="flex my-3 px-4 ">
                    <img
                      src={iconImgUrl}
                      className={`w-1/12 bg-white ${styles.userIcon}`}
                      alt="ユーザーアイコン"
                    />
                    <p className="my-auto mx-3 font-medium">
                      {posts[0].userId}
                    </p>
                  </div>
                  {/* <div className={`w-full h-full ${styles.inputCaption}`}> */}
                  <textarea
                    className={`w-full h-full border-0 ${styles.inputCaption}`}
                    cols={20}
                    rows={10}
                    wrap="soft"
                    placeholder="キャプションを入力..."
                    onChange={(e) => setCaption(e.target.value)}
                  />
                  {/* </div> */}
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
      <IoClose size={30} className="absolute top-8 right-8" />

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
                  onChange={onFileUploadToFirebase}
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
