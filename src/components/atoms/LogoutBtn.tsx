import { useRouter } from "next/router";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import styles from "../molecules/nav.module.css";

function LogoutBtn() {
    const router = useRouter();

  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    router.push("/login/");
  };
  return (
    <button onClick={logout} className={styles.nav_li_logout}>ログアウト</button>
    )
}
export default LogoutBtn
