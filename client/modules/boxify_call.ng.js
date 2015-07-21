angular.module('boxify').factory('boxifyCall',
function($meteor, flashErrors){
  function handleErrors(error){
    flashErrors(error);
    return error;
  }

  function handleSuccess(response){
    return response;
  }

  return function(method, args) {
    return $meteor.call(method, args)
      .catch(handleErrors)
      .then(handleSuccess);
  };
});
