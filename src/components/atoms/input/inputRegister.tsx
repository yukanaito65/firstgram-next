import React from "react";

function InputRegister(props: any) {
  return (
    <div className="ml-3 my-3">
      <input
        className="border border-gray-300 rounded w-full h-16 pl-2  bg-gray-100"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default InputRegister;
