import React, { useState } from "react";


function InputCPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div>
      <span>＊</span>
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="Cpassword"
        placeholder="確認用パスワード"
        data-equal-to="email"
        pattern={props.passwordValue}
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
      >
        {isRevealConfirmPassword ? <span>●</span> : <span>×</span>}
      </span>
      <span>
        パスワードが一致しません
      </span>
    </div>
  );
}

export default InputCPass;
