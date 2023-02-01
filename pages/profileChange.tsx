import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { auth } from "../firebase";
import SettingMenu from "../src/components/organisms/SettingMenu";
import {
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import Header from "../src/components/organisms/header";
import UpdateInput from "../src/components/atoms/input/UpdateInput";
import IconModal from "../src/components/organisms/IconModal";
import Panel from "../src/components/molecules/Panel";
import Image from "next/image";
import styles from "./profileChange.module.css";
import completeStyles from "./passwordChange.module.css"
import MobileHeader from "../src/components/organisms/MobileHeader";
import MobileFooter from "../src/components/organisms/MobileFooter";
import { getWindowSize } from "../src/components/utils/GetWindowSize";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const ProfileChange = () => {
  //ログインユーザー
  const [user, setUser] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  //icon表示用URL
  const [iconImgUrl, setIconImgUrl] = useState("");

  //モーダルウィンドウ
  const [isOpenModal, setIsOpenModal] = useState(false);

  //子コンポーネントのinputのvalueを受けとる
  const [nameValue, setNameValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  const [profileValue, setProfileValue] = useState("");

  // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        console.log("ログアウト状態");
      } else {
        setUser(currentUser);
        //ログイン判定が終わったタイミングでloadingはfalseに変わる
        setLoading(false);
      }
    });
  }, []);

  console.log(user.uid);

  //ログインユーザーの情報取得
  const { data: users, error } = useSWR(
    () => `/api/userData?user_id=${user.uid}`,
    fetcher
  );

  console.log("data", users);

  //icon表示するためにURL取得
  // const imageUpload =  async() => {
  //   const fileRef = ref(
  //     storage,
  //     `user_icons/${user.uid}/user_icon.png`
  //   );
  //  const url = await getDownloadURL(fileRef);
  //     setIconImgUrl(url)
  //   };
  // imageUpload();

  //画面幅取得
  const { height, width } = getWindowSize();

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  //icon変更モーダルウィンドウ
  const toggleModal = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsOpenModal(!isOpenModal);
    }
  };

  //ボタンがクリックされたときの処理(データ更新)
  const handleSubmit = (e: any) => {
    e.preventDefault();

    //valueの値を取得
    const { name, userName, profile } = e.target.elements;

    //db更新
    fetch(`/api/userUpdate`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.uid,
        name: name.value,
        user_name: userName.value,
        profile: profile.value,
      }),
    }).then((res) => res.json());

    //完了メッセージを表示
    const div = document.getElementById('complete');
     div?.classList.add(`${completeStyles.active}`);
  };

  return (
    <>
      {!loading && (
        <div className="md:flex" id="root">
      {width > 768 ? (
          <Header />
      ) : (
          <MobileHeader />
      )}
          <div className={`md:flex md:gap-12 md:border md:border-solid md:border-neutral-300 md:ml-64  md:my-28 md:w-3/4 bg-white md:h-1/2 ${styles.wrapper}`}
        >
      {width > 768 ? (
            <SettingMenu />
      ) :(
        <></>
      )}
            <form
              className="flex flex-col gap-2.5 w-full md:mt-16 mt-10"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center gap-12 h-20 mb-6">
                <div className="w-48">
                  {users[0].icon_img !== "" ? (
                    <img
                      src={users[0].icon_img}
                      alt="icon"
                      // width={30}
                      // height={30}
                      className="bg-white rounded-full border border-solid border-gray-200 w-16 h-16 object-cover mr-0 ml-auto my-0"
                    />
                  ) : (
                    <Image
                      src="/noIcon.png"
                      alt="icon"
                      width={40}
                      height={40}
                      className="bg-gray-200 rounded-full border border-solid border-gray-200 w-16 h-16 object-cover mr-0 ml-auto my-0"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={toggleModal}
                  className={styles.iconChangeBtn}
                >
                  プロフィール写真を変更
                </button>
                {isOpenModal && (
                  <IconModal close={toggleModal}>
                    <Panel uid={user.uid} setIconImgUrl={setIconImgUrl} />
                  </IconModal>
                )}
              </div>

              <div>
                <UpdateInput
                  data={users[0].name}
                  title={"名前"}
                  name={"name"}
                  pattern={"[!-~]{1,30}"}
                  message={
                    "1文字以上30文字以内"
                  }
                  description={"周りから知られている名前(氏名、ニックネーム)を使用すると、他の人があなたのアカウントを見つけやすくなります。"}
                  setValue={setNameValue}
                />
                <UpdateInput
                  data={users[0].user_name}
                  title={"ユーザーネーム"}
                  name={"userName"}
                  pattern={"^([a-zA-Z0-9]{4,15})$"}
                  message={"半角英数字4文字以上15文字以内"}
                  setValue={setUserNameValue}
                />
                <UpdateInput
                  data={users[0].profile}
                  title={"プロフィール"}
                  name={"profile"}
                  pattern={"{,200}"}
                  countMessage={<p className="text-lg text-gray-400 my-5">{profileValue.length} / 200</p>}
                  setValue={setProfileValue}
                />
              </div>

              {/* どれか一つでも変更されたら色を変える */}
              {users[0].name === nameValue &&
              users[0].user_name === userNameValue &&
              users[0].profile === profileValue ? (
                <button className={styles.beforeUpdateBtn}>変更</button>
              ) : (
                <button className={styles.afterUpdateBtn}>変更</button>
              )}

            </form>
          </div>
          {width > 768 ? (
        <></>
      ): (
        <MobileFooter />
      )}
        </div>
      )}
       <div
     id="complete"
     className={completeStyles.completeChange}
     >
          <p>変更完了しました</p>
        </div>
    </>
  );
};

export default ProfileChange;
