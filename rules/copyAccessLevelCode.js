function copyAccessLevelCode(user, context, callback) {
    if (typeof context.idToken === 'undefined') {
        context.idToken = {};
    }
    context.idToken['http://demo.com/accessLevelCode'] = user.app_metadata.accessLevelCode;
    context.idToken.aaa = user.app_metadata.accessLevelCode;
    context.idToken['http://demo.com/isSubscriber'] = user.app_metadata.isSubscriber;
    if (typeof user.app_metadata.userJson !== 'undefined') {
        context.idToken['http://demo.com/drupal_id'] = user.app_metadata.userJson.u;
    }
    if (typeof user.app_metadata.penName !== 'undefined') {
        context.idToken['http://demo.com/penName'] = user.app_metadata.penName;
    }
    context.idToken.anotherOne = "hi there";
    console.log(JSON.stringify(context));
    callback(null, user, context);
}