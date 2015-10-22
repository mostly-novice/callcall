'use strict';

angular.module('supercall')
  .controller('RecordsController', ['$scope', '$modal', 'resolvedRecords', 'Records',
    function ($scope, $modal, resolvedRecords, Records) {

      $scope.sortOptions = [
          'filename', 'filecreationdate', 'filesize'
      ];

      $scope.selected = $scope.sortOptions[1];

      $scope.Records = resolvedRecords;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.Records = Records.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        // TODO: delete from filesystem on delete
        Records.delete({id: id},
          function () {
            $scope.Records = Records.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Records.update({id: id}, $scope.Records,
            function () {
              $scope.Records = Records.query();
              $scope.clear();
            });
        } else {
          Records.save($scope.Records,
            function () {
              $scope.Records = Records.query();
              $scope.clear();
            });
        }
      };

      $scope.openFile = function(id) {
        // Records.open()
        // WILO
      }

      $scope.clear = function () {
        $scope.Records = {
          
          "id": "",
          
          "filename": "",
          
          "filesize": "",
          
          "filecreationdate": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var RecordsSave = $modal.open({
          templateUrl: 'Records-save.html',
          controller: 'RecordsSaveController',
          resolve: {
            Records: function () {
              return $scope.Records;
            }
          }
        });

        RecordsSave.result.then(function (entity) {
          $scope.Records = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('RecordsSaveController', ['$scope', '$modalInstance', 'Records',
    function ($scope, $modalInstance, Records) {
      $scope.Records = Records;

      
      $scope.filecreationdateDateOptions = {
        dateFormat: 'yy-mm-dd',
        
        
      };

      $scope.ok = function () {
        $modalInstance.close($scope.Records);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
