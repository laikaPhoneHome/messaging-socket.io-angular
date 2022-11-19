const date = new Date;
const timeStamp = [
    date.getHours(),
    ,':',
    date.getMinutes(),
    ,' ',
    date.getHours > 12
    ? 'am'
    : 'pm'
].join('');

exports.formatMessage = (({message, username}) => {
    return({
        message: message,
        username: username,
        my: false,
        liked: false,
        bot: false,
        time: timeStamp,
    })
})