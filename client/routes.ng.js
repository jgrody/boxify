angular.module('boxify')
.config(function($urlRouterProvider, $stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('root', {
    url: '',
    abstract: true
  })
  .state('root.home', {
    url: '/',
    views: {
      'container@': {
        templateUrl: 'client/boxes/new/template.ng.html',
        controller: 'BoxesNewController'
      }
    }
  })
  .state('root.dashboard', {
    url: '/dashboard',
    views: {
      'container@': {
        templateUrl: 'client/boxes/dashboard/template.ng.html',
        controller: 'BoxesDashboardController'
      }
    },
    resolve: {
      currentUser: ["$meteor", function($meteor){
        return $meteor.requireUser();
      }]
    }
  })
  .state('login', {
    url: '/login',
    views: {
      'container@': {
        templateUrl: 'client/users/login/template.ng.html',
        controller: 'LoginController',
        controllerAs: 'lc'
      }
    }
  })
  .state('register',{
    url: '/register',
    views: {
      'container@': {
        templateUrl: 'client/users/register/template.ng.html',
        controller: 'RegisterController',
        controllerAs: 'rc'
      }
    }
  })
  .state('resetpw', {
    url: '/resetpw',
    views: {
      'container@': {
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

  $urlRouterProvider.otherwise('/');
}).run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeError",
    function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('root.home');
    }
  });
});;