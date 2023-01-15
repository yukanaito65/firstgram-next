import React from "react";

function InputRegister(props: any) {
  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default InputRegister;
