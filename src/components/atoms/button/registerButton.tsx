import Link from "next/link";
import React from "react";

// interface Props {
//   onClick: any;
// }

function RegisterButton(
  // props: Props
  ) {
  return (
  <div className="ml-3"
  >
  <Link href="/myPage"><button
  className="bg-blue-400 w-full  text-white font-bold rounded mt-4 mb-8 h-8 "
  // onClick={props.onClick}
  >登録</button></Link>
</div>
)}

export default RegisterButton;
