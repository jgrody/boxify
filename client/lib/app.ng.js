angular.module('boxify', [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'ngFileUpload',
  'ngImgCrop'
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
    .iconSet("maps", spritePath("svg-sprite-maps"))
    .iconSet("hardware", spritePath("svg-sprite-hardware"))
    .iconSet("editor", spritePath("svg-sprite-editor"))
};

var palettes = function($mdThemingProvider){
  var customBlueMap = $mdThemingProvider
    .extendPalette('light-blue', {
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50'],
      '50': 'ffffff'
    });

  $mdThemingProvider.definePalette('customBlue', customBlueMap);

  $mdThemingProvider
  .theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    }).accentPalette('pink');

  $mdThemingProvider.theme('input', 'default').primaryPalette('grey')
}


angular.module('boxify')
  .config(themeIcons)
  .config(palettes);

function spritePath(svg) {
  return [
    "/packages/planettraining_material-design-icons/bower_components/",
    "material-design-icons/sprites/svg-sprite/",
    svg,
    ".svg"
  ].join("");
}