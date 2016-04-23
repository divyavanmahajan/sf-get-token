# sf-get-token - Retrieve REST Access token for Salesforce

To test the Salesforce REST API, you need an access token. However it is not easy to get an access token, so I've created a simple utility to get this token.
This displays the access token and a sample shell command that you can use for testing the REST API with curl.

### Installation
```
$ npm install -g sf-get-token
```
### Using sf-get-token
```
$ sf-get-token
Salesforce user: me@rts.com
Password with security token:abcdjdjd
Access Token:
  00D30000001HJhu!AQ4AQANmid1HmydWO7vGnO0HgMKBr_NekVAnToG1id5Wr7AG3Kz3ebYNgrKaiO1.gwc48U7xomKVPQ1vAJGRZqFV87VZkhsO
export ACCESS_TOKEN='00D30000001HJhu!AQ4AQANmid1HmydWO7vGnO0HgMKBr_NekVAnToG1id5Wr7AG3Kz3eGENgrKaiO1.gwc48U7xomKVPQ1vAJTFZqFV87VZkhsO'
export ACCESS_HEADER="Authorization: Bearer $ACCESS_TOKEN"
curl https://na9.salesforce.com/services/data/v35.0/sobjects -H "$ACCESS_HEADER" -H "X-PrettyPrint:1"
```
### Use environment variables rather than typing the user and password.
If you have set the environment variables `SF_USER` and `SF_PASSWD_WITH_TOKEN`; just hit enter and it will use those values.

### Generate a test shell script
If you redirect the output to a file, it will save the example curl commands to that file. You can edit this file to test the Salesforce REST APIs.
```
$ sf-get-token > test.sh
Salesforce user: 
  Using environment variable SF_USER
Password with security token:
  Using environment variable SF_PASSWD_WITH_TOKEN
Access Token:
  00D30000001HJhu!AQ4AQANmid1HmydWO7vGnO0HgMKBr_NekVAnToG1id5Wr7AG3Kz3ebYNgrKaiO1.gwc48U7xomKVPQ1vAJGRZqFV87VZkhsO
```

