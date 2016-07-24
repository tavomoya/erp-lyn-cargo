'use strict';

angular.module('erpLynCargoApp')
.directive('dynamicList', function () {
  return {
    templateUrl: 'scripts/directives/dynamic-list/dynamic-list.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
      fields: '=',
      model: '=',
      title: '=',
      headers: '='
    },
    controller: function ($scope, $state) {

      $scope.content = [];
      $scope.totalPages = 0;
      $scope.currentPage = 1;
      $scope.params = {
        limit: 10,
        skip: 0,
        search: '',
        fields: $scope.fields
      };

      $scope.getContent = function (params) {
        new $scope.model().find({}, params)
        .then(function (res) {
          $scope.content = res;
        })
        .catch(function (err) {
          console.log('There was an error fetching content', err);
        });
      };

      $scope.createNew = function () {
        new $scope.model().go();
      };

      $scope.goBack = function () {
        history.back();
      };

      // See the detail of the Document
      // Have the opportunity to edit it too
      $scope.seeDetail = function (id) {
        new $scope.model().go(id);
      }

      $scope.prevPageDisabled = function () {
        return $scope.currentPage === 1 ? "disabled" : "";
      };

      $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.totalPages ? "disabled" : "";
      };

      $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
          $scope.currentPage--;
          $scope.params.skip = (($scope.currentPage - 1) * $scope.params.limit);
          $scope.getContent($scope.params);
        }
      };

      $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages) {
          $scope.currentPage++;
          $scope.params.skip = (($scope.currentPage - 1) * $scope.params.limit);
          $scope.getContent($scope.params);
        }
      };

      $scope.search = function (_string) {
        $scope.params.search = _string;
        new $scope.model().count(null, $scope.params)
        .then(function (res) {
          var count = res.data.data;
          $scope.totalPages = count < $scope.params.limit ? 1 : Math.ceil(count / $scope.params.limit);
          $scope.getContent($scope.params);
        })
        .catch(function (err) {
          console.log('error', err);
        });
      };

      //The purpouse of this function is to transfor the content of the element
      //to be shown on the table, wether is a property inside an object (.)
      //or if it is a combination of fields (+).
      $scope.transformContent = function (_element, _field) {
        var transformedContent = '-';
        if (_field.includes('.')) {
          var splitted = _field.split('.');
          transformedContent = _element[splitted[0]][splitted[1]];
        } else if (_field.includes('+')) {
          var splitted = _field.split('+');
          transformedContent = _element[splitted[0]] + ' '+ _element[splitted[1]];
        } else if (_field === 'fullName') {
          if (_element.type == 'Persona') {
            transformedContent = _element.firstName + ' ' + _element.lastName;
          } else {
            transformedContent = _element.companyName;
          }
        } else {
          transformedContent = _element[_field];
        };
        return transformedContent;
      };

      // On Load
      new $scope.model().count()
      .then(function (res) {
        var count = res.data.data;
        $scope.totalPages = count < $scope.params.limit ? 1 : Math.ceil(count / $scope.params.limit);
        $scope.getContent($scope.params);
      })
      .catch(function (err) {
        console.log('error', err);
      });
    }
  }
})
