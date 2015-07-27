angular.module('boxify').factory('flashErrors',
 function(toast){
  return function(error) {
    if (error.reason) {
      toast({
        type: "error",
        title: "Something went wrong",
        message: error.reason
      })
    } else {
      toast({
        type: "error",
        title: "Oops! A server error has occurred. Sorry.",
        message: error.reason
      })
    }
  };
})
