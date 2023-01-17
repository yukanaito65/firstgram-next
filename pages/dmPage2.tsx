import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';


function DmPage2() {
  const [anotherIcon, setAnotherIcon] = useState<string>("");
  const [anotherName, setAnotherName] = useState<string>("");
  const [anotherUserName, setAnotherUserName] = useState<string>("");
  const [anotherUserId, setAnotherUserId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [MesseDisplay, setMesseDisplay] = useState<{ userId: string; message: string; timestamp: Date; icon: string }[]>([]);


  const router = useRouter();
  // const { userId } = router.state as State;


  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        <></>
      } else {
        // ログインユーザーのid取得
        setCurrentUser(user.uid);
      }
    })
  },[]);

  return (
    <div>dmPage2</div>
  )
}

export default DmPage2
