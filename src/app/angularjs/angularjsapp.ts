import 'angular';
import 'angular-ui-router';

declare const angular: any;

export const module = angular.module('AngularJSApp', ['ui.router']);

module.config(($locationProvider, $stateProvider) => {
  $locationProvider.html5Mode(true);

  $stateProvider.state('popular', {
    url: '/popular',
    templateUrl: './popular/popular.html',
    controller: function ($scope, PageValues) {
        //Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";
        //Setup view model object
        var vm = this;
        // vm.shows = shows;
    }
  });

  $stateProvider.state('search', {
    url: '/search',
    templateUrl: './search/search.html',
    controller: function ($location, PageValues, ShowService) {
      console.log('inside SearchController')
      console.log($location);
      //Set page title and description
      PageValues.title = "SEARCH";
      PageValues.description = "Search for your favorite TV shows.";
      //Setup view model object
      var vm = this;
      vm.query = null;
      vm.shows = [];
      vm.loading = null;

      vm.performSearch = function () {
        vm.loading = true;
        ShowService.search(vm.query).then(function (response) {
          vm.shows = response;
          vm.loading = false;
        });
      };

    },
    controllerAs: "search"
  });

  $stateProvider.state('sink', {
    url: '/*path',
    template: ''
  });
});


module.service('PageValues', () => {
  return {
    'title': '',
    'description': '',
    'loading': false
  }
})

module.service('ShowService', ($http) => {
  const API_KEY = '87de9079e74c828116acce677f6f255b';
  const BASE_URL = 'http://api.themoviedb.org/3';

  var data = {
    'getPremieres': getPremieres,
    'get': get,
    'search': search,
    'getPopular': getPopular,
    'getCast': getCast
  };
  function makeRequest(url, params) {
    var requestUrl = BASE_URL + '/' + url + '?api_key=' + API_KEY;
    angular.forEach(params, function (value, key) {
      requestUrl = requestUrl + '&' + key + '=' + value;
    });
    return $http({
      'url': requestUrl,
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json'
      },
      'cache': true
    }).then(function (response) {
      return response.data;
    }).catch(dataServiceError);
  }
  function getPremieres() {
    //Get first day of the current month
    var date = new Date();
    date.setDate(1);
    return makeRequest('discover/tv', { 'first_air_date.gte': '', append_to_response: 'genres' }).then(function (data) {
      return data.results;
    });
  }
  function get(id) {
    return makeRequest('tv/' + id, {});
  }
  function getCast(id) {
    return makeRequest('tv/' + id + '/credits', {});
  }
  function search(query) {
    return makeRequest('search/tv', { query: query }).then(function (data) {
      return data.results;
    });
  }
  function getPopular() {
    return makeRequest('tv/popular', {}).then(function (data) {
      return data.results;
    });
  }
  return data;

  function dataServiceError(errorResponse) {
    return errorResponse;
  }
})

module.directive('show', (ShowService) => {
  var directive = {
    controller: controller,
    templateUrl: './directive/show.html',
    restrict: 'E',
    scope: {
      show: '='
    }
  };
  return directive;
  function controller($scope) {
    $scope.genres = [];
    ShowService.get($scope.show.id).then(function (response) {
      $scope.genres = response.genres;
    });
  }
})

module.run(($rootScope) => {
  console.log('Running AngularJS application');

  $rootScope.$on('$stateChangeStart', (e, toState, toParams) => {
    console.log('$stateChangeStart', toState, toParams);
  });
});