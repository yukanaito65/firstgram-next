import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { mutate } from "swr";
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

  const [image, setImage] = useState(true);

  const gsReference = ref(
    storage,
    `user_icons/${props.uid}/user_icon.png`
    // `gs://firstgram-next.appspot.com/user_icons/${props.uid}/user_icon.png`
  );

  const updateClick = (e: any) => {
    //モーダルを閉じる
    e.preventDefault();
    if (props.close) {
      props.close(e);
    }
    //写真をアップロードする
    const file = e.target.files[0];
    // const storageRef = ref(storage, `user_icons/${props.uid}/user_icon.png`);
    uploadBytesResumable(gsReference, file);
  };

  const deleteClick = (e: any) => {
    //モーダルを閉じる
    e.preventDefault();
    if (props.close) {
      props.close(e);
    }
    //写真を削除する
    deleteObject(gsReference)
      .then(() => {
        console.log("削除しました");
        props.setIconImgUrl("")
      })
      .catch((err) => {
        console.log(err);
      });
    mutate(
      `gs://firstgram-next.appspot.com/user_icons/${props.uid}/user_icon.png`
    );
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
