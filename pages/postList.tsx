import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import { auth } from '../firebase';

// interface Props {
// userId:any
//   }

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function PostList(
  // props:Props
  ) {
          //ログインしているとログイン情報を持つ
          const [user, setUser] = useState<any>("");
        
            // useEffect(() => {
            //     onAuthStateChanged(auth, async (currentUser: any) => {
            //       if (!currentUser) {
            //         <></>;
            //       } else {
            //         setUser(currentUser);
            //       }
            //     }); 
            //   }, []);
    const { data: posts, error } = useSWR(`/api/userPostData?user_id=K4mwMw8goAXpijHTyUPqOPOQfwH3`, fetcher);
    if (error) {
      return <p>error!</p>;
    }
    if (!posts) {
      return <p>loading</p>;
    }

    console.log(posts)

    // const postImagArray = posts.map((postImg:any)=>{postImg.post_img})
    // console.log(postImagArray)
  

  return (
    <div className="flex display flex-wrap gap-x-3">
    {posts.map((data:any)=>{
      return(
        <div>
 
      <img
      src={data.post_img}
      alt="img"
      width={120}
      height={120}
      className="
      w-[calc(100%_-_100px/ 30)] 
      aspect-square"
    />
        </div>
      )

    })}
    </div>
  )
}

export default PostList
