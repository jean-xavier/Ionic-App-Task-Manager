function getTasks(){

    this.itens = [];

    var lista = localStorage.getItem("tasklist");

    if (lista !== null) {
        this.itens = angular.fromJson(lista);
    }

    this.save = function(){
        var lista = angular.toJson(this.itens);
        localStorage.setItem("tasklist", lista);
    }

    this.add = function(item){
        this.itens.push(item);
    };

    this.remove = function(item){
        var position = this.itens.indexOf(item);
        this.itens.splice(position, 1);
    };
}
