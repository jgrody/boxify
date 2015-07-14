angular.module("boxify").controller("RegisterController",
  function($meteor, $state){
    var vm = this;

    vm.credentials = {
      email: '',
      password: ''
    };

    vm.error = '';

    vm.register = function (){
      $meteor.createUser(vm.credentials).then(
        function(){
          $state.go('home');
        },
        function(err){
          vm.error = 'Registration error - ' + err;
        }
        );
    };
  });