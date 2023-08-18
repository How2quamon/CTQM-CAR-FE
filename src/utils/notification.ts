import { message, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

const showMessageError = (content: string = 'An error occurred') => {
    return message.error(content);
}

const showMessageSuccess = (content: string = 'Successful Processing') => {
    return message.success(content);
}

const showNotificationError = (error: any) => {
    return notification.error({
        message: "An error occurred",
        description: error?.message ?? "Error in processing, please try again!",
        placement: "bottomRight",
    });
}

const showNotificationSuccess = (message: string = 'Notification', description: string = 'Successful Processing', placement = 'bottomRight') => {
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