angular.module('boxify').factory('boxifyCall', [
  '$q',
  '$meteor',
  'flashErrors',
function($q, $meteor, flashErrors){
  function handleErrors(error){
    flashErrors(error);
    return $q.reject(error);
  }

  function handleSuccess(response){
    return response;
  }

  return function(method, args) {
    var opts = Object.merge({flash: true}, {});

    return $meteor.call(method, args)
      .catch(handleErrors)
      .then(handleSuccess);
  };
}])
