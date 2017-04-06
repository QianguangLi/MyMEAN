/**
 * Created by LQG on 2017/4/6.
 */
app.controller("ArtileEditController", function ($scope, $routeParams, $http, $window) {
  $scope.blog = {
    title: "",
    content: ""
  }
  $http.get("/article/edit/" + $routeParams.id)
    .then(function (response) {
      if (response.data.code !== 200) {
        alert(response.data.message);
      } else {
        $scope.blog = response.data.blog;
      }
    });

  $scope.updateBlog = function () {
    var blog = $scope.blog;
    $http.post("/article/edit/"+blog._id, blog)
      .then(function (response) {
        if (response.data.code !== 200) {
          alert(response.data.message);
        } else {
          alert("修改成功");
          $window.location.href = "/#/blog"
        }
      });
  }
});