angular.module('boxify').controller('BoxesDashboardPricingController',
function($scope, $meteor, box, boxifyDialog, toast){
  window.scope = $scope;
  // Stops meteor reactivity for box so user can continue updating inputs
  // and the browser won't automatically reload on them.
  box.stop();

  var blankTier = {
    checkins: 0,
    price: 0,
    extras: [{}],
    editing: true,
    canDelete: true
  }

  $scope.addNewItem = function(index, last, tier){
    tier.extras[index].canDelete = true;

    if (last) {
      tier.extras.push({});
    }
  }

  $scope.saveTier = function(tier){
    tier = mapTier(tier);
    tier.extras.each(markAsCanDelete);
    $scope.toggleEditing(tier);
    saveBox();
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

  $scope.deleteExtra = function(tier, $index){
    tier.extras.removeAt($index);
  }

  $scope.addTier = function(){
    box.pricingTiers.push(blankTier);
  }

  function mapTier(tier){
    tier.extras = tier.extras.remove(function(extra){
      return Object.isEmpty(extra);
    });
    return tier;
  }

  function saveBox(){
    box.save().then(function(){
      toast({
        type: "success",
        title: "Success",
        message: "Tier saved."
      })
    })
  }

  function markAsCanDelete(extra){
    extra.canDelete = true;
  }

})
