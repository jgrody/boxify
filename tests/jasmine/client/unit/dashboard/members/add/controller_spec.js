var $mdDialog = { close: jasmine.createSpy() }

describe('DashboardMembersAddController', function() {
  var $scope, box, boxifyCall, toast, deferred;

  beforeEach(module('boxify'));

  beforeEach(inject(function($rootScope, $controller, $q){
    $scope = $rootScope.$new();
    box = {_id: 'ABC123'};
    toast = jasmine.createSpy();

    boxifyCall = jasmine.createSpy().and.callFake(function(){
      deferred = $q.defer();
      return deferred.promise;
    });

    $controller('DashboardMembersAddController', {
      $scope: $scope,
      box: box,
      boxifyCall: boxifyCall,
      toast: toast
    })
  }));

  describe('initialization', function() {
    it('sets a blank object for a new member', function() {
      expect($scope.newMember).toEqual({})
    });

    it('stubs close method for dialog', function() {
      expect($scope.close).toBeDefined();
    });
  });

  describe('invite', function() {
    it('invites a member by id', function() {
      var member = { _id: 'DEF456' };
      $scope.invite(member);
      expect(boxifyCall).toHaveBeenCalledWith('inviteByOwner', {
        boxId: box._id,
        member: member
      });
    });

    it('sets a user as invited if successful', function() {
      var member = { _id: 'DEF456' };
      $scope.invite(member);

      deferred.resolve('ok')
      $scope.$apply();

      expect(boxifyCall).toHaveBeenCalledWith('setInvited', {
        boxId: box._id,
        member: member
      })
    });
  });

  describe('add', function() {
    it('doesnt create a new member if the users email is invalid', function() {
      var member = { email: "invalidemail.com" };
      $scope.add(member);
      expect(boxifyCall).not.toHaveBeenCalled();
    });

    it('creates a new member if an email is valid', function() {
      var member = { email: "valid@email.com" };
      $scope.add(member);

      expect(boxifyCall).toHaveBeenCalledWith('createMember', {
        boxId: box._id,
        email: member.email,
        password: jasmine.any(String),
        profile: jasmine.any(Object)
      })
    });

    it('invites the newly created member', function() {
      spyOn($scope, 'invite');

      var member = { email: "valid@email.com" };
      $scope.add(member);

      deferred.resolve('ABC123');
      $scope.$apply();

      expect($scope.invite).toHaveBeenCalledWith({_id: 'ABC123'});
    });

    it('closes the add modal afterwards', function() {
      spyOn($scope, 'close');

      var member = { email: "valid@email.com" };
      $scope.add(member);

      deferred.resolve('ABC123');
      $scope.$apply();

      expect($scope.close).toHaveBeenCalled()
    });

    it('toasts a success message', function() {
      var member = { email: "valid@email.com" };
      $scope.add(member);

      deferred.resolve('ABC123');
      $scope.$apply();

      expect(toast).toHaveBeenCalledWith(jasmine.objectContaining({
        type: "success"
      }))
    });
  });
});