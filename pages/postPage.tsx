import { useState } from "react";
import PostDetails from "./PostDetails";
import { useModal } from "react-hooks-use-modal";
import { Modal } from "flowbite";
import Header from "../src/components/organisms/header";
import NewPostModal from "../src/components/molecules/NewPostModal";
import PostDetailsModal from "../src/components/molecules/PostDetailsModal";

export default function MypagePost() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [Modal, open, close, isOpen] = useModal("__next", {
  //   preventScroll: false,
  // });

  // useMOdal使用
  // return (
  //   <>
  //     <p>Modal is Open? {isOpen ? "Yes" : "No"}</p>
  //     <button onClick={open}>Post1</button>
  //     {console.log(isOpen)}
  //     <Modal>
  //       <p>opnen now</p>
  //       <PostDetails props={close} />
  //     </Modal>
  //   </>
  // );

  // モーダルの管理
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (typeof document === 'object'){
    const body: HTMLBodyElement | null = document.querySelector('body')
    if (body && isOpenModal) {
        body.style.overflow = 'hidden'
    }}

  // const openModal = (e:any) => {
  //   if (isOpenModal === false) {
  //     setIsOpenModal(true);
  //   }
  // };

  // const closeModal = (e:any) => {
  //   if(isOpenModal === true) {
  //     setIsOpenModal(false);
  //   }
  // }

  const toggleModal = (e:any) => {
    if (e.target === e.currentTarget) {
      setIsOpenModal(!isOpenModal);
    }
  };

  return(
    <>
    <Header />
    <div>

    <button type="button" onClick={toggleModal} className="w-full">
    Post1
  </button>

  {isOpenModal && (
    <PostDetailsModal close={toggleModal}>
      <PostDetails post_id={22} close={toggleModal} />
      </PostDetailsModal>
  )}
  </div>
  </>
  )

  // Tailwindcssのmodalコンポーネント
}
