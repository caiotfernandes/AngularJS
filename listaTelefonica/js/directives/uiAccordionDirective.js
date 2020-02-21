angular.module("listaTelefonica").directive("uiAccordion", function () {
    return {
        templateUrl: "view/ui-accordion.html",
        scope: {
            title: "@"
        }
    };
});