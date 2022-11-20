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

exports.bot = '098050q8973451'

exports.formatMessage = (({message, username}) => {
    if(username !== this.bot){
        return({
            message: message,
            username: username,
            my: false,
            liked: false,
            bot: false,
            time: timeStamp,
        })
    } else {
        return({
            message: message,
            bot: false,
        })
    }
    
})