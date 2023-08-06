import { message, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

const showMessageError = (content: string = 'Có lỗi xảy ra') => {
    return message.error(content);
}

const showMessageSuccess = (content: string = 'Xử lý thành công') => {
    return message.success(content);
}

const showNotificationError = (error: any) => {
    return notification.error({
        message: "Có lỗi xảy ra",
        description: error?.message ?? "Lỗi trong quá trình xử lý, vui lòng thử lại!",
        placement: "bottomRight",
    });
}

const showNotificationSuccess = (message: string = 'Thông báo', description: string = 'Xử lý thành công', placement = 'bottomRight') => {
    return notification.success({
        message,
        description,
        placement: placement as NotificationPlacement,
    });
}

export {
    showMessageError,
    showMessageSuccess,
    showNotificationError,
    showNotificationSuccess
}