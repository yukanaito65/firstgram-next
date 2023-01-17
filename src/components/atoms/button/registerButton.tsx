import React from "react";

interface Props {
  dataPush: any;
}

function RegisterButton(props: Props) {
  return (
  <div className="ml-3"
  ><button
  className="bg-blue-400 w-full  text-white font-bold rounded mt-4 mb-8 h-8 "
  onClick={props.dataPush}>登録</button>
</div>
)}

export default RegisterButton;
