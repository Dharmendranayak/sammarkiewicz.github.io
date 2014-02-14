var camAppControllers = angular.module("camAppControllers", []);

camAppControllers.controller("mainController", [ "$scope", "$http", function(e, t) {
    t.get("js/app/works.json").success(function(t) {
        e.works = t;
    });
} ]);

camAppControllers.controller("WorkDetailCtrl", [ "$scope", "$routeParams", "$http", function(e, t, n) {
    n.get("js/app/" + t.workId + ".json").success(function(t) {
        e.work = t;
    });
} ]);