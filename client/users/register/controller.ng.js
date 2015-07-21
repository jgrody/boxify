angular.module("boxify").controller("RegisterController",
  function($scope, $rootScope, $meteor, $state, $stateParams, $timeout){
    window.meteor = $meteor;
    window.rs = $rootScope;
    var rc = this;

    rc.boxes = $meteor.collection(Boxes).subscribe('boxes');

    rc.credentials = { email: '', password: '', passwordConfirm: '' };
    rc.newBox = { ownerId: {}, name: '' }
    rc.error = '';

    function saveBox(data){
      return $timeout(function(){
        rc.newBox.ownerId = $rootScope.currentUser._id;
        var promise = rc.boxes.save(rc.newBox);

        promise.then(function(){
          $state.go('root.dashboard.members');
        }, handleError);

        return promise;
      })
    }

    function handleError(error){
      rc.error = error.reason;
    }

    function validate(){
      var fn = Array.prototype.shift.apply(arguments);
      var args = arguments;
      var result = fn.apply(this, args);
      if (result && result.error) {
        rc.error = result.reason;
        return false;
      } else {
        return true;
      }
    }

    rc.register = function (){
      if(validate(isNotEmpty, rc.credentials.email),
         validate(isNotEmpty, rc.credentials.password),
         validate(isNotEmpty, rc.newBox.name),
         validate(isEmail, rc.credentials.email),
         validate(areValidPasswords, rc.credentials.password, rc.credentials.passwordConfirm)) {

        return $meteor.createUser(rc.credentials).then(saveBox, handleError);
      }
    };
  });