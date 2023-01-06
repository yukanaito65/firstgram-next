import useSWR from 'swr';

export type Posts = {
    postId: string;
    userId: string;
    imageUrl:string[];
    caption: string;
    timestamp: Date;
    favorites: string[];
    keeps: string[];
}

const fetcher =(resource:string)=> fetch(resource).then((res)=>res.json());
  
export default function PostDetails() {
        const { data:posts, error } = useSWR("/api/posts", fetcher);
        if(error){
          return <p>error!</p>
        }
        if(!posts) {
          return <p>loading...</p>
        }
        console.log("posts",posts)
        console.log(posts[0].userId)
        return (
           <>
           <h1 className='w-24 m-4 p-4'>投稿詳細</h1>
           <p className='w-24 m-4 p-4'>画像</p>
           <p>ユーザーアイコン</p>
           <p>{posts[0].userId}</p>
           <p>・</p>

           <button>フォロー中</button>
           <button>３点アイコン</button>
           <hr />
           <p>ユーザーアイコン</p>
           <p>{posts[0].userId}</p>
           <p>{posts[0].caption}</p>
           <hr />
           <button>♡</button>
           <button>コメントアイコン</button>
           <button>DMアイコン</button>
           <button>保存アイコン</button>
           <p>{posts[0].timestamp}</p>
           <hr />
            <input id='name' placeholder='コメントを入力' />
            <button>投稿する</button>
           </>
        )
}
