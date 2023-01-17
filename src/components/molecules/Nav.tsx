import LogoutBtn from "../atoms/LogoutBtn";
import SettingBtn from "../atoms/SettingBtn";
import KeepBtn from "../atoms/KeepBtn";
import styles from "./nav.module.css";

function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_ul}>
        <li className={styles.nav_li}>
        <SettingBtn />
        </li>
        <li className={styles.nav_li}>
        <KeepBtn />
        </li>
        <li className={styles.nav_li}>
          <LogoutBtn />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
