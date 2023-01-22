import React, { useState } from "react";
import styles from "../../../../pages/passwordChange.module.css";

interface Props {
  data: any;
  title: string;
  name: string;
  pattern: string;
  errorMessage: string;
}

function UpdateInput(props: Props) {
  const [inputValue, setInputValue] = useState(props.data);

  const onChangeValue = (event: { target: HTMLInputElement }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex items-center gap-8">
      <label htmlFor={props.name} className="font-bold w-28 text-right">
        {props.title}
      </label>
      <div className="w-7/12">
        <input
          type="text"
          name={props.name}
          value={inputValue}
          onChange={onChangeValue}
          className="h-8 border-gray-300 border-solid border rounded w-full"
          pattern={props.pattern}
        />
        <span className={`${styles.error_message} ${styles.messageBox}`}>
          正しい形式で入力してください
          <br />({props.errorMessage})
        </span>
      </div>
    </div>
  );
}

export default UpdateInput;
