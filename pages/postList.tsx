import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import { auth } from '../firebase';

interface Props {
userId:any
  }

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function PostList(
  props:Props
  ) {
          //ログインしているとログイン情報を持つ
          const [user, setUser] = useState<any>("");
        
    const { data: posts, error } = useSWR(`/api/userPostData?user_id=${props.userId}`, fetcher);
    if (error) {
      return <p>error!</p>;
    }
    if (!posts) {
      return <p>loading</p>;
    }

    console.log(posts)

    // const postImagArray = posts.map((postImg:any)=>{postImg.post_img})
    // console.log(postImagArray)
  
    // w-[calc((100%_-_6px) / 3)]
    // aspect-square
    // gap-x-3
  return (
    <div className="flex display flex-wrap "
    >
    {posts.map((data:any)=>{
      return(
        <div style={{width:"calc((100% - 20px) / 3)" , aspectRatio: "1/1"}}>

      <img
      src={data.post_img}
      alt="img"
      // width={120}
      // height={120}
      // className="
      // w-[calc((100%_-_6px) / 3)] 
      // aspect-square"
      className='w-full h-full object-cover p-2'
    />
        </div>
      )

    })}
    </div>
  )
}

export default PostList
