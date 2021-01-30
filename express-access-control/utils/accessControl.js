const AccessControl = require("accesscontrol");

const AC = new AccessControl();

AC.grant('user')        // define new or modify existing role. also takes an array.
    .createOwn('video') // equivalent to .createOwn('video', ['*'])
    .deleteOwn('video')
    .readAny('video')
  .grant('admin')                   // switch to another role without breaking the chain
    .extend('user')                 // inherit role capabilities. also takes an array
    .updateAny('video', ['title'])  // explicitly defined attributes
    .deleteAny('video')
  .grant('guest')                 // guest user
    .readAny('video')  			// read only videos


module.exports = AC;