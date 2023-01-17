import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  const [navDisplay, setNavDisplay] = useState<boolean>(false);

  const navActive = () => {
    setNavDisplay(!navDisplay);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/logo_transparent.png"
            alt="logo"
            width={60}
            height={60}
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
                <p>作成</p>
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.header_li}>
              <Link href="/newPost" id={styles.link}>
                <div className={styles.listContent}>
                  <BsPlusSquare size={30} />
                  <p>作成</p>
                </div>
              </Link>
            </li>
          )}

          {currentPath === "/mypage" ? (
            //クリックされた方
            <li className={styles.header_li}>
              <div className={styles.onListContent}>
                <Image
                  src="/noIcon.png"
                  alt="icon"
                  width={30}
                  height={30}
                  className="bg-gray-300"
                />
                <p>プロフィール</p>
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.header_li}>
              <Link href="/mypage" id={styles.link}>
                <div className={styles.listContent}>
                  <Image
                    src="/noIcon.png"
                    alt="icon"
                    width={30}
                    height={30}
                    className="bg-gray-300"
                  />
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
      {navDisplay ? <Nav /> : <></>}
    </>
  );
}

export default Header;

// FiPlusSquare
