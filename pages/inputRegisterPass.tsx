import { useState } from "react";

function InputRegisterPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div >
      <span>＊</span>
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="password"
        value={props.valuePassword}
        placeholder="パスワード(半角英小文字、数字を含む6文字以上)"
        onChange={props.passChange}
        pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,}"
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
      >
        {isRevealConfirmPassword ? <span>○</span>: <span>×</span>}
      </span>

      <span>
        正しい形式で入力してください<br />
        (半角英小文字、数字を含む6文字以上)
      </span>
      {/* <span className="input-ok-message messageBox">OK!</span> */}
    </div>
  );
}

export default InputRegisterPass;
