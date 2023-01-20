import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useSWR,{ useSWRConfig } from 'swr';

const fetcher = (resource:any,init:any) => fetch(resource,init).then((res) => res.json());

function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState();
  const {data, error} = useSWR(()=>`/api/userData?user_id=zH0MYM3RrZWusExUypzX5SGZHaI3`,fetcher);

   const clickButton = () => {
    router.push({
        pathname:"/dmPage",   //URL
        query: {userId :'zH0MYM3RrZWusExUypzX5SGZHaI3'} //検索クエリ
      });
  }

  if (error) {
    return <p>error!</p>;
  }
  if (!data) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <p>{data[0].name}</p>
      <button onClick={clickButton}></button>
    </div>
  )
}

export default ProfilePage
