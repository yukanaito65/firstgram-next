import Link  from "next/link";
import { FaBookmark } from "react-icons/fa";
import styles from "./navBtn.module.css";


function KeepBtn() {
  return (
    <Link href="/keep" id={styles.navBtn_link}>
      <button className={styles.navBtn}>
        保存済み
        <FaBookmark size={20} className={styles.navBtnIcon} />
      </button>
    </Link>
  );
}

export default KeepBtn;
