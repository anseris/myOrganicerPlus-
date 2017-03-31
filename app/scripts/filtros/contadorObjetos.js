angular.module('myEasyOrganicer').filter('objectKeysLength', [function() {
    return function(items) {
        if(items!==undefined){
           return Object.keys(items).length;
       }
    };
}]);
