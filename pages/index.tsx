import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { NextPage } from 'next'
import { clientRequestInstance } from "../modules/request"
import useSWR from "swr";
import { features } from 'process'
import Link from 'next/link'
import Header from '../src/components/organisms/header'
import { getAuth } from '@firebase/auth'

interface Message {
  messageId:string;
  message:string;
  timestamp: Date;
  userId: string;
  withUserId: string;
}

const fetcher =(resource:string)=> fetch(resource).then((res)=>res.json());

const Page: NextPage = () => {
  // const { data:messages, error } = useSWR("/api/data", fetcher);
  // "INSERTINTO Message(messageId, message,timestamp,userId,withUserId) VALUES(abcdefg456,おはよう,2022-12-22T03:20:30.000Z,ijklmn22,abcdeffff)"
 // /const { data: comments } = useSWR("/api/getCommentsData?postId=mhbukjdi84ndhsu8eijt", fetcher);
 const { data: comments } = useSWR(() => '/api/getCommentsData?postId=mhbukjdi84ndhsu8eijt', fetcher)
 console.log(comments)

  const auth = getAuth()
  const currentUserId = auth.currentUser?.uid;
  console.log(currentUserId)
  return (
    <>
    <Head>
      <title>secondgram</title>
    </Head>
    <Header />
    <p>トップ</p>

    {/* <>
      <div className="postlook">
        {postData.length === 0 ? (
          <>

            <div className="lead_article"
            >
                <p className="lead_center"
                >投稿がありません</p>
              <div className="lead_center"
              >
                <Link href="/SearchPage">
                  <button className="btn">検索してみよう！</button>
                </Link>
              </div>
</div>
          </>
        ) : (
          <>
            <div>
              {postData.map((data: Post, index: string) => {
                const favos = [...data.favorites];
                const com = [...data.comments];
                return (
                  <>
                    <div key={index}>
                      <div
                        className="postlook__iconusername"
                      >
                        <div className="postlook__postIcon">
                          <Link
                            href={data.userId === userId ? "/mypage" : "/profile"}
                            state={{ userId: data.userId }}
                          >
                            <PostIcon icon={data.icon} />
                          </Link>
                        </div>

                        <p
                          className="postlook__username"
                        >
                          <Link
                            href={data.userId === userId ? "/mypage" : "/profile"}
                            state={{ userId: data.userId }}
                          >
                            {data.userName}
                          </Link>
                        </p>
                      </div>

                      <Link
                        href="/PostDetails"
                        state={{ postid: data.postId, userid: data.userId }}
                      >
                        <img src={data.imageUrl} />
                      </Link>

                      <div className="postlook__favocomkeep"
                      >
                        <div
                          className="postlook__favo"
                        >
                          {data.favorites.includes(loginUserName) ? (
                            <AiFillHeart
                            className="postlook__favBtn"
                              size={30}
                              color={"red"}
                              onClick={(e: React.MouseEvent) => {
                                updateDoc(
                                  doc(collection(db, "post"), data.postId),
                                  {
                                    favorites: arrayRemove(loginUserName),
                                  }
                                );
                                setFavbtn(favbtn + 1);
                              }}
                            />
                          ) : (
                            <AiOutlineHeart
                            className="postlook__favBtn"
                              size={30}
                              color={"black"}
                              onClick={(e: React.MouseEvent) => {
                                updateDoc(
                                  doc(collection(db, "post"), data.postId),
                                  {
                                    favorites: arrayUnion(loginUserName),
                                  }
                                );
                                setFavbtn(favbtn + 1);
                              }}
                            />
                          )}
                        </div>

                        <div
                          className="postlook__com"
                        >
                          <AiOutlineMessage
                          className="postlook__commentBtn"
                            size={30}
                            color={"black"}
                            onClick={CommentDisplay}
                          />
                        </div>

                        <div
                          className="postlook__keep"
                        >
                          <KeepButton
                            loginUserKeep={loginUserKeep}
                            data={data.postId}
                          />
                        </div>
                      </div>

                      <div
                        className="postlook__favolengthtime"
                      >
                        <FavoLength favos={favos} />
                        <Time data={data.postDate} />
                      </div>

                      <Caption data={data.caption} />

                      <div>
                        {commentDisplay ? (
                          <>
                            <CommentsDisplay displayComment={com} />

                            <div
                              className="postlook__comdisplay"
                            >
                              <div
                                className="postlook__cominput"
                              >
                                <input
                                  className="postlook__input"
                                  type="text"
                                  value={inputComment}
                                  onChange={(e) => {
                                    setInputComment(e.target.value);
                                  }}
                                />
                              </div>

                              <div
                                className="postlook__btn"
                              >
                                <button
                                  className="btn"
                                  onClick={async (e: React.MouseEvent) => {
                                    // 押された投稿のcommentにinputCommentを配列で追加
                                    updateDoc(
                                      doc(collection(db, "post"), data.postId),
                                      {
                                        comments: arrayUnion({
                                          userName: loginUserName,
                                          commentText: inputComment,
                                        }),
                                      }
                                    );
                                    setFavbtn(favbtn + 1);
                                    setInputComment("");
                                  }}
                                >
                                  投稿する
                                </button>
                              </div>
                              <AiOutlineClose
                                className="postlook__closebtn"
                                size={15}
                                color={"rgb(38, 38, 38)"}
                                onClick={CommentBack}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </> */}
    </>
  )
}

export default Page
