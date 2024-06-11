import moment from 'moment';
export const formatDateTime = (time) => {
    return moment(time).format("DD/MM/YYYY HH:mm:ss")
}

export const formatDate = (time) => {
    return moment(time).format("DD/MM/YYYY")
}

export const formatTime = (time) => {
    return moment(time).format("HH:mm:ss")
}