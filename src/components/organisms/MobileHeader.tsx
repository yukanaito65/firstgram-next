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
import styles from "./mobileHeader.module.css";
import Nav from "../molecules/Nav";
import NewPost from "../templates/newPost";
import NewPostModal from "../molecules/NewPostModal";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import useSWR from "swr";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function MobileHeader() {
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
  }, []);

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
    console.log(isOpenModal);
  };

  const navActive = () => {
    setNavDisplay(!navDisplay);
  };

  //ログインユーザーの情報取得
  const { data: users, error } = useSWR(
    () => `/api/userData?user_id=${user.uid}`,
    fetcher
  );

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  return (
    <>
      {!loading && (
        <header className={styles.header}>
          <div className={styles.logo}>
             <Image
              src="/mobileLogo.png"
              alt="logo"
              width={70}
              height={70}
              className={styles.logo_img}
            />
          </div>

          <div className="flex">
            <div className={styles.header_ul}>
              <Link href="/newPost" id={styles.link}>
                <div className={styles.listContent}>
                  <BsPlusSquare size={30} />
                </div>
              </Link>
            </div>

            {navDisplay ? (
              <button className={styles.otherBtn} onClick={() => navActive()}>
                <GiHamburgerMenu size={30} />
              </button>
            ) : (
              <button className={styles.otherBtn} onClick={() => navActive()}>
                <GrMenu size={30} />
              </button>
            )}
          </div>
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

export default MobileHeader;
