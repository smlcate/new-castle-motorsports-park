var app = angular.module('mainApp', ['ui.router'])
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    // // HOME STATES AND NESTED VIEWS ========================================
    .state('about', {
        url: '/',
        templateUrl: './partials/about.html'
    })
    .state('kartowners', {
        url: '/kartowners',
        templateUrl: './partials/kartOwners.html'
    })
    .state('kartrentals', {
        url: '/kartrentals',
        templateUrl: './partials/kartRentals.html'
    })
    .state('hours', {
        url: '/hours',
        templateUrl: './partials/hours.html'
    })
    .state('events', {
        url: '/events',
        templateUrl: './partials/events.html'
    })


})
