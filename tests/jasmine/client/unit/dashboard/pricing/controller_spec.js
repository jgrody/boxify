describe('BoxesDashboardMembersController', function() {
  var $scope, box, boxifyCall, boxifyDialog, toast,
      boxifyCallDeferred, boxifyDialogDeferred, $meteor;

  beforeEach(module('boxify'));

  beforeEach(inject(function($rootScope, $controller, $q, _boxifyDialog_, $meteor){
    $scope = $rootScope.$new();
    box = {_id: 'ABC123'};
    toast = jasmine.createSpy();

    boxifyDialog = {
      show: jasmine.createSpy().and.callFake(function(){
        boxifyDialogDeferred = $q.defer();
        return boxifyDialogDeferred.promise;
      })
    };

    boxifyCall = jasmine.createSpy().and.callFake(function(){
      boxifyCallDeferred = $q.defer();
      return boxifyCallDeferred.promise;
    });

    $controller('BoxesDashboardPricingController', {
      $scope: $scope,
      $meteor: $meteor,
      box: box,
      boxifyCall: boxifyCall,
      boxifyDialog: boxifyDialog,
      toast: toast
    })
  }));

  describe('initialization', function() {
    it('sets members on the scope', function() {
      // expect($scope.members).toBeDefined();
    });
  });

});
