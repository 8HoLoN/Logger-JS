# Logger-JS
A library to manage logs in JavaScript app

## Use
* Turn on the silent mode to preserve the browser console.

>```javascript
var appLogger = new Logger({silentMode:true});    // mute the browser console
>```
>```javascript
appLogger.log("log 1","notice");
appLogger.log("log 2","error");
appLogger.log("光","warning");
>```
>```javascript
appLogger.save({                                  // save the logs between the specified dates in a file
  after:new Date()-4000,                          // argument could be Date, timestamp or IS0 8601 string
  before:new Date()-1000
});
appLogger.save({                                  // save the logs between the specified level in a file
  lowestLevel:"notice",
  highestLevel:"warning"
});
