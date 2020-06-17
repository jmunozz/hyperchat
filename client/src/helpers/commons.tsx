import moment from 'moment';

export function displayDate(date: Date) {
    return moment(date).fromNow();
}