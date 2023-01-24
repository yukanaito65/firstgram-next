import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { storage } from "../../../firebase";
import styles from "./panel.module.css";

type Props = {
  close?: (e: any) => void; //IconModalから閉じる処理を受けとる
  uid: string; //profileChangeからログインユーザーのuidを受け取る
  setIconImgUrl: React.Dispatch<React.SetStateAction<string>>;
};

const Panel: React.FC<Props> = (props) => {
  // const submit = e => {
  //   e.preventDefault();
  //   if (props.close) {
  //     props.close(e);
  //   }
  // };
  //   const imageUpload = async () => {
  //   const fileRef = ref(
  //     storage,
  //     `user_icons/${user.uid}/user_icon.png`
  //   );
  //   const url = await getDownloadURL(fileRef);
  //   setIconImgUrl(url);
  // };
  // imageUpload();

  //storageから取得したURLを格納
  const [iconSrc, setIconSrc] = useState("");

  //ボタンクリック後データ更新のため
  const { mutate } = useSWRConfig();

  //URLを取得
  // const gsReference = ref(
  //   storage,
  //   `user_icons/${props.uid}/user_icon.png`
  // );
  // getDownloadURL(gsReference).then((url)=>{
  //   setIconSrc(url)
  // });

  console.log(iconSrc)

  //写真をアップデートボタン
  const updateClick = (e: any) => {
    //モーダルを閉じる
    e.preventDefault();
    if (props.close) {
      props.close(e);
    }

    const gsReference = ref(
      storage,
      `user_icons/${props.uid}/user_icon.png`
    );
    // getDownloadURL(gsReference).then((url)=>{
    //   setIconSrc(url)
    //   console.log(url)
    // });
    // const url = getDownloadURL(gsReference).then((url)=>console.log(url))
    // console.log(gsReference);
    // console.log(url);



    //写真をstorageにアップロードする
    // const file = e.target.files[0];
    // uploadBytesResumable(gsReference, file)

    //  //profileから飛んできたstateを更新する
    // //  props.setIconImgUrl(iconSrc)

    // //dbを更新する
    //   fetch(`/api/iconChange`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       user_id: props.uid,
    //       icon_img: "iconSrc",
    //     }),
    //   })
    //   .then((res) => res.json())

      // mutate(`/api/userData?user_id=${props.uid}`)

      const file = e.target.files[0];
    uploadBytesResumable(gsReference, file)
    .then(()=>{
      console.log("更新しました")
      getDownloadURL(gsReference).then((url)=>{
        //   setIconSrc(url)
          console.log(url)

      fetch(`/api/iconChange`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: props.uid,
              icon_img: url,
            }),
          })
          .then((res) => {
            res.json()
            mutate(`/api/userData?user_id=${props.uid}`)
          })
        });
    })
    .catch((err)=>{
      console.log(err);
    })
  };


  //削除ボタン
  const deleteClick = (e: any) => {
    //モーダルを閉じる
    e.preventDefault();
    if (props.close) {
      props.close(e);
    }

    const gsReference = ref(
      storage,
      `user_icons/${props.uid}/user_icon.png`
    );
    getDownloadURL(gsReference).then((url)=>{
      setIconSrc(url)
    });

    //写真をstorageから削除する
    deleteObject(gsReference)
      .then(() => {
        console.log("削除しました");

        //profileから飛んできたstateを更新する
        // props.setIconImgUrl("")

        //dbからも削除する(空文字に更新する)
        fetch(`/api/iconChange`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: props.uid,
            icon_img: "",
          }),
        }).then((res) => {
          res.json();
          mutate(`/api/userData?user_id=${props.uid}`)
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // mutate(
    //   `/api/userData`
    // );
    // router.reload()
  };

  return (
    <section className="relative w-full bg-white rounded-2xl overflow-hidden text-center">
      <div className={styles.title}>
        <p>プロフィール写真を変更</p>
      </div>
      <div className={styles.uploadButton}>
        <label htmlFor="iconUpload">写真をアップロード</label>
        <input
          name="iconUpload"
          id="iconUpload"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={updateClick}
        />
        {/* <button onClick={updateClick}>写真をアップロード</button> */}
      </div>
      <div className={styles.deleteButton}>
        <button onClick={deleteClick}>現在の写真を削除</button>
      </div>
      <div className={styles.cancelButton}>
        <button type="button" onClick={props.close}>
          キャンセル
        </button>
      </div>
      {/* <button type="submit" onClick={submit}>
          OK
        </button> */}
    </section>
  );
};

export default Panel;
