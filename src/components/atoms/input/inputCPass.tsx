import React, { useState } from "react";


function InputCPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="flex">
<div className="text-xs text-red-500 my-auto">＊</div>
      <input
        className="border border-gray-300 rounded w-full h-8 pl-2"
        type={isRevealConfirmPassword ? "text" : "password"}
        name="Cpassword"
        placeholder="確認用パスワード"
        data-equal-to="email"
        pattern={props.passwordValue}
        required
        value={props.value}
        onChange={props.onChange}
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
      >
        {isRevealConfirmPassword ? <span>●</span> : <span>×</span>}
      </span>
      {/* <span>
        パスワードが一致しません
      </span> */}
    </div>
  );
}

export default InputCPass;
