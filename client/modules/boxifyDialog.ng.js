angular.module('boxify').factory('boxifyDialog',
function($mdDialog){
  var defaultOptions = {
    escapeToClose: true,
    clickOutsideToClose: true
  }

  return {
    show: function(options){
      return $mdDialog.show(angular.extend({}, defaultOptions, options));
    },

    hide: function(){
      return $mdDialog.hide();
    }
  }
});
