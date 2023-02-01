import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { FiSearch, FiPlusSquare } from "react-icons/fi";
import { CiSearch, CiSquarePlus } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrMenu } from "react-icons/gr";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import styles from "./header.module.css";
import Nav from "../molecules/Nav";
import NewPost from "../templates/newPost";
import NewPostModal from "../molecules/NewPostModal";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import useSWR from "swr";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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
  },[]);

  const [navDisplay, setNavDisplay] = useState<boolean>(false);

  // 新規投稿のモーダルの管理
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (typeof document === "object") {
    const body: HTMLBodyElement | null = document.querySelector("body");
    if (body && isOpenModal) {
      body.style.overflow = "hidden";
    }
  }

  const toggleModal = (e: any) => {
    // if (e.target === e.currentTarget) {
      setIsOpenModal(!isOpenModal);
    // }
    console.log(isOpenModal)
  };

  const navActive = () => {
    setNavDisplay(!navDisplay);
  };

  //icon表示用URL
  // const [iconImgUrl, setIconImgUrl] = useState("");


  //   const imageUpload = async () => {
  //     const fileRef = ref(
  //       storage,
  //       `user_icons/${user.uid}/user_icon.png`
  //     );
  //     const url = await getDownloadURL(fileRef);
  //     setIconImgUrl(url);
  //     console.log(url);
  //   };
  //   imageUpload();

  //ログインユーザーの情報取得
  const { data: users, error } = useSWR(() => `/api/userData?user_id=${user.uid}`,fetcher);

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }
// console.log(users);
// console.log(props.users);
  return (
    <>
    {!loading && (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/logo_transparent.png"
            alt="logo"
            width={70}
            height={70}
            className={styles.logo_img}
          />
        </div>

        <ul className={styles.header_ul}>
          {currentPath === "/" ? (
            //クリックされた方
            <li className={styles.header_li}>
              <div className={styles.onListContent}>
                <HiHome size={30} />
                <p>ホーム</p>
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.header_li}>
              <Link href="/" id={styles.link}>
                <div className={styles.listContent}>
                  <HiOutlineHome size={30} />
                  <p>ホーム</p>
                </div>
              </Link>
            </li>
          )}

          {currentPath === "/searchPage" ? (
            //クリックされた方
            <li className={styles.header_li}>
              <div className={styles.onListContent}>
                <FaSearch size={30} />
                <p>検索</p>
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.header_li}>
              <Link href="/searchPage" id={styles.link}>
                <div className={styles.listContent}>
                  <FiSearch size={30} />
                  <p>検索</p>
                </div>
              </Link>
            </li>
          )}


          {currentPath === "/newPost" ? (
            //クリックされた方
            <li className={styles.header_li}>
              <div className={styles.onListContent}>
                <BsPlusSquareFill size={30} />
                <p className="font-bold">作成</p>
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.header_li}>
              <button type="button" onClick={toggleModal} className={styles.listContent}>
                <div className={styles.listContent}>
                  <BsPlusSquare size={30} />
                  <p>作成</p>
                </div>
              </button>
            </li>

          )}
          {currentPath === "/myPage" ? (

            //クリックされた方
            <li className={styles.header_li}>
              <div className={styles.onListContent}>
                {/* <div className="w-"> */}
              {users[0].icon_img !== "" ? (
              <img
              src={users[0].icon_img}
              alt="icon"
              // width={40}
              // height={40}
              className="bg-white rounded-full border border-solid border-gray-200 w-12 h-12 object-cover"
            />
                ) : (
                  <Image
                  src="/noIcon.png"
                  alt="icon"
                  width={40}
                  height={40}
                  className="bg-gray-200 rounded-full border border-solid border-gray-200 w-12 h-12 object-cover"
                  />
                )
              }
              {/* </div> */}
                <p>プロフィール</p>
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.header_li}>
              <Link href="/mypage" id={styles.link}>
                <div className={styles.listContent}>
                  {users[0].icon_img !== "" ? (
              <img
              src={users[0].icon_img}
              alt="icon"
              // width={40}
              // height={40}
              className="bg-white rounded-full border border-solid border-gray-200 w-12 h-12 object-cover"
            />
                ) : (
                  <Image
                  src="/noIcon.png"
                  alt="icon"
                  width={40}
                  height={40}
                  className="bg-gray-200 rounded-full border border-solid border-gray-200 w-12 h-12 object-cover"
                  />
                )
              }
                  <p>プロフィール</p>
                </div>
              </Link>
            </li>
          )}
        </ul>

        {navDisplay ? (
          <button className={styles.otherBtn} onClick={() => navActive()}>
            <GiHamburgerMenu size={30} />
            <p className="font-bold">その他</p>
          </button>
        ) : (
          <button className={styles.otherBtn} onClick={() => navActive()}>
            <GrMenu size={30} />
            <p>その他</p>
          </button>
        )}
      </header>
    )}
      {navDisplay ? <Nav /> : <></>}
      {isOpenModal && (
        // <div className="bg-black bg-opacity-70">
        <NewPostModal close={toggleModal}>
          <NewPost close={toggleModal} />
          </NewPostModal>
        // </div>
      )}
    {/* // )} */}
    </>
  );
}

export default Header;
