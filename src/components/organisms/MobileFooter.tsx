import { FaHome, FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import useSWR from "swr";
import styles from "./mobileFooter.module.css";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());


function MobileFooter() {
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

  //ログインユーザーの情報取得
  const { data: users, error } = useSWR(() => `/api/userData?user_id=${user.uid}`,fetcher);

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  return (
    <>
     {!loading && (
    <footer className={styles.footer}>
      <ul className={styles.footer_ul}>
        {currentPath === "/" ? (
          // クリックされた方
          <li className={styles.footer_li}>
            <div className={styles.onListContent}>
            <HiHome size={30} />
            </div>
          </li>
        ) : (
          // クリックされてない方
          <li className={styles.footer_li}>
            <Link href="/">
              <div className={styles.listContent}>
            <HiOutlineHome size={30} />
            </div>
            </Link>
          </li>
        )}

        {currentPath === "/searchPage" ? (
          <li className={styles.footer_li}>
            <div className={styles.onListContent}>
              <FaSearch size={30} />
            </div>
          </li>
        ) : (
          <li className={styles.footer_li}>
            <Link href="/searchPage">
              <div className={styles.listContent}>
              <FiSearch
                size={30}
              />
              </div>
            </Link>
          </li>
        )}

        {currentPath === "/mypage" ? (
          <li className={styles.footer_li}>
            <div className={styles.onListContent}>
            {users[0].icon_img !== "" ? (
              <img
              src={users[0].icon_img}
              alt="icon"
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
              </div>
            </li>
          ) : (
            //クリックされてない方
            <li className={styles.footer_li}>
              <Link href="/mypage" id={styles.link}>
                <div className={styles.listContent}>
                  {users[0].icon_img !== "" ? (
              <img
              src={users[0].icon_img}
              alt="icon"
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
                )}
             </div>
            </Link>
          </li>
        )}
      </ul>
    </footer>
     )}
     </>
  );

}

export default MobileFooter;
