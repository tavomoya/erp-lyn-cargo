'use strict';
/**
 * @ngdoc overview
 * @name erpLynCargoApp
 * @description
 * # erpLynCargoApp
 *
 * Main module of the application.
 */
angular
  .module('erpLynCargoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngAnimate',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'toaster'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html'
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html'
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.client',{
        templateUrl:'views/pages/client.html',
        url:'/client',
        controller: 'ClientCtrl',
        resolve: {
          countries: function (Util) {
            return new Util().getApiData('COUNTRY');
          }, 
          provincias: function (Util) {
            return new Util().getApiData('PROVINCIA');
          },
          sectores: function (Util) {
            return new Util().getApiData('MUNICIPIO');
          },
          currencies: function (Util) {
            return new Util().getApiData('CURRENCY');
          }
        }
    })
    .state('dashboard.vendor',{
        templateUrl:'views/pages/vendor.html',
        url:'/vendor',
        controller: 'VendorCtrl',
        resolve: {
          countries: function (Util) {
            return new Util().getApiData('COUNTRY');
          }, 
          provincias: function (Util) {
            return new Util().getApiData('PROVINCIA');
          },
          sectores: function (Util) {
            return new Util().getApiData('MUNICIPIO');
          },
          currencies: function (Util) {
            return new Util().getApiData('CURRENCY');
          }
        }
    })
    .state('dashboard.agent',{
        templateUrl:'views/pages/agent.html',
        url:'/agent',
        controller: 'AgentCtrl',
        resolve: {
          countries: function (Util) {
            return new Util().getApiData('COUNTRY');
          }, 
          provincias: function (Util) {
            return new Util().getApiData('PROVINCIA');
          },
          sectores: function (Util) {
            return new Util().getApiData('MUNICIPIO');
          },
          currencies: function (Util) {
            return new Util().getApiData('CURRENCY');
          }
        }
    })
    .state('dashboard.employee',{
        templateUrl:'views/pages/employee.html',
        url:'/employee',
        controller: 'EmployeeCtrl'
    })
    .state('dashboard.item',{
        templateUrl:'views/pages/item.html',
        url:'/item',
        controller: 'ItemCtrl',
        resolve: {
          itemTypes: function (ItemType) {
            return new ItemType().find();
          }
        }
    })
    .state('dashboard.account',{
        templateUrl:'views/pages/account.html',
        url:'/account'
    })
    .state('dashboard.invoice',{
        templateUrl:'views/pages/invoice.html',
        url:'/invoice'
    })
    .state('dashboard.bill',{
        templateUrl:'views/pages/bill.html',
        url:'/bill'
    })
    .state('dashboard.payroll',{
        templateUrl:'views/pages/payroll.html',
        url:'/payroll'
    })
    .state('dashboard.client_statement',{
        templateUrl:'views/pages/client_statement.html',
        url:'/client_statement'
    })
    .state('dashboard.provider_statement',{
        templateUrl:'views/pages/provider_statement.html',
        url:'/provider_statement'
    })
    .state('dashboard.accountMovements',{
        templateUrl:'views/pages/accountMovements.html',
        url:'/accountMovements'
    })
    .state('dashboard.shipment',{
        templateUrl:'views/pages/shipment.html',
        url:'/shipment',
        controller: 'ShipmentCtrl'
    })
    .state('dashboard.quote',{
        templateUrl:'views/pages/quote.html',
        url:'/quote',
        controller: 'QuoteCtrl'
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl'
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);
