import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import  useSWR  from 'swr';
import { auth } from '../firebase';

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function FollowLength() {

    //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");
  //ログイン判定が終わるまでリダイレクトさせないようにする(ログイン判定するには時間がかかるから、ページ遷移を先にされてしまうと表示がおかしくなってしまう)
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser: any) => {
          if (!currentUser) {
            <></>;
          } else {
            setUser(currentUser);
            //ログイン判定が終わったタイミングでloadingはfalseに変わる
            setLoading(false);
          }
        }); 
      }, []);

      console.log(user.uid)

      // propsでuseridを指定するようにする（stateでprofileのuidを渡せるようにする）
    const { data: follows, error:error, isLoading:isLoading } = useSWR(`/api/myPageFollow?user_id=${user.uid}`, fetcher);
    if (error) {
      return <p>エラー</p>;
    }
    if (!follows) {
      return <p>0</p>;
    }
    if(isLoading ){
      return <p>loading</p>
    }

    console.log(follows)
  return (
    <>
{!loading ? (
    <div>フォロー中{follows.length}人</div>
  ):(
<></>
  )}
  </>
  )
}

export default FollowLength
