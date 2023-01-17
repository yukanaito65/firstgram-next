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
    <div className="w-full mt-1">
      <input
        className="border border-gray-300 rounded w-full h-8 pl-2"
        type={isRevealConfirmPassword ? "text" : "password"}
        name="password"
        value={props.valuePassword}
        placeholder="パスワード"
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
