function throwErr(error, reason){
  return new Meteor.Error(error, reason);
}

trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== ''){
    return true;
  }
  return throwErr('fields-empty', 'Please fill in all required fields.')
};

isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  return throwErr('invalid-email', 'Please enter a valid email address.');
};

isValidPassword = function(password) {
  if (password.length < 6) {
    return throwErr('password-too-short', 'Your password should be 6 characters or longer.');
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    return throwErr('passwords-dont-match', 'Your two passwords are not equivalent.');
  }
  return true;
};