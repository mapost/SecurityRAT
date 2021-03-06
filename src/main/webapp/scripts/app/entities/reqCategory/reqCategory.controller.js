'use strict';

angular.module('sdlctoolApp')
    .controller('ReqCategoryController', function ($scope, ReqCategory, ReqCategorySearch, sharedProperties, $filter) {
        $scope.reqCategorys = [];
        $scope.loadAll = function() {
            ReqCategory.query(function(result) {
               $scope.reqCategorys = result;
               angular.forEach($scope.reqCategorys, function(category) {
            	   angular.extend(category, {selected: false});
               });
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            ReqCategory.get({id: id}, function(result) {
                $scope.reqCategory = result;
                $('#deleteReqCategoryConfirmation').appendTo("body").modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            ReqCategory.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteReqCategoryConfirmation').modal('hide');
                    $scope.clear();
                });
        };
        $scope.selectAllTypes = function() {
        	angular.forEach($scope.reqCategorys, function(category) {
        		category.selected = true;
        	});
	  	}
        $scope.deselectAllTypes = function() {
        	angular.forEach($scope.reqCategorys, function(category) {
        		category.selected = false;
        	});
        }
      
        $scope.bulkChange = function() {
        	sharedProperties.setProperty($filter('orderBy')($filter('filter')($scope.reqCategorys, {selected: true}), ['showOrder']));
        }
        
        $scope.search = function () {
            ReqCategorySearch.query({query: $scope.searchQuery}, function(result) {
                $scope.reqCategorys = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.reqCategory = {name: null, shortcut: null, description: null, showOrder: null, active: null, id: null};
        };
    });
