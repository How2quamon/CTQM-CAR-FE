import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Modal, ModalFuncProps } from "antd";

interface ModalProps extends ModalFuncProps { }

const closeButtonIcon = <CloseOutlined rev={undefined} />;
const okButtonIcon = <CheckOutlined rev={undefined} />;

export default function useModal() {
  const confirm = (props?: ModalProps) => {
    Modal.confirm({
      ...props,
      cancelButtonProps: props?.cancelButtonProps ?? { icon: closeButtonIcon },
      okButtonProps: props?.okButtonProps ?? { icon: okButtonIcon },
      title: props?.title ?? "Xác nhận!",
      content: props?.content ?? "Bạn muốn thực hiện hành động này?",
      centered: true,
    });
  };

  const warning = (props?: ModalProps) => {
    Modal.warning({
      ...props,
      cancelButtonProps: props?.cancelButtonProps ?? { icon: closeButtonIcon },
      okButtonProps: props?.okButtonProps ?? { icon: okButtonIcon },
      title: props?.title ?? "Cảnh báo!",
      content: props?.content ?? "Hành động này có thể nguy hiểm",
      centered: true,
    });
  };

  const info = (props?: ModalProps) => {
    Modal.info({
      ...props,
      cancelButtonProps: props?.cancelButtonProps ?? { icon: closeButtonIcon },
      okButtonProps: props?.okButtonProps ?? { icon: okButtonIcon },
      title: props?.title ?? "Thông tin!",
      content: props?.content ?? "Hành động đang được xử lý vui lòng chờ trong giây lát!",
      centered: true,
    });
  };

  const error = (props?: ModalProps) => {
    Modal.error({
      ...props,
      cancelButtonProps: props?.cancelButtonProps ?? { icon: closeButtonIcon },
      okButtonProps: props?.okButtonProps ?? { icon: okButtonIcon },
      title: props?.title ?? "Xảy ra lỗi!",
      content: props?.content ?? "Quá trình xử lý gặp lỗi, Vui lòng quay lại sau!",
      centered: true,
    });
  };

  return {
    confirm,
    warning,
    info,
    error,
  };
}
