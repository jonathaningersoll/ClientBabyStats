let APIURL = '';

switch (window.location.hostname){
     case 'localhost' || '127.0.0.1':
          APIURL = 'http://localhost:3000';
          break;
     case'https://jdi-babystatsclient.herokuapp.com/':
          APIURL = 'https://jdi-babystats.herokuapp.com'
          break;
     default:
          APIURL = 'https://jdi-babystats.herokuapp.com'
          break;
}

export default APIURL;