// Code goes here
var app = angular.module("myApp", []);
app.controller('myCtrl', function($scope) {

    $scope.items = [];
    $scope.selectItem = function(value) {


        var item = {
            id: $scope.items.length + 1,
            item: value,
            unitPoints: $scope.checkUnitPoints(value),
            quantity: 1,
            bonus: 0
        }

        var count = $scope.countInArray($scope.items, value);
        if (count === 0) {
            $scope.items.push(item);
        } else if (count !== 0) {
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].item === value) {
                    $scope.items[i].quantity = $scope.items[i].quantity + count;
                    $scope.items[i].bonus = $scope.calculateBonus(value, $scope.items[i].quantity);
                    $scope.items[i].unitPoints = $scope.items[i].quantity * $scope.checkUnitPoints(value) + $scope.items[i].bonus;
                }
            }
        }

        $scope.amount = $scope.getTotal($scope.items);

    }

    $scope.checkUnitPoints = function(value) {
        if (value === 'A') {
            return 50;
        } else if (value === 'B') {
            return 30;
        } else if (value === 'C') {
            return 20;
        } else if (value === 'D') {
            return 15;
        }
    }

    $scope.calculateBonus = function(value, count) {
        if (value === 'A') {
            return Math.floor(count / 3) * 50;
        } else if (value === 'B') {
            return Math.floor(count / 2) * 30;
        } else {
            return 0;
        }
    }

    $scope.getTotal = function(items) {
        var summary = {
            total: 0,
            bonus: 0

        }

        angular.forEach(items, function(value, key) {
            summary.total = summary.total + value.unitPoints;
            summary.bonus = summary.bonus + value.bonus;
        });
        return summary;
    }


    $scope.countInArray = function(array, value) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i].item === value) {
                count++;
            }
        }
        return count;
    }

    $scope.resetGame = function() {
        $scope.items.length = 0;
        $scope.amount = {};
    }


});
