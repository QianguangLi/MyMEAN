/**
 * Created by LQG on 2017/4/1.
 */
articleApp.controller("ArtileController", function ($scope, $http, $window) {
  $scope.addArticle = function () {
    $http.get("/isSignin")
      .then(function (response) {
        console.log(response);
        if (response.data.isLogin === true) {
          $window.location.href = "#/add";
        } else {
          $window.location.href = "/#/signin";
        }
      });
  }
});