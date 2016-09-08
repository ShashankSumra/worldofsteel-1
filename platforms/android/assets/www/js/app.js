// Ionic Starter App
var globalip = "45.79.145.23/truhome.co/public_html/phonegapservices";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$state,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	//show a exit app confirm modal 
	$ionicPlatform.registerBackButtonAction(function(event) {
    	if (true) { // your check here
      		$ionicPopup.confirm({
				title: 'Worldofsteel',
				template: 'are you sure you want to exit?'
      		}).then(function(res) {
				if (res) {
					ionic.Platform.exitApp();
				}
      		})
    	}
  	},100);
	
	//one signal code
	var notificationOpenedCallback = function(jsonData) {
		//console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
		var data = { origin:jsonData.additionalData.origin, quantity:jsonData.additionalData.quantity, thickness:jsonData.additionalData.thickness, width:jsonData.additionalData.width, length:jsonData.additionalData.length, currency:jsonData.additionalData.currency, price:jsonData.additionalData.price,heading:jsonData.additionalData.heading};
		$state.go('app.offers-detail',data);
	};

	window.plugins.OneSignal.init("1eb095de-4015-4a67-899b-e38da22ae0df",
									{googleProjectNumber: "600906789732"},
									notificationOpenedCallback);
  
	// Show an alert box if a notification comes in when the user is in your app.
	window.plugins.OneSignal.enableInAppAlertNotification(true);
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('app.offers', {
      url: '/offers',
      views: {
        'menuContent': {
          templateUrl: 'templates/offers.html',
          controller: 'offersCtrl'
        }
      }
    })
	.state('app.offers-detail', {
      url: "/offers-detail/:origin?quantity?thickness?width?length?currency?heading?price",
      views: {
        'menuContent' :{
          templateUrl: "templates/offers-detail.html",
		  controller: "offers_detailCtrl"
        }
      }
    })
  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })
  .state('app.getinformation', {
      url: "/getinformation",
      views: {
        'menuContent' :{
          templateUrl: "templates/getinformation.html",
        }
      }
    })
	.state('app.emailus', {
      url: "/emailus",
      views: {
        'menuContent' :{
          templateUrl: "templates/emailus.html",
		  controller: "emailCtrl"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
})

.directive('map', function() {
	return {
		restrict: 'E',
		scope: {
		  onCreate: '&'
		},
		link: function ($scope, $element, $attr) {
		  function initialize() {
			var myLatLng = {lat: 27.9769145, lng: -82.5590481};
			var mapOptions = {
			  center: new google.maps.LatLng(27.9769145, -82.5590481),
			  zoom: 14,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($element[0], mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				label: "A",
				content:"Hello World!"
			});
			var infowindow = new google.maps.InfoWindow({
			  content:"5424 Ginger Cove Dr"
			});
			infowindow.open(map,marker);
			
			$scope.onCreate({map: map});
	
			// Stop the side bar from dragging when mousedown/tapdown on the map
			google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
			  e.preventDefault();
			  return false;
			});
		  }
	
		  if (document.readyState === "complete") {
			initialize();
		  } else {
			google.maps.event.addDomListener(window, 'load', initialize);
		  }
		}
  	}
});


