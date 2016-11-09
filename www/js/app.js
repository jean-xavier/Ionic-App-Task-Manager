// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate){
    var tasks = new getTasks();

    $scope.lista = tasks.itens;
    $scope.showMarked = false;
    $scope.removeStatus = false;

    $scope.onMarkTask = function (item) {
        item.finalizada = !item.finalizada;
        tasks.save();
    };

    $scope.onHideItem = function(item){
        return item.finalizada && !$scope.showMarked;
    };

    function getItem(item, newTask){
        $scope.data = {};
        $scope.data.newNameTask = item.nome;
        var titleAction = newTask ? 'Nova Tarefa' : 'Alterar Tarefa';

        $ionicPopup.show({
            template: '<input type="text" placeholder="Digite o nome da tarefa" autofocus="true" ng-model="data.newNameTask">',
            title: titleAction,
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Salvar</b>',
                    type: 'button-positive',
                    onTap: function(e){
                        if(!$scope.data.newNameTask){
                            e.preventDefault();
                        }else{
                            item.nome = $scope.data.newNameTask;
                            if (newTask){
                                tasks.add(item);
                            }
                            tasks.save();
                        }
                    }
                }
            ]
        });
        $ionicListDelegate.closeOptionButtons();
    };

    $scope.onItemEdit = function(item){
        getItem(item, false);
    }

    $scope.onItemAdd = function(){
        var item = {nome: "", finalizada:false};
        getItem(item, true);
    };

    $scope.onItemRemove = function(item){
        tasks.remove(item);
        tasks.save();
    };

    $scope.onClickRemove = function(){
        $scope.removeStatus = !$scope.removeStatus;
    };
})
