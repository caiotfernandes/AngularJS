angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, operadoras, contatos, contatosAPI, serialGenerator) {
    $scope.app = "Lista Telefonica";
    
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    var generateSerial = function (contatos) {
        contatos.forEach( function(item) {
            item.serial = serialGenerator.generate();
        })
    };

    $scope.apagarContatos = function (contatos) {
        contatos.filter( function (contato) {
            if (contato.selecionado)  {
                contatosAPI.deleteContatos(contato).then( function (response) {
                    console.log(response);
                }).catch( function (erro) {
                    console.log(erro);
                });
            }
        });
        carregarContatos();
        
    };

    var carregarContatos = function () {
        contatosAPI.listContatos().then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (error) {
            console.log(error);
            $scope.errorTitle = "Aconteceu um problema";
            $scope.errorMessage = "Não foi possível conectar a API"
        });
    }

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        })
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrder = campo;
        $scope.direcaoOrder = !$scope.direcaoOrder;
    };

    generateSerial($scope.contatos);
});