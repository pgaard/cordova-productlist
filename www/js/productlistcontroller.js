var productlist = angular.module('productlist',[]);

productlist.controller("ProductlistController", ['$scope','$http', ProductlistController]);

angular.module("productlist")
    .directive("iscEnter", function () {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.iscEnter);
                });

                event.preventDefault();
            }
        });
    };
})

function ProductlistController($scope, $http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    $scope.test = "blah!";
    $scope.search = function(){
        var text = $scope.searchText;
        $http.get("http://10.1.100.156/api/v1/products?pagesize=20&query=" + text)
            .success(function(result){
                $scope.products = result.products;
            })
            .error(function(){
                $scope.products = null;
            });

    }
}

