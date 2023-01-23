import React, { useState } from "react";
import styles from "../../styles/NewPostModal.module.css";

type Props = {
  close: (e: any) => void;
  children: React.ReactNode;
};

const PostDetailsModal: React.FC<Props> = props => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = (e:any) => {
    if (e.target === e.currentTarget) {
      setIsMouseDown(true);
    }
  };

  const onMouseUp = (e:any) => {
    if (isMouseDown) {
      props.close(e);
    }
    setIsMouseDown(false);
  };

  return (
      <div
        className={styles.modal}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div>
          {React.cloneElement(props.children as any, {
            close: props.close
          })}
        </div>
      </div>
  );
};

export default PostDetailsModal;
