import Link from "next/link";
import { BsGearWide } from "react-icons/bs";
import styles from "./navBtn.module.css";


function SettingBtn() {
  return (
    <Link href="/profileChange" id={styles.navBtn_link}>
      <button className={styles.navBtn}>
        設定
        <BsGearWide size={20} className={styles.navBtnIcon} />
      </button>
    </Link>
  );
}

export default SettingBtn;
