import { useRouter } from "next/router";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import styles from "./settingMenu.module.css";


function SettingMenu() {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <div className={styles.setting}>
      <ul className={styles.setting__ul}>
        {currentPath === "/profileChange" ? (
          // クリックされた方
          <li className={styles.setting__ul_li}>
            <div className={styles.setting__ul_liNoLink}>
              <p className={styles.setting__ul_liIcon}>
                プロフィールを編集
              </p>
            </div>
          </li>
        ) : (
          // クリックされてない方
          <li className={styles.setting__ul_li}>
            <Link href='/profileChange'
            className={styles.setting__ul_liLink}>
              <p
                className={styles.setting__ul_liIcon}
              >
                プロフィールを編集
              </p>
            </Link>
          </li>
        )}

        {currentPath === "/passwordChange" ? (
          <li className={styles.setting__ul_li}>
            <div className={styles.setting__ul_liNoLink}>
              <p className={styles.setting__ul_liIcon}>
                パスワードを変更
              </p>
            </div>
          </li>
        ) : (
          <li className={styles.setting__ul_li}>
            <Link href="/passwordChange" className={styles.setting__ul_liLink}>
          <p className={styles.setting__ul_liIcon}>
            パスワードを変更
          </p>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SettingMenu;
