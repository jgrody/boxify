angular.module('boxify')
.controller('BoxesDashboardSettingsController',
  function($scope, $rootScope, $meteor, boxifyDialog){
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

  function AddLogoController($scope, $meteor, $rootScope, $state){
    window.scope = $scope;
    $scope.myAreaCoords = {};
    $scope.image = {
      imageSrc: '',
      myCroppedImage: ''
    };

    $scope.addImages = function (files) {
      if (files.length > 0) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $scope.$apply(function() {
            $scope.image.imageSrc = e.target.result;
            $scope.image.myCroppedImage = '';
          })
        };

        reader.readAsDataURL(files[0]);
      }
      else {
        $scope.image.imageSrc = undefined;
      }
    };

    $scope.saveCroppedImage = function() {
      if ($scope.image.myCroppedImage !== '') {
        var fileObject = new FS.File($scope.image.myCroppedImage);
        // fileObject.metadata = {
        //   owner: $rootScope.currentUser._id,
        //   description: '',
        //   order: newOrder
        // };


        $scope.images.save(fileObject).then(function(result) {
          $scope.uploadedImage = result[0]._id;
          $scope.answer(true);
        });
      }
    };

    $scope.answer = function(saveImage) {
      if (saveImage) {
        boxifyDialog.hide($scope.uploadedImage);
      }
      else {
        if ($scope.uploadedImage) {
          $scope.images.remove($scope.uploadedImage._id);
        }

        boxifyDialog.hide();
      }
    }
  }

  $scope.openAddImageModal = function() {
    return boxifyDialog.show({
      parent: angular.element(document.body),
      controller: AddLogoController,
      scope: $scope.$new(),
      templateUrl: 'client/dashboard/settings/logo-modal.ng.html',
    }).then(function(image) {
      // We will add here later the logic to handle the link between the image and the party
    });
  };
}).directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});;