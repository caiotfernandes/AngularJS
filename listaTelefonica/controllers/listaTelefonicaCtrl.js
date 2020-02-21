angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, operadorasAPI, contatosAPI, serialGenerator) {
    $scope.app = "Lista Telefonica";
    // $scope.contatos = [
    //     {nome: uppercaseFilter("Pedro"), telefone: "99999-4545", data: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}, cor: "red"},
    //     {nome: "Ana", telefone: "99999-1616", data: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}, cor: "yellow"},
    //     {nome: "Maria", telefone: "99999-1212", data: new Date(), operadora: {nome: "Tim", codigo: 16, categoria: "Celular"}, cor: "green"}
    // ];
    $scope.contatos = [];

    // $scope.operadoras = [
    //     {nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
    //     {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
    //     {nome: "Tim", codigo: 16, categoria: "Celular", preco: 34},
    //     {nome: "GVT", codigo: 45, categoria: "Fixo", preco: 55},
    //     {nome: "Embratel", codigo: 46, categoria: "Fixo", preco: 23}
    // ];

    $scope.operadoras = [];

    var carregarContatos = function () {
        contatosAPI.listContatos().then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (error) {
            console.log(error);
            $scope.errorTitle = "Aconteceu um problema";
            $scope.errorMessage = "Não foi possível conectar a API"
        });
    }

    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras().then(function (response) {
            $scope.operadoras = response.data;
        });
    }

    $scope.adicionarContato = function (contato) {
        
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
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

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        })
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrder = campo;
        $scope.direcaoOrder = !$scope.direcaoOrder;
    };

    carregarContatos();
    carregarOperadoras();
});