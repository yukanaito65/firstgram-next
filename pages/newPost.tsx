import { storage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

export default function NewPost() {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

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
      }
    );
  };

  return (
    <>
      <>
        {loading ? (
          <p>アップロード中...</p>
        ) : (
          <>
            {isUploaded ? (
              <p>アップロード完了</p>
            ) : (
              <>
                <input
                  type="file"
                  onChange={onFileUploadToFirebase}
                  accept=".png, .jpeg, .jpg"
                />
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
