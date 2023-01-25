import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./updateInput.module.css";

interface Props {
  data: any;
  title: string;
  name: string;
  pattern: string;
  message: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function UpdateInput(props: Props) {
  const [inputValue, setInputValue] = useState(props.data);

  const onChangeValue = (event: { target: HTMLInputElement }) => {
    setInputValue(event.target.value);
  };

  props.setValue(inputValue);

  console.log(props.setValue);

  return (
    <div className="flex items-start gap-12 h-40">
      <label htmlFor={props.name} className="font-bold w-48 text-right">
        {props.title}
      </label>
      <div className="w-7/12">
        <div className="w-full">
          <input
            type="text"
            name={props.name}
            id={props.name}
            value={inputValue}
            onChange={onChangeValue}
            className={`${styles.input} h-12 border-gray-300 border-solid border rounded w-full text-xl`}
            pattern={props.pattern}
          />
          <span className={`${styles.error_message} ${styles.messageBox}`}>
            正しい形式で入力してください
          </span>
        </div>
        <p className="text-lg text-gray-400 my-5">{props.message}</p>
      </div>
    </div>
  );
}

export default UpdateInput;
