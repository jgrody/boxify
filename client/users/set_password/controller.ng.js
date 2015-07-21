angular.module("boxify").controller("SetPasswordController",
function($meteor, $state, $stateParams){
  var vm = this;

  vm.credentials = { password: '' };
  vm.error = '';

  var token = $stateParams.token;
  var memberId = $stateParams.memberId;

  vm.set = function (){
    $meteor.resetPassword(token, vm.credentials.password)
      .then(function(data){
        console.log("data:", data);
      }, function(err){
        vm.error = 'Reset error - ' + err;
      });
  };

});