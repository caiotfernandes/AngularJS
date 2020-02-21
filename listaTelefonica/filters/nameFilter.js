angular.module("listaTelefonica").filter("name", function () {
    return function (input) {
        var listaNomes = input.split(" ");
        var listaFormatada = listaNomes.map( function (nome) {
            if(nome.length <= 2) {
                return nome.toLowerCase();
            } 
            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase(); 
        });
        return listaFormatada.join(" ");
    };
});