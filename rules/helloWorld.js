function helloWorld(user, context, callback) {
  console.log('hello,', configuration.NAME);
  user.foo = "bar";
  context.baz = "hello";
  callback(null, user, context);
}