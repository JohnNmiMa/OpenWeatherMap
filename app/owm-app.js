angular.module('OWMApp', ['ngRoute'])

.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });
})

.value('owmCities', ['New York','Dallas','Chicago'])

.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : './home.html',
        controller : 'HomeCtrl'
    }).when('/cities/:city', {
        templateUrl : './city.html',
        controller : 'CityCtrl',
        resolve : {
            city: function(owmCities, $route, $location) {
                var potentialCity = $route.current.params.city;
                if (owmCities.indexOf(potentialCity) == -1 ) {
                    $location.path('/error');
                    return;
                }
                return potentialCity;
            }
        }
    }).when('/error', {
        template : '<p>Error: City Not Supported</p>'
    });
    /*}).otherwise({
        // used to catch a user request to an unknown URL
        redirectTo : '/error'
    });*/
})

.controller('HomeCtrl', function($scope) {
})

.controller('CityCtrl', function($scope, city) {
    // Only properties from the 'resolve' can be injected into
    // its corresponding controller. Here, the 'city' property
    // is injected.
    $scope.city = city;
});
