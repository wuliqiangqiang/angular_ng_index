var app = angular.module('myApp', ['ui.router','navModule','list','content','listRight','hotTopic']);
	app.config(['$stateProvider', '$urlRouterProvider',
	  function($stateProvider, $urlRouterProvider) {
	  	$urlRouterProvider.when('', '/index').otherwise('/index');
	    $stateProvider.state('index', {
        url: '/index',
          templateUrl : 'view/index_content.html',
          onEnter:function(){
            $('.nav').find('li').eq(0).find('a').addClass('active');
          }
        }).
        state('dance', {
      		url: '/dance',
    			templateUrl : 'view/dance_content.html',
          /*templateUrl: function (stateParams){
            return '/partials/contacts.' + stateParams.filterBy + '.html';
          }*/
    			onEnter:function(){
    				$('.nav').find('li').eq(1).find('a').addClass('active');
    			}
        }).
        state('music', {
      		url: '/music',
    			templateUrl : 'view/music_content.html',
    			onEnter:function(){
    				$('.nav').find('li').eq(2).find('a').addClass('active');
    			}
        }).
        state('lang', {
      		url: '/lang',
    			templateUrl : 'view/lang_content.html',
    			onEnter:function(){
    				$('.nav').find('li').eq(3).find('a').addClass('active');
    			}
        }).
        state('hotTopic', {
      		url: '/hotTopic',
    			templateUrl : 'view/hotTopic_content.html',
    			onEnter:function(){
    				$('.nav').find('li').eq(4).find('a').addClass('active');
    			}
        }).
        state('contentDetail', {
      		url: '/contentDetail',
    			templateUrl : 'view/contentDetail.html',
        }).
        state('topic', {
      		url: '/topic',
    			templateUrl : 'view/topicDetail.html',
        }).
        state('self', {
      		url: '/self?type&role',
    			templateUrl : 'view/selfDetail.html',
          controller:function($stateParams){
            console.log($stateParams);
          }
        })
	  }
	]);

/* 显隐导航条 */
app.run(function($rootScope){
	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
    if(toState){
      $('.nav').find('li a').removeClass('active');
    }
    if(toState.url == '/contentDetail' || toState.url == '/topic' || toState.url == '/self'){
    	$('.nav').hide();
    }else if (toState.url != '/topic'){
    	$('.nav').show();
    }
	});
	$rootScope.$on('$stateChangeSuccess', 
	function(event, toState, toParams, fromState, fromParams){
	});
})

app.directive('footer',function(){
  return {
    restrict : 'AE',
    link:function(scope,elem,attr){
      var i = 0;
      setInterval(function(){
        elem.find('span').eq(i).addClass('ani-load').siblings().removeClass('ani-load');
        i++;
        if(i==4){
          i = 0;
        }
      },100);
    }
  }
})

app.directive('loadData',function($location,$state){
  return{
    restrict : 'AE',
    link:function(scope,elem,attr){
      $(window).scroll(function(){
        if($(document).scrollTop() >= $(document).height()-$(window).height()){
          clearTimeout(t);
          var t = setTimeout(function(){
            var path = $state.current.name;  /*当前路由位置*/
            scope.load(path);
          },300);
        } 
      })
    },
    controller:'routerLoadCtrl',
    scope:{
      load:'&load'
    }
  }
})

app.controller('routerLoadCtrl',function($scope){
  $scope.load = function(type){
    alert(type);
  }
})