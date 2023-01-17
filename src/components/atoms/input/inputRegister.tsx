import React from "react";

function InputRegister(props: any) {
  return (
    <div className="ml-3">
      <input
              className="border border-gray-300 rounded w-full h-8 pl-2 "
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default InputRegister;
