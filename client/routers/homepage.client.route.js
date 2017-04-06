/**
 * Created by LQG on 2017/3/30.
 */
var appName = 'mean';
var app = angular.module(appName, ['ngRoute']);

app.factory("AuthService", function ($http, $rootScope) {
  var service = {};
  service.login = function (user, callback) {
    $http.post("api/signin", user)
      .then(function (response) {
        console.log(response);
        if (response.data.errmsg) {
          callback(false, response.data.errmsg);
        } else {
          callback(true, response.data.user);
        }
      });
  }
  service.isAuthorized = function (cb) {
    $http.get("api/isSignin")
      .then(function (response) {
        if (response.data.isLogin) {
          $rootScope.isLogin = true;
          $rootScope.user = response.data.user;
          cb(true, response.data.user);
        } else {
          $rootScope.isLogin = false;
          $rootScope.user = null;
          cb(false, null);
        }
      });
  }
  return service;
})

app.run(function (AuthService) {
  AuthService.isAuthorized(function () {

  });
})

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when('/', {templateUrl: 'views/homepage.html'})
    .when('/signin', {templateUrl: 'views/signin/signin.ejs'})
    .when('/blog', {templateUrl: 'views/blogs/bloglist.ejs'})
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
});

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when('/signup', {templateUrl: 'views/signup/signup.ejs'});
})

app.provider("MyProvider", function () {
  this.$get = function () {
    return {
      sayHello: function () {

      }
    }
  }
});
app.config(function (MyProviderProvider) {

})

