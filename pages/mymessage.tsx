import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import useSWR,{ useSWRConfig } from 'swr';
import { auth } from '../firebase';

const fetcher = (resource:any,init:any) => fetch(resource,init).then((res) => res.json());


function Mymessage() {
  const [currentUser, setCurrentUser] = useState("");
  const [anotherUserName, setAnotherUserName] = useState("");

  const {data, error} = useSWR('/api/sendMessage',fetcher);

  console.log(data);

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async(user) => {
      if (!user) {
        <></>
      } else {
        // ログインユーザーのid取得
        setCurrentUser(user.uid);

  if (error) {
    return <p>error!</p>;
  }
  if (!data) {
    return <p>loading...</p>;
  }
  data.map((d:any)=>{
  if(d.user_id !== currentUser ){
    setAnotherUserName(d.user_name);
  }
})
}
})
},[]);
console.log(anotherUserName);
  return (
    <>
   <div>{anotherUserName}</div>
    </>
  )
}

export default Mymessage
