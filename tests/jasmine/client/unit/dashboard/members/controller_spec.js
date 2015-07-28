describe('BoxesDashboardMembersController', function() {
  var $scope, box, boxifyCall, boxifyDialog, toast,
    boxifyCallDeferred, boxifyDialogDeferred, $meteor;

  beforeEach(module('boxify'));

  beforeEach(inject(function($rootScope, $controller, $q, _boxifyDialog_){
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

    $controller('BoxesDashboardMembersController', {
      $scope: $scope,
      box: box,
      boxifyCall: boxifyCall,
      boxifyDialog: boxifyDialog,
      toast: toast
    })
  }));

  describe('initialization', function() {
    it('sets members on the scope', function() {
      expect($scope.members).toBeDefined();
    });
  });

  describe('openAddMemberDialog', function() {
    it('opens a dialog', function() {
      var $event = {};
      $scope.openAddMemberDialog($event);
      expect(boxifyDialog.show).toHaveBeenCalledWith(jasmine.objectContaining({
        controller: 'DashboardMembersAddController'
      }));
    });
  });

  describe('deleteUser', function() {
    var $event, member;
    beforeEach(function(){
      $event = {};
      member = {_id: 'ABC123'};
      spyOn($scope, 'createConfirm').and.returnValue({});
      $scope.deleteUser($event, member);
    })

    it('shows a confirmation dialog', function() {
      expect(boxifyDialog.show).toHaveBeenCalledWith({});
    });

    it('deletes the user if user confirms dialog', function() {
      boxifyDialogDeferred.resolve('ok');
      $scope.$apply();

      expect(boxifyCall).toHaveBeenCalledWith('deleteMember', {member: member});
    });

    it('doesnt delete user if user cancels the confirmation', function() {
      boxifyDialogDeferred.reject('ok');
      $scope.$apply();

      expect(boxifyCall).not.toHaveBeenCalled();
    });

    it('toasts to a successfully deleted user', function() {
      boxifyDialogDeferred.resolve('ok');
      $scope.$apply();

      boxifyCallDeferred.resolve('ok');
      $scope.$apply();

      expect(toast).toHaveBeenCalledWith(jasmine.objectContaining({
        type: "success"
      }));
    });
  });
});