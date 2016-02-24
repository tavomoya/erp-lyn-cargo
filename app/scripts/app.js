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
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
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
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'erpLynCargoApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'erpLynCargoApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.client',{
        templateUrl:'views/pages/client.html',
        url:'/client',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'erpLynCargoApp',
              files:[
              'scripts/directives/entity/entity.js',
              ]
            })
          }
        }
    })
    .state('dashboard.vendor',{
        templateUrl:'views/pages/vendor.html',
        url:'/vendor',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'erpLynCargoApp',
              files:[
              'scripts/directives/entity/entity.js',
              ]
            })
          }
        }
    })
    .state('dashboard.agent',{
        templateUrl:'views/pages/agent.html',
        url:'/agent',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'erpLynCargoApp',
              files:[
              'scripts/directives/entity/entity.js',
              ]
            })
          }
        }
    })
    .state('dashboard.employee',{
        templateUrl:'views/pages/employee.html',
        url:'/employee',
        controller: 'EmployeeCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'erpLynCargoApp',
              files:[
              'scripts/directives/entity/entity.js',
              'scripts/controllers/employee.js'
              ]
            })
          }
        }
    })
    .state('dashboard.item',{
        templateUrl:'views/pages/item.html',
        url:'/item'
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
    .state('dashboard.shipment',{
        templateUrl:'views/pages/shipment.html',
        url:'/shipment',
        controller: 'ShipmentCtrl',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'erpLynCargoApp',
              files: ['scripts/controllers/shipment.js']
            })
          }
        }
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'erpLynCargoApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
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

    
