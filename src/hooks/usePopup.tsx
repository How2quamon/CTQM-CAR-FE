import { Modal, ModalProps } from "antd";
import React from "react";
import { useState } from "react";

interface PopupProps extends ModalProps {
  size?: "sm" | "md" | "lg" | "xl";
  content?: React.ReactNode | string;
}

export default function usePopup() {
  const [open, setOpen] = useState<boolean>(false);

  const show = () => {
    setOpen(true);
  };

  const hidden = () => {
    setOpen(false);
  };

  const popupComponent = (props?: PopupProps) => {
    const config: PopupProps = {
      ...props,
      centered: true,
      width:
        props?.size === "sm"
          ? 640
          : props?.size === "md"
          ? 768
          : props?.size === "lg"
          ? 1024
          : props?.size === "xl"
          ? 1280
          : 640,
    };
    return (
      <Modal {...config} open={open}>
        {props?.content}
      </Modal>
    );
  };

  return {
    show,
    hidden,
    popupComponent,
  };
}
