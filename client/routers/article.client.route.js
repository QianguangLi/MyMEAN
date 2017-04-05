/**
 * Created by LQG on 2017/4/1.
 */

app.config(function ($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix("");
  $routeProvider
    .when("/blog/:id", {templateUrl: "views/blogs/bloglist.ejs"})
    .when("/blog/add", {templateUrl: "views/blogs/addblog.ejs"})
    .otherwise({redirectTo: '/'});
})