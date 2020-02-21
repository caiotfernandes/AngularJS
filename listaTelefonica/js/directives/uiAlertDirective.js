angular.module("listaTelefonica").directive("uiAlert", function () {
    return {
        templateUrl: "../view/ui-alert.html",
        styleUrl: "../css/alert.css",
        replace: true,
        restrict: "AE",
        scope: {
            errorTitle: "=title",
            errorMessage: "=message"
        }
    };
});