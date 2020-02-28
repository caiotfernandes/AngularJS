angular.module("listaTelefonica").directive("uiTelephone", function ($filter) {
    return {
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {

            var _formatTel = function (tel) {
                tel = tel.replace(/[^0-9]+/g, "");
                if(tel.length > 5) {
                    tel = tel.substring(0,5) + "-" + tel.substring(5);
                }
                return tel.substring(0,10);
            }
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatTel(ctrl.$viewValue));
                ctrl.$render();
            })
        }
    };
});