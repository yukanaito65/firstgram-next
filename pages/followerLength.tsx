import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import  useSWR  from 'swr';

interface Props{
  id:any
}

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function FollowerLength(props:Props) {
      // propsでuseridを指定するようにする（stateでprofileのuidを渡せるようにする）
    const { data: follows, error:error, isLoading:isLoading } = useSWR(`/api/myPageFollower?user_id=${props.id}`, fetcher);
    if (error) {
      return <p>フォロワー0人</p>;
    }
    if (!follows) {
      return <p>0</p>;
    }
    if(isLoading ){
      return <p>loading</p>
    }

    console.log(follows)
const follower =follows.map((id:any)=>{return(id.follower_user_id)})
console.log(follower)

  return (
    <>
    <div>フォロワー{follower.length}人</div>
  </>
  )
}



export default FollowerLength
