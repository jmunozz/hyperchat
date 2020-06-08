const moment = require('moment');

export function displayDate(date) {
    return moment(date).fromNow();
}