angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, contatosAPI, serialGenerator, $location, operadoras, contatos) {
    $scope.operadoras = operadoras.data;
    $scope.contatos = contatos.data;

    $scope.lastID = function (contatos) {
        var lastID = 0
        contatos.forEach( function (contato) {
            if(contato.id > lastID) {
                lastID = contato.id;
            }
        });
        return lastID;
    };

    $scope.adicionarContato = function (contato) {
        
        var lastID = $scope.lastID($scope.contatos);
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contato.id = lastID + 1;
        contatosAPI.saveContato(contato).then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos");
        });
    };

    
});