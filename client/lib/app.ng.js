angular.module('boxify', [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'ngMessages'
]);

var themeIcons = function ($mdIconProvider) {
  $mdIconProvider
    .defaultFontSet('fontawesome')
    .iconSet("social", spritePath("svg-sprite-social"))
    .iconSet("action", spritePath("svg-sprite-action"))
    .iconSet("communication", spritePath("svg-sprite-communication"))
    .iconSet("content", spritePath("svg-sprite-content"))
    .iconSet("toggle", spritePath("svg-sprite-toggle"))
    .iconSet("navigation", spritePath("svg-sprite-navigation"))
    .iconSet("image", spritePath("svg-sprite-image"))
    .iconSet("maps", spritePath("svg-sprite-maps"));
};

angular.module('boxify')
  .config(themeIcons);

function spritePath(svg) {
  return [
    "/packages/planettraining_material-design-icons/bower_components/",
    "material-design-icons/sprites/svg-sprite/",
    svg,
    ".svg"
  ].join("");
}