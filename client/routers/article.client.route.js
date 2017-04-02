/**
 * Created by LQG on 2017/4/1.
 */
var articleName = "mean-article";
var articleApp = angular.module(articleName, ['ngRoute']);

articleApp.config(function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {templateUrl: "views/blogs/bloglist.ejs"})
    .when("/add", {templateUrl: "views/blogs/addblog.ejs"})
    .otherwise({redirectTo: '/'});
})