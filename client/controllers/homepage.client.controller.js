/**
 * Created by LQG on 2017/3/30.
 */
app.controller("HomePageController", function ($scope, $http, $window, AuthService, $rootScope) {

  $scope.showSign = !$rootScope.isLogin;

  $http.get("api/getBanerUrl")
    .then(function (response) {
      $scope.name = response.data.banerUrl;
    });

  $scope.user = {
    username: "",
    password: "",
    confirmpassword: ""
  }

  $scope.signup = function () {
    var user = $scope.user;
    if (user.username.length === 0) {
      $scope.usernameErrMsg = "账号不能为空";
      return;
    } else {
      $scope.usernameErrMsg = "";
    }
    if (user.password.length < 6) {
      $scope.passwordErrMsg = "密码长度不能小于6位";
      return;
    } else {
      $scope.passwordErrMsg = "";
    }
    if (user.password !== user.confirmpassword) {
      $scope.confirmpasswordErrMsg = "两次输入密码不一致";
      return;
    } else {
      $scope.confirmpasswordErrMsg = "";
    }

    $http.post("api/signup", user)
      .then(function (response) {
        if (response.data.errmsg) {
          console.log(response);
          $window.location.href = "/signup";
        } else {
          $window.location.href = "/signin";
        }
      });
  }

  $scope.signin = function () {
    var user = $scope.user;
    if (user.username.length === 0) {
      $scope.signinerrmsg = "账号不能为空";
      return;
    } else {
      $scope.signinerrmsg = "";
    }
    if (user.password.length < 6) {
      $scope.signinerrmsg = "密码长度不能小于6位";
      return;
    } else {
      $scope.signinerrmsg = "";
    }
    AuthService.login(user, function (isLogin, res) {
      if (!isLogin) {
        $scope.signinerrmsg = res;
        $window.location.href = "/signin";
      } else {
        $window.location.href = $window.document.referrer;
      }
    });
  }

  $scope.signout = function () {
    var logout = confirm("确认退出?")
    if (logout) {
      $http.get("api/logout", function (err, data) {
        if (!err) {
          $rootScope.isLogin = false;
          $rootScope.user = null;
          $window.location.href = "/#"
        }
      });
    }
  }
});