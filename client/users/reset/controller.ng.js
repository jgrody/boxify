angular.module("boxify").controller("ResetController",
function($meteor, $state){
  window.meteor = $meteor;
  var vm = this;

  vm.credentials = { email: '' };
  vm.error = '';

  vm.reset = function (){
    $meteor.forgotPassword({
      email: vm.credentials.email
    }).then(
      function(){
        $state.go('root.home');
      },
      function(err){
        vm.error = 'Error sending forgot password email - ' + err;
      }
    );
  };
});