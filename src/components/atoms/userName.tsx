import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import useSWR, { useSWRConfig } from "swr";
import { auth } from '../../../firebase';

interface Props {
uid:string
  }


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function UserName(props: Props) {
    const [userId,setUserId] = useState("");
    const [name,setName] = useState("");

    // useEffect(() => {
    // onAuthStateChanged(auth, async (currentUser: any) => {
    //     if (!currentUser) {
    //       <></>;
    //     } else {
    //       setUserId(currentUser.uid)
    //     }
    //   });
    // }, []);

    setUserId(props.uid)
  
    const { data: users, error } = useSWR(`/api/test?user_id=${userId}`, fetcher);
    if (error) {
      return <p>error!</p>;
    }
    if (!users) {
      <p>loading</p>;
    }

    setName(users[0].user_name)

  return (
    <div>{name}</div>
  )
}

export default UserName
