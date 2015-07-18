angular.module("boxify").controller("RegisterController",
  function($scope, $rootScope, $meteor, $state){
    var vm = this;

    vm.boxes = $meteor.collection(Boxes).subscribe('boxes');
    $scope.$meteorSubscribe('boxes');

    vm.credentials = {
      email: '',
      password: ''
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
      vm.error = 'Registration error - ' + error;
    }

    vm.register = function (){
      $meteor.createUser(vm.credentials).then(saveBox, handleError);
    };
  });