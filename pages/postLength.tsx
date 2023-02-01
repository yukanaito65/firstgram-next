import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import  useSWR  from 'swr';
import { auth } from '../firebase';

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function PostLength() {

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

      // propsでuseridを指定するようにする（stateでprofileのuidを渡せるようにする）
    const { data: posts, error:error, isLoading:isLoading } = useSWR(`/api/myPagePost?user_id=${user.uid}`, fetcher);
    if (error) {
      return <p>error!</p>;
    }
    if (!posts) {
      return <p>loading</p>;
    }
    if(isLoading ){
      return <p>loading</p>
    }

    console.log(posts)
  return (
    <>
{!loading ? (
    <div>投稿{posts.length}件</div>
  ):(
<></>
  )}
  </>
  )
}

export default PostLength
