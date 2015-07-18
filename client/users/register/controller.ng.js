angular.module("boxify").controller("RegisterController",
  function($scope, $rootScope, $meteor, $state){
    window.meteor = $meteor;
    window.vm = this;
    var vm = this;

    vm.boxes = $meteor.collection(Boxes).subscribe('boxes');
    $scope.$meteorSubscribe('boxes');

    vm.credentials = {
      email: '',
      password: '',
      passwordConfirm: ''
    };

    vm.newBox = {
      owner: {},
      name: ''
    }

    vm.error = '';

    function saveBox(data){
      vm.newBox.owner = $rootScope.currentUser._id;
      var promise = vm.boxes.save(vm.newBox);

      promise.then(function(){
        $state.go('root.dashboard');
      }, handleError);

      return promise;
    }

    function handleError(error){
      vm.error = error.reason;
    }

    function validate(){
      var fn = Array.prototype.shift.apply(arguments);
      var args = arguments;
      var result = fn.apply(this, args);
      if (result && result.error) {
        vm.error = result.reason;
        return false;
      } else {
        return true;
      }
    }

    vm.register = function (){
      if(validate(isNotEmpty, vm.credentials.email),
         validate(isNotEmpty, vm.credentials.password),
         validate(isNotEmpty, vm.newBox.name),
         validate(isEmail, vm.credentials.email),
         validate(areValidPasswords, vm.credentials.password, vm.credentials.passwordConfirm)) {

        $meteor.createUser(vm.credentials).then(saveBox, handleError);
      }
    };
  });