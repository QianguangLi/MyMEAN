/**
 * Created by LQG on 2017/3/30.
 */
var homepageName = 'mean';
var homePageApp = angular.module(homepageName, ['ngRoute']);
homePageApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when('/', {templateUrl: 'views/homepage.html'})
    .when('/signin', {templateUrl: 'views/signin/signin.ejs'})
    .when('/bloglist', {templateUrl: 'views/blogs/bloglist.ejs'})
    .otherwise({redirectTo: '/'});
});

homePageApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when('/signup', {templateUrl: 'views/signup/signup.ejs'});
})
