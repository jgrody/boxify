angular.module('boxify').factory('flashErrors',
 function($mdToast){
  return function(error) {
    if (error.reason) {
      $mdToast.show(
        $mdToast.simple()
          .content(error.reason)
          .position('top right')
          .hideDelay(3000)
        );
    } else {
      $mdToast.show(
        $mdToast.simple()
          .content("Oops! A server error has occurred. Sorry.")
          .position('top right')
          .hideDelay(3000)
        );
    }
  };
})
