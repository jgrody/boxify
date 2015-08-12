angular.module('boxify').controller('BoxesDashboardPricingController',
function($scope, $meteor, boxifyDialog, boxifyCall){
  window.scope = $scope;
  $scope.boxes = $meteor.collection(Boxes).subscribe('boxes');

  $scope.tier = {
    checkins: 0,
    price: 0,
    extras: [{ placeholder: 'Unlimited open gym...' }]
  }
  var blankTier = angular.copy($scope.tier);

  $scope.addNewItem = function(index, tier){
    tier.extras[index].disabled = true;
    $scope.tier.extras.push({});
  }

  $scope.addTier = function(tier){
    $scope.box.pricingTiers.push(mapTier(tier));
    // $scope.boxes.save($scope.box);
  }

  $scope.deleteTier = function(tier){
    $scope.box.pricingTiers.remove(tier);
  }

  function mapTier(tier){
    tier.extras = tier.extras.map('description').compact();
    return tier;
  }

  $scope.openAddTierDialog = function(ev){
    $scope.box.pricingTiers.push(blankTier);
    // return boxifyDialog.show({
    //   controller: 'DashboardAddPriceTierController',
    //   templateUrl: 'client/dashboard/pricing/add/template.ng.html',
    //   parent: angular.element(document.body),
    //   targetEvent: ev,
    //   locals: {
    //     box: box
    //   }
    // })
  }

})
