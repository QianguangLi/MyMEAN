/**
 * Created by LQG on 2017/4/1.
 */
app.controller("ArtileController", function ($scope, $http, $window, $rootScope, $routeParams) {

  var blogListUrl = $routeParams.id === undefined ? "api/article/list?page=" + $routeParams.page : "api/article/list/" + $routeParams.id + "?page=" + $routeParams.page;
  $http.get(blogListUrl)
    .then(function (response) {
      $scope.blogs = response.data.blogs;
      $scope.totalPage = response.data.totalPage;
      var pages = new Array(response.data.totalPage);
      for (var i = 0; i < response.data.totalPage; i++) {
        pages[i] = i + 1;
      }
      $scope.pathname = $window.location.pathname;
      $scope.pages = pages;
    });

  $scope.addArticle = function () {
    if ($rootScope.isLogin) {
      $window.location.href = "/blog/add";
    } else {
      $window.location.href = "/signin";
    }
  }

  $scope.blog = {
    title: "",
    content: ""
  }

  // $scope.user = $rootScope.user;

  $scope.addBlog = function () {
    var blog = $scope.blog;
    $http.post("api/article/add", blog)
      .then(function (response) {
        if (response.data.code !== 200) {
          alert(response.data.message);
        } else {
          $window.location.href = "/blog"
        }
      });
  }

  $scope.delBlog = function () {

  }
});

