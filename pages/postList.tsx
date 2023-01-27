import React from 'react'
import useSWR from "swr";

interface Props {
userId:any
  }

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
function PostList(props:Props) {

    const { data: posts, error } = useSWR(`/api/userPostData?user_id=${props.userId}`, fetcher);
    if (error) {
      return <p>error!</p>;
    }
    if (!posts) {
      <p>loading</p>;
    }

  return (
    <div className="flex display flex-wrap gap-x-3">
    {posts.post_img.map((img:string)=>{
      <img
      src="img"
      alt="img"
      width={120}
      height={120}
      className="w-[calc(100%_-_6px /3)] aspect-square"
    />
    })}
    </div>
  )
}

export default PostList
