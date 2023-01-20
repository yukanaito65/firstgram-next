import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import Header from "../src/components/organisms/header";
import useSWR from "swr";
import Link from "next/link";


const _message = '確認用メッセージです。'
const _messages = [...Array(10)].map((_, i) => _message.repeat(i + 1))


type MessageProps = {
  message: string
}

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex items-start gap-1 items-end my-4">
      <Link href="">
      <Image src="/noIcon.png" alt="icon" width={25} height={25} className="bg-gray-200 rounded-full" />
      </Link>
      <div className="rounded-full bg-gray-300"></div>
      <div>
        <p className="bg-gray-300 rounded m-0 w-96">
          {message}
        </p>
      </div>
    </div>
  )
}

function DmPage3() {
  const [message,setMessage] = useState<string>("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    console.log({ message })
    e.preventDefault()
    try{
      // データ追加する
      return fetch(`/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:message,

        }),
      }).then((res) => res.json());
      // 成功したらフォームの値をリセットする
      setMessage("")

    } catch (e) {
      console.log(e)
    }
  }

  const [chats, setChats] = useState<{message:string}[]>([]);

  const { data: messages, error } = useSWR(`/api/message`, fetcher);
  useEffect(()=>{
    try{
      // const message = String(snapshot.val()['message'] ?? '')
      const message = messages
      setChats((prev) => [...prev, { message }])
    }catch(e){
      console.log(e)
    }return
  },[])

  if (error) {
    return <p>error!</p>;
  }
  if (!messages) {
    return <p>loading...</p>;
  }
  return (
    <div className="flex">
      <Header />
    <div className="border border-solid border-neutral-300 ml-96 mr-32 my-6 w-3/4">
      <Link href="">
      <div className="flex items-center gap-3 mx-8">
        <Image src="/noIcon.png" alt="icon" width={25} height={25} className="bg-gray-200 rounded-full" />
        <p>usernameさん</p>{/*相手のusername*/}
      </div>
      </Link>

      <hr className="border border-solid border-neutral-300 " />

      <div className="flex flex-col overflow-y-auto gap-2 h-96 mx-4">
        {/* {_messages.map((message, index) => (
          <Message message={message} key={`ChatMessage_${index}`} /> */}
          {chats.map((chat, index) => (
          <Message message={chat.message} key={`ChatMessage_${index}`} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="my-4 mx-5">
      <input
        type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="メッセージ..."
        className="h-8 border-solid border border-gray-300 rounded-2xl w-11/12"
        />
        {/* w-7/12 */}
        <button type='submit' className="bg-transparent border-none text-blue-500 font-bold">送信</button>
      </form>
    </div>
    </div>
  );
}

export default DmPage3;
