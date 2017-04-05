/**
 * Created by LQG on 2017/4/1.
 */
app.controller("ArtileController", function ($scope, $http, $window, $rootScope, $routeParams) {
  console.log($routeParams.id);
  var blogListUrl = $routeParams.id === undefined ? "/article/list" : "/article/list/"+$routeParams.id;
  $http.get(blogListUrl)
    .then(function (response) {
      console.log(response);
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
});

