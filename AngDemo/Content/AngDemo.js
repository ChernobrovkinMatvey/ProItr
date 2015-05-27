var AngDemo = angular.module('AngDemo', ['ngRoute'])
	.config(function ($routeProvider) {

		$routeProvider.when('/Purchase', {
			templateUrl: 'Content/Purchase.html',
			controller: 'PurchaseController'
		});

		$routeProvider.when('/Login', {
			templateUrl: 'Content/Login.html',
			controller: 'LoginController'
		});

		$routeProvider.otherwise({ redirectTo: 'Purchase' });
	})
;

AngDemo.controller('PurchaseController', ['$location', '$scope', '$http',
	function ($location, $scope, $http) {
		$http({ method: 'GET', url: '/Api/AngDemo/GetCategoryes/' })
			.success(function (data, status, headers, config) {
				$scope.Categories = JSON.parse(data);
				if ($scope.Categories.length) { // первый выбранный
					$scope.catClick($scope.Categories[0]);
				}
			})
			.error(function (data, status, headers, config) {
				//alert('error');
			});

		$scope.catClick = function (cat) {
			$http({ method: 'GET', url: '/Api/AngDemo/GetProductByCategory?categ=' + cat.Id })
				.success(function (data, status, headers, config) {
					var products = JSON.parse(data);
					
					$scope.Products = _.map(products,
						function (prod) {
							prod.isBay = typeof _.find($scope.Bayz, function(t) { return t.Id === prod.Id; }) != 'undefined';
							return prod;
						}
					);
					$scope.catSelected = cat.Id;
				})
				.error(function (data, status, headers, config) {
					//alert('error');
				});
			//
		}

		$scope.Bayz = [];
		$scope.Sum = 0;
		$scope.prodClick = function (prod) {
			if (prod.isBay) return;
			prod.isBay = true;
			$scope.Sum += prod.Price;
			$scope.Bayz.push(prod);
		};

		$scope.bayRemove = function (prod) {
			var index = $scope.Bayz.indexOf(prod);
			if (index == -1 || !prod.isBay) return;
			var p = _.find($scope.Products, function (t) { return t.Id === prod.Id; });
			if (typeof p != 'undefined') {
				p.isBay = false;
			};
			$scope.Sum -= prod.Price;
			$scope.Bayz.splice(index, 1);
		};

		$scope.clearAll = function () {
			if (!$scope.Bayz.length || !confirm('Очистить корзину покупок?')) return;
			for (var i = 0; i < $scope.Bayz.length; i++) {
				var id = $scope.Bayz[i].Id;
				var p = _.find($scope.Products, function (t) { return t.Id === id; });
				if (typeof p != 'undefined') {
					p.isBay = false;
				};
			};
			$scope.Bayz = [];
			$scope.Sum = 0;
		}
	}
]);

/// сервис авторизации пользователя
AngDemo.service('AuthService', ['$http',
	function ($http) {
		return {
			auth: function (credentials) {
				var promise = $http.post('/Api/AngDemo/Login?UserId=' + credentials.username + '&Password=' + credentials.password)
					.then(function (response) {
						return response.data;
					});
				return promise;
			}
		};
	}
]);

AngDemo.controller('LoginController', ['$location', '$scope', '$http', 'AuthService',
	function ($location, $scope, $http, AuthService) {

		$scope.credentials = {
			username: 'sa',
			password: 'sa'
		};

		$scope.errorMsg = '';

		$scope.login = function (credentials) {
			//AuthService.login(credentials).then(function () {
			//	$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			//}, function () {
			//	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			//});
			AuthService.auth(credentials).then(function (result) {
				var userId = parseInt(result);
				if (isNaN(userId)) {
					$scope.errorMsg = result;
				}
				else {
					$location.path('Purchase');
				}
			});
		};
	}
]);