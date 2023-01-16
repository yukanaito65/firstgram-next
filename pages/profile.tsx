import React from 'react'
import Image from 'next/image';

function profile() {
  return (

        
        <div className="flex pt-7 mx-auto w-max ">
            

            <div className="border-border-rounded-fullmt-7 pt-3">
               <Image src="/noIcon.png" alt="アイコン" width={145} height={145} className=" border border-gray-300 bg-gray-300 rounded-full "/>
            </div>

            <div className="pl-16 py-5 flex flex-col max-h-145 justify-between">

            <div className="flex">
            <div className="h-8 pt-1 text-xl">ringo_yasuo</div>
            <button className="
            border border-gray-100  rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-gray-100
            ">フォロー中</button>
            <button className="
            border border-gray-100  rounded  ml-2 h-8 px-3 py-1 text-sm font-bold bg-gray-100
            ">メッセージを送信</button>
            </div>
          

            <div className="flex">
            <div>投稿{2}件</div>
            <div className="ml-9">フォロー{2}人</div>
            <div className="ml-9">フォロワー{2}人</div>
            </div>

            <div className="font-bold">えみり</div>
            <div>Tokyo 1996</div>

            </div>
         
    </div>
  )
}

export default profile
