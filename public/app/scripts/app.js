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
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'toaster',
    'ui.mask',
    'ngDialog'
  ])
  .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

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
        url:'/client?id',
        controller: 'ClientCtrl',
        resolve: {
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
          currencies: function (Util) {
            return new Util().getApiData('CURRENCY');
          }
        }
    })
    .state('dashboard.employee',{
        templateUrl:'views/pages/employee.html',
        url:'/employee?id',
        controller: 'EmployeeCtrl',
        resolve: {
          addressData: function (Util) {
            return new Util().getAddressData();
          },
          currencies: function (Util) {
            return new Util().getApiData('CURRENCY');
          }
        }
    })
    .state('dashboard.item',{
        templateUrl:'views/pages/item.html',
        url:'/item?id',
        controller: 'ItemCtrl',
        resolve: {
          itemTypes: function (ItemType) {
            return new ItemType().find();
          },
          accounts: function (Account) {
            return new Account().find();
          }
        }
    })
    .state('dashboard.account',{
        templateUrl:'views/pages/account.html',
        url:'/account',
        controller: 'AccountCtrl',
        resolve: {
          currencies: function (Util){
            return new Util().getApiData('CURRENCY');
          },
          accountTypes: function(AccountType){
            return new AccountType().find();
          },
          banks: function(Util){
            return new Util().getApiData('BANK');
          },
          superAccounts: function(Account){
            return new Account().find();
          }
        }
    })
    .state('dashboard.invoice',{
        templateUrl:'views/pages/invoice.html',
        url:'/invoice',
        controller: 'InvoiceCtrl',
        resolve: {
          clients : function(Client){
            return new Client().find();
          },
          accounts: function(Account){
            return new Account().find();
          },
          paymentMethods: function(Util){
            return new Util().getApiData('PAYMENTMETHOD');
          },
          conditions: function(Util){
            return new Util().getApiData('CONDITION');
          },
          items: function (Item) {
            return new Item().find();
          }
        }
    })
    .state('dashboard.bill',{
        templateUrl:'views/pages/bill.html',
        url:'/bill',
        controller: 'BillCtrl',
        resolve: {
          providers : function(Vendor){
            return new Vendor().find();
          },
          accounts: function(Account){
            return new Account().find();
          },
          paymentMethods: function(Util){
            return new Util().getApiData('PAYMENTMETHOD');
          },
          conditions: function(Util){
            return new Util().getApiData('CONDITION');
          }
        }
    })
    .state('dashboard.clientList',{
        templateUrl:'views/pages/clientList.html',
        url:'/clientList',
        controller: 'ClientListCtrl'
    })
    .state('dashboard.employeeList',{
        templateUrl:'views/pages/employeeList.html',
        url:'/employeeList',
        controller: 'EmployeeListCtrl'
    })
    .state('dashboard.itemList',{
        templateUrl:'views/pages/itemList.html',
        url:'/itemList',
        controller: 'ItemListCtrl'
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
    .state('dashboard.shipment', {
        templateUrl:'views/pages/shipment.html',
        url:'/shipment',
        controller: 'ShipmentCtrl',
        resolve: {
          quotations: function(Quotation){
            return new Quotation().find();
          },
          clients : function(Client){
            return new Client().find();
          },
          currencies: function (Util){
            return new Util().getApiData('CURRENCY');
          },
          agents : function(Agent){
            return new Agent().find();
          },
          markets : function(Util){
            return new Util().getApiData('COUNTRY');
          },
          loadingPorts : function(Util){
            return new Util().getApiData('PORT');
          },
          dischargePorts : function(Util){
            return new Util().getApiData('PORT');
          }
        }
    })
    .state('dashboard.quote',{
      templateUrl:'views/pages/quote.html',
      url:'/quote',
      controller: 'QuoteCtrl',
      resolve: {
        clients : function(Client){
          return new Client().find();
        },
        currencies: function (Util){
          return new Util().getApiData('CURRENCY');
        },
        loadingPorts : function(Util){
          return new Util().getApiData('PORT');
        },
        dischargePorts : function(Util){
          return new Util().getApiData('PORT');
        }
    }})
    .state('dashboard.itemType',{
      templateUrl:'views/pages/itemType.html',
      url:'/itemType',
      controller: 'ItemTypeCtrl',
    })
    .state('dashboard.accountType',{
      templateUrl:'views/pages/accountType.html',
      url:'/accountType',
      controller: 'AccountTypeCtrl',
    })
    .state('dashboard.bank',{
      templateUrl:'views/pages/bank.html',
      url:'/bank',
      controller: 'BankCtrl',
    })
    .state('dashboard.port',{
      templateUrl:'views/pages/port.html',
      url:'/port',
      controller: 'PortCtrl',
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
