angular.module('boxify')
.config(function($urlRouterProvider, $stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('root', {
    url: '',
    abstract: true,
  })
  .state('root.home', {
    url: '',
    abstract: true,
    views: {
      'master@': {
        templateUrl: 'client/layouts/home.ng.html'
      }
    }
  })
  .state('root.dashboard', {
    url: '/dashboard',
    abstract: true,
    views: {
      'master@': {
        controller: 'BoxesDashboardController',
        templateUrl: 'client/layouts/dashboard.ng.html'
      }
    },
    resolve: {
      currentUser: ["$meteor", function($meteor){
        return $meteor.requireUser();
      }],
      boxesSubscription: ["$meteor", function($meteor){
        return $meteor.subscribe('boxes');
      }],
      box: ["$meteor", "currentUser", "$q", "boxesSubscription", function($meteor, currentUser, $q){
        var box = $meteor.object(Boxes, {ownerId: currentUser._id});

        if(!box._id) {
          var deferred = $q.defer();
          deferred.reject('NOT_FOUND');
          return deferred.promise;
        }

        return box;
      }],
    }
  })
  .state('root.dashboard.members', {
    url: '/members',
    views: {
      'content': {
        controller: 'BoxesDashboardMembersController',
        templateUrl: 'client/boxes/dashboard/members/template.ng.html',
      }
    },
    resolve: {
      subscribe: ["$meteor", function($meteor) {
        return $meteor.subscribe('members');
      }]
    }
  })
  .state('root.dashboard.settings', {
    url: '/settings',
    views: {
      'content': {
        // controller: 'BoxesDashboardMembersController',
        templateUrl: 'client/boxes/dashboard/settings/template.ng.html',
      }
    }
  })
  .state('root.members', {
    url: '/members',
    abstract: true,
    views: {
      'master@': {
        controller: 'BoxesMembersController',
        templateUrl: 'client/layouts/members.ng.html'
      }
    }
  })
  .state('root.members.profile', {
    url: '/:userId',
    views: {
      'content': {
        controller: 'BoxesMembersProfileController',
        templateUrl: 'client/boxes/members/profile/template.ng.html',
      }
    }
  })
  .state('login', {
    url: '/login',
    views: {
      'master@': {
        templateUrl: 'client/users/login/template.ng.html',
        controller: 'LoginController',
        controllerAs: 'lc'
      }
    }
  })
  .state('register',{
    url: '/register',
    views: {
      'master@': {
        templateUrl: 'client/users/register/template.ng.html',
        controller: 'RegisterController',
        controllerAs: 'rc'
      }
    }
  })
  .state('resetpw', {
    url: '/resetpw',
    views: {
      'master@': {
        templateUrl: 'client/users/reset/template.ng.html',
        controller: 'ResetController',
        controllerAs: 'rpc'
      }
    }
  })
  .state('setPassword', {
    url: '/reset-password/:token?:memberId',
    views: {
      'master@': {
        templateUrl: 'client/users/set_password/template.ng.html',
        controller: 'SetPasswordController',
        controllerAs: 'spc'
      }
    }
  })
  .state('enrollAccount', {
    url: '/enroll-account/:token',
    views: {
      'master@': {
        templateUrl: 'client/users/set_password/template.ng.html',
        controller: 'SetPasswordController',
        controllerAs: 'spc'
      }
    }
  })
  .state('logout', {
    url: '/logout',
    resolve: {
      "logout": ['$meteor', '$state', function($meteor, $state) {
        return $meteor.logout().then(function(){
          $state.go('root.home');
        }, function(err){
          console.log('logout error - ', err);
        });
      }]
    }
  })

  // $urlRouterProvider.otherwise('/');
}).run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeError",
    function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    console.log("error: ", error);
    if (error === "AUTH_REQUIRED") {
      $state.go('login');
    }
  });
});;