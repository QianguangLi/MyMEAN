/**
 * Created by LQG on 2017/4/1.
 */
app.controller("ArtileController", function ($scope, $http, $window, $rootScope, $routeParams) {
  console.log($routeParams.id);
  console.log($routeParams.page);

  var blogListUrl = $routeParams.id === undefined ? "/article/list?page=1" : "/article/list/"+$routeParams.id+"?page=1";
  $http.get(blogListUrl)
    .then(function (response) {
      $scope.blogs = response.data.blogs;
    });

  $scope.addArticle = function () {
    if ($rootScope.isLogin) {
      $window.location.href = "#/blog/add";
    } else {
      $window.location.href = "/#/signin";
    }
  }

  $scope.blog = {
    title: "",
    content: ""
  }

  // $scope.user = $rootScope.user;

  $scope.addBlog = function () {
    var blog = $scope.blog;
    $http.post("/article/add", blog)
      .then(function (response) {
        if (response.data.code !== 200) {
          alert(response.data.message);
        } else {
          $window.location.href = "/#/blog"
        }
      });
  }

  $scope.delBlog = function () {

  }
});

