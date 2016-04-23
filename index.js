const readline = require('readline');
const jsforce = require('jsforce');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr,
  historySize: 30
});
var spaces=new RegExp(/\s/g);
function question(prompt,variable) {
  return new Promise(function (fulfill, reject){
    rl.question(prompt,(answer)=> {
      var nospaces = answer.replace(spaces,"");
      if (nospaces.length==0) {
         answer=process.env[variable];
         console.error('  Using environment variable '+variable);
      }
      fulfill(answer);
    });
  });
}


exports.login = function() {
  var user;
  var password;
  var conn=new jsforce.Connection();
  question('Salesforce user: ',"SF_USER")
  .then( (_answer) => {
    user = _answer;
    return question('Password with security token:',"SF_PASSWD_WITH_TOKEN");
  }) 
  .then( (_answer) => {
    rl.close();
    password = _answer;
    if (user && password)
    {
      return conn.login(user,password);
    } else {
      throw("No user or password provided. Environment variables SF_USER and SF_PASSWD_WITH_TOKEN are not defined.");
    }
  }).then(function () {
    return conn.identity();
  }).then(function (id) {
    console.error('Access Token:\n  '+conn.accessToken);
    console.log("export ACCESS_TOKEN='"+conn.accessToken+"'");
    console.log("export ACCESS_HEADER=\"Authorization: Bearer $ACCESS_TOKEN\""); 
    var url=id.urls.rest.replace(/\{version\}/g,"35.0");
    console.log('curl '+url+'sobjects -H "$ACCESS_HEADER" -H "X-PrettyPrint:1"');
  }, function (err) {
     console.error(err);
  });
};
