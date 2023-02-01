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
    <div className="w-full my-3">
      <input
        className="border border-gray-300 rounded w-full h-16 pl-2 bg-gray-100"
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
