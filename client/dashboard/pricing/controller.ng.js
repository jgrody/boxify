angular.module('boxify').controller('BoxesDashboardPricingController',
function($scope, $meteor, box, boxifyDialog){
  window.scope = $scope;
  // Stops meteor reactivity for box so user can continue updating inputs
  // and the browser won't automatically reload on them.
  box.stop();

  $scope.tier = {
    checkins: 0,
    price: 0,
    extras: [{}]
  }
  var blankTier = angular.copy($scope.tier);

  $scope.addNewItem = function(index, last, tier){
    tier.extras[index].canDelete = true;

    if (last) {
      tier.extras.push({});
    }
  }

  $scope.saveTier = function(tier){
    tier = mapTier(tier);
    $scope.toggleEditing(tier);
    box.save();
  }

  $scope.cancelSave = function(tier){
    box.reset();
    $scope.toggleEditing(tier);
    box.save();
  }

  $scope.toggleEditing = function(tier){
    tier.editing = !tier.editing;
  }

  $scope.addExtra = function(tier){
    tier.extras.push({})
  }

  $scope.deleteTier = function(tier){
    var confirm = boxifyDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are you sure you want to delete this tier?')
      .ariaLabel('Delete Tier')
      .ok('Yes')
      .cancel('No')

    boxifyDialog.show(confirm).then(function(){
      return box.pricingTiers.remove(tier);
    })
  }

  $scope.deleteExtra = function(tier, extra){
    var confirm = boxifyDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are you sure you want to delete this extra?')
      .ariaLabel('Delete Extra')
      .ok('Yes')
      .cancel('No')

    boxifyDialog.show(confirm).then(function(){
      tier.extras.remove(extra);
      return box.save();
    })
  }

  $scope.addTier = function(ev){
    box.pricingTiers.push(blankTier);
  }

  function mapTier(tier){
    tier.extras = tier.extras.remove(function(extra){
      return Object.isEmpty(extra);
    });
    return tier;
  }
})
