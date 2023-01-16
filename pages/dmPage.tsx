import Image from "next/image";
import React, { FormEvent, useState } from "react";

function DmPage() {
  const [message,setMessage] = useState<string>("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    console.log({ message })
    e.preventDefault()
  }
  return (
    <div className="border border-solid border-neutral-300">
      <div className="flex">
        <Image src="" alt="icon" width={50} height={50} />
        <p>usernameさん</p>{/*相手のusername*/}
      </div>

      <hr className="border border-solid border-neutral-300 " />

      <div>

      </div>
      <form onSubmit={handleSendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="メッセージ..."
        className="h-8 border-solid border border-gray-300 rounded-2xl w-7/12"
        />
        <button type='submit'>送信</button>
      </form>
    </div>
  );
}

export default DmPage;
