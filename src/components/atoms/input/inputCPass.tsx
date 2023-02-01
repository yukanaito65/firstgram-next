import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./inputCPass.module.css";


function InputCPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="flex my-3">
<div className="text-xs text-red-500 my-auto">＊</div>
    <div className="w-full relative">
      <input
        className="border border-gray-300 rounded w-full h-16 pl-2  bg-gray-100"
        type={isRevealConfirmPassword ? "text" : "password"}
        name="Cpassword"
        placeholder="確認用パスワード"
        data-equal-to="email"
        pattern={props.passwordValue}
        required
        value={props.value}
        onChange={props.onChange}
      />
        <span className={`${styles.error_message} ${styles.messageBox}`}>
        パスワードが一致しません
      </span>
      </div>
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className={styles.isRevealPasswordIcon}
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>

    </div>
  );
}

export default InputCPass;
