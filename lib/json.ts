import { Post } from "../types/types"

export async function getAllJsonPostIds() {
    return fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        return data.map((posts: Post ) => {
          return {
            params: {
              id: posts.postId.toString()
            }
          }
        })
      })
  }
  
export async function getJsonPostData(postId: string) {
return fetch(`http://localhost:3000/posts/${postId}`).then((res) => res.json()).then((data) => {
    console.log(data);
    return data;
})
}
