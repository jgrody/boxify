angular.module('boxify')
.config(function($urlRouterProvider, $stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'client/boxes/new/template.ng.html',
    controller: 'BoxesNewController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'client/users/login/template.ng.html',
    controller: 'LoginController',
    controllerAs: 'lc'
  })
  .state('register',{
    url: '/register',
    templateUrl: 'client/users/register/template.ng.html',
    controller: 'RegisterController',
    controllerAs: 'rc'
  })
  .state('resetpw', {
    url: '/resetpw',
    templateUrl: 'client/users/reset/template.ng.html',
    controller: 'ResetController',
    controllerAs: 'rpc'
  })
  .state('logout', {
    url: '/logout',
    resolve: {
      "logout": ['$meteor', '$state', function($meteor, $state) {
        return $meteor.logout().then(function(){
          $state.go('home');
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
      $state.go('/');
    }
  });
});;