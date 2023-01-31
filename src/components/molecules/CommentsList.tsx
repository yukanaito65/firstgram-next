import React from "react";
import useSWR, { useSWRConfig } from "swr";
import type { Comment } from "../../../types/types";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function CommentsList(props:any) {
  // コメントデータ取得
  const {
    data: commentsData,
    error: commentsDataError,
    isLoading: commentsDataIsLoading,
  } = useSWR(`api/getCommentsDataQuery?post_id=${props.postId}`, fetcher);
  if (commentsDataIsLoading) return <div>loading...</div>;
  if (commentsDataError) return <div>failed to load</div>;
  console.log(commentsData);
  return (
    <div>
      {commentsData &&
        commentsData.map((comment: Comment, index: number) => {
          return (
            <div key={"index"} className="flex py-1 mb-2.5">
              <p className="mr-1 font-semibold">{comment.user_name}</p>
              <p>{comment.comment}</p>
            </div>
          );
        })}
    </div>
  );
}

export default CommentsList;
