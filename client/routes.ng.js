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
      box: ["$meteor", function($meteor){
        return $meteor.object(Boxes, {ownerId: Meteor.user()._id})
      }],
      subscribe: ["$meteor", function($meteor) {
        return $meteor.subscribe('boxes');
      }]
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
    },
    // resolve: {
    //   subscribe: ["$meteor", function($meteor) {
    //     return $meteor.subscribe('members');
    //   }]
    // }
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
    if (error === "AUTH_REQUIRED") {
      $state.go('home');
    }
  });
});;