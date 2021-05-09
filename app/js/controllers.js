angular.module('runtimeBuilder.controllers', []).

  /* personList controller */
  controller('personListController', function ($scope, $rootScope) {

    $scope.bro = 'http://localhost:4200';
    $scope.person = {};
    $scope.personList = [
      {
        id: 1,
        firstName: 'Andrei',
        lastName: 'Popa',
        gender: 'm',
        email: 'andrei.popa@gmail.com',
        phone: '+123123455',
        template: `<h1>{{person.firstName}} {{person.lastName}}</h1>
      <strong *ngIf="!!person.email"> Email: {{person.email}} </strong>`  },
      {
        id: 2,
        firstName: 'Elon',
        lastName: 'Musk',
        gender: 'm',
        email: 'musk@spacex.com',
        phone: '+123123455',
        template: `<h1>{{person.firstName}} {{person.lastName}}</h1>
      <strong *ngIf="!!person.email"> Email: {{person.email}} </strong>`  }
    ];

    $scope.channel = new BroadcastChannel("messageBus_selectedPerson");
    $scope.channel.addEventListener("message", e => {
     
      var found = null;
      angular.forEach($scope.personList, x => {
        if (x.id === e.data.id) {
          found = true;
          Object.assign(x, e.data);
        }
      });

      if(!found){
        $scope.personList.push(e.data);
      }

      $scope.$apply();
    });


    $scope.selectedPerson = function (person) {
      $scope.selected = person;

      var win = window.frames.target;
      win.postMessage("сообщение",  $scope.bro);

      $rootScope.$emit('personChanged', $scope);
    }

    $scope.addPerson = function () {
      $scope.person.id =  $scope.personList.length + 1; 
      $scope.personList.push($scope.person);
      $scope.selected = $scope.person;
      $scope.channel.postMessage($scope.person);
    }



    $scope.render = function () {
      $rootScope.$emit('personChanged', $scope);
    }

    $scope.save = function () {
      $scope.render();
      $scope.channel.postMessage($scope.person);
    }
  })
  .directive('runtime', function () {
    var controller = ['$scope', '$rootScope', '$element', '$compile', function ($scope, $rootScope, $element, $compile) {


      $rootScope.$on('personChanged', function (event, data) {
        $scope.render(data);
      });

      $scope.render = function (parent) {
        var $el = angular.element(parent.selected.template);
        $element.em
        var link = $compile($el)
        var $newScope = parent.$new();

        Object.assign($newScope, { person: parent.selected });
        link($newScope);
        $element.empty()
        $element.append($el);
      }
    }]
    return {
      restrict: 'E',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        person: "=",
      },
      controller: controller
    }
  });
