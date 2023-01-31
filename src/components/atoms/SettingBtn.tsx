import Link from "next/link";
import { BsGearWide } from "react-icons/bs";
import { getWindowSize } from "../utils/GetWindowSize";
import styles from "./navBtn.module.css";


function SettingBtn() {
     //画面幅取得
     const { height, width } = getWindowSize();
  return (
    <>
    {width > 768 ? (
    <Link href="/profileChange" id={styles.navBtn_link}>
       <button className={styles.navBtn}>
        設定
        <BsGearWide size={20} className={styles.navBtnIcon} />
      </button>
    </Link>
    ):(
      <Link href="/passwordChange" id={styles.navBtn_link}>
      <button className={styles.navBtn}>
        設定
        <BsGearWide size={20} className={styles.navBtnIcon} />
      </button>
    </Link>
    )}
    </>
  );
}

export default SettingBtn;
