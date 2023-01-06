import { useState } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  passChange: any;
  valuePassword: string;
}

function InputPass(props: Props) {
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="passForm">
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="password"
        value={props.valuePassword}
        placeholder="パスワード"
        className="form-input"
        onChange={props.passChange}
        required
      />
      {/* <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="passForm__isRevealPasswordIcon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span> */}
    </div>
  );
}

export default InputPass;
