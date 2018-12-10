// Jan 1st 1970 00:00:00 am
let moment = require('moment');
// let date = new Date();
// let months = ['Jan','Feb'];
// console.log(date.getMonth());

let date = moment();
console.log(date);
console.log(date.format('MMM Do YYYY H:M a'));

let someTimestamp = moment().valueOf();
console.log(someTimestamp);