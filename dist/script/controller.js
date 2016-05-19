/*导航模块*/
var navModule = angular.module('navModule', []);
navModule.controller('navCtrl', function ($scope) {
    $scope.na_li1 = '热门';
    $scope.na_li2 = '舞蹈';
    $scope.na_li3 = '音乐';
    $scope.na_li4 = '外语';
    $scope.na_li5 = '热门话题';
});
navModule.directive('navModule', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/ng_unit/ng_tpls/ng_index/navModule.html',
        link: function (scope, elem, attrs) {
            elem.find('li').bind('click', function () {
                $(this).find('a').addClass('active');
                $(this).siblings().find('a').removeClass('active');
            })
        }
    };
});
/*首页列表模块*/
var list = angular.module('list', []);
/**
 * 首页列表控制器
 * Ctrl
 * listImg/listInfo/listContent
 */
list.controller('listImg', function ($scope, $http, $state) {
    if($state.current.name == 'index') {
        $http.get("/ng-ajax/pop-topic").success(function (response) {
            $scope.popList = response;
        });
    }else if(['dance','music','lang'].indexOf('dance') === 0){
        $http.get("/ng-ajax/topic-in-poly?id=" + $state.params.id).success(function (response) {
            $scope.topicList = response;
        });
    }

});
/**
 * 首页列表图片
 * dir
 * @listImg
 */
list.directive('listImg', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/listImg.html',
        link: function (scope, elem, attrs) {
            elem.bind('mouseover', function () {
                elem.find('div').addClass('c-list-img-active');
            });
            elem.bind('mouseleave', function () {
                elem.find('div').removeClass('c-list-img-active');
            });
        }
    };
});
/**
 * 首页列表信息
 * dir
 * @listImg
 */
list.directive('listInfo', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/listInfo.html',
        link: function (scope, elem, attrs) {
        }
    };
});
/**
 * 首页列表Li
 * dir
 * @listImg
 */
list.directive('listContent', function () {
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            if (scope.$last == true) {
                var line = Math.ceil(elem.parents('.content-list').find('li').length / 4);
                for (var i = 1; i <= line; i++) {
                    elem.parents('.content-list').find('li').eq(i * 4 - 1).css('margin-right', '0');
                }
            }
        }
    };
});
/**
 * 首页免费下载
 * dir
 * @null
 */
list.directive('freeDown', function () {
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                elem.next('.app_down_alert').show();
            });
            elem.next('.app_down_alert').bind('mouseleave', function () {
                $(this).hide();
            })
        }
    }
});
/*内容详情页*/
var content = angular.module('content', []);
/**
 * 内容详情控制器
 * Ctrl
 * contentTitle/contentVideo/contentInfo/thisVideo
 * /contentInfo_Ctrl
 */
content.controller('content', function ($scope, $sce) {
    $scope.title_lang = 'English/中文';
    $scope.title_type = '购买';
    $scope.title_ser = '服务2';
    $scope.title_currentPrice = '$3/10min';
    /*视频文件*/
    $scope.imgUrl = './src/images/gugu.jpg';
    $scope.mediaUrl = 'http://7xnjgr.com5.z0.glb.qiniucdn.com/uploads/topic_video/1462890785414a129.mp4';
    $scope.audio = false;  //是否为音频
    $scope.play_ico = true; //不是音频也不是视频，false隐藏图标
});
/**
 * 内容标题指令
 * dir
 * @content
 */
content.directive('contentTitle', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/contentDetailTitle.html',
        link: function (scope, elem, attrs) {
            $('.nav').hide();
        }
    };
});
/**
 * 内容媒体指令
 * dir
 * @content
 */
content.directive('contentVideo', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/video.html',
        link: function (scope, elem, attrs) {

        }
    };
});
/**
 * 内容信息指令
 * dir
 * @content
 */
content.directive('contentInfo', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/info.html',
        link: function (scope, elem, attrs) {

        }
    };
});
/**
 * 内容主信息（除了图片）控制器
 * Ctrl
 * null
 * @content
 */
content.controller('contentInfoCtrl', function ($scope) {
    $scope.photo_img = './src/images/gugu.jpg';
    $scope.country_img = './src/images/country.png';
    $scope.info_name = 'Nathaniel Valdez';
    $scope.level_lang = 'English';
    $scope.level_num = '2';
    $scope.title = 'There is a lot';
    $scope.info_text = 'There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving, some would say “living” thing because you just never know what you are going to see on any given night of stargazing.';  //是否为音频
    $scope.info_time = '1min age';
    $scope.zan_num = '1988';
    $scope.zf_num = '1988';
});
/**
 * 媒体播放按钮
 * dir
 * @content
 */
content.directive('thisVideo', function () {
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                var load = elem.parents('.video').find('.media');
                load.each(function () {
                    if (!$(this).hasClass('ng-hide')) {
                        $(this).addClass('loading');
                    }
                });
                stopAllMedia();
                elem.hide();
                elem.parents('.video').find('.bg-img').addClass('bottom');
                var elemMedia = elem.prev('.loading')[0];
                elemMedia.play();
                elemMedia.onended = function () {
                    scope.isbottom = false;
                    stopAllMedia();
                };
            });

        }
    };
});
/**
 * 购买弹出层
 * dir
 * @content
 */
content.directive('onFinishRenderFilters', function () {
    return {
        restrict: 'AE',
        link: function (scope, elem, attr) {
            elem.bind('mouseenter', function () {
                $('.alear_main').hide();
                elem.parents('.title').find('.alear_main').show();
            });
            elem.parents('.title').find('.alear_main').on('mouseleave', function () {
                $('.alear_main').hide();
            })
        }
    };
});
/*右部内容*/
var listRight = angular.module('listRight', []);

/**
 * 内容控制器
 * Ctrl
 * contentRight
 */
listRight.controller('contentRightCtrl', function ($scope) {
    $scope.title = '#虎妈猫爸绕口令';
    //$scope.content_img='./src/images/gugu.jpg';
    //$scope.banner='./src/images/gugu.jpg';
});
/**
 * 内容指令器
 * dir
 * @contentRightCtrl
 */
listRight.directive('contentRight', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/contentRight.html',
        link: function (scope, elem, attrs) {

        }
    };
});

/**
 * 个人页控制器
 * Ctrl
 * selfRight
 */
listRight.controller('selfRightCtrl', function ($scope) {
    $scope.photo_img = './src/images/gugu.jpg';
    $scope.sex_img = './src/images/h5_male_icon.png';
    $scope.country_img = './src/images/country.png';
    $scope.level_lang = 'English';
    $scope.level_num = '3';
    $scope.zodiac = '天秤座';
    $scope.professional = '设计师';
    $scope.tip_num = '412';
    $scope.join_man = '412';
    $scope.care_man = '412';
    $scope.self_info = 'Ever left a nail salon with more than you bargained for – an infection? Some nail salons are havens for bacteria and germs, and a small cuticle cut can cause a serious fungal infection if proper hygiene techniques are not followed through.';
    $scope.banner = './src/images/gugu.jpg';
});
/**
 * 个人页指令
 * dir
 * @selfRightCtrl
 */
listRight.directive('selfRight', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/selfRight.html',
        link: function (scope, elem, attrs) {

        }
    };
});

/**
 * 话题控制器
 * Ctrl
 * topicRight
 */
listRight.controller('topicRightCtrl', function ($scope) {
    $scope.title = data.title;
    $scope.hot = '#虎妈猫爸绕口令';
    $scope.tip_num = '412';
    $scope.join_man = '412';
    $scope.care_man = '412';
    $scope.banner = './src/images/gugu.jpg';
});
/**
 * 话题页指令
 * dir
 * @topicRightCtrl
 */
listRight.directive('topicRight', function () {
    return {
        restrict: 'AE',
        templateUrl: '/ng_unit/ng_tpls/ng_index/topicRight.html',
        link: function (scope, elem, attrs) {

        }
    };
});
/*热门话题列表*/
var hotTopic = angular.module('hotTopic', []);
/**
 * 热门话题列表控制器
 * Ctrl
 * topicImg
 */
hotTopic.controller('hotTopicCtrl', function ($scope, $http) {
    $http.get("/ng-ajax/topic-in-poly-ng?id=1&type=pop").success(function (response) {
        $scope.hotTopics = response;
    });
});
/**
 * 热门话题内容指令器
 * dir
 * @hotTopicCtrl
 */
hotTopic.directive('topicImg', function () {
    return {
        restrict: 'AE',
        template: '<a ui-sref="topic"><div style="background-image:url({{bg_img}})"></div></a>',
        link: function (scope, elem, attrs) {
            elem.find('div').bind('mouseover', function () {
                elem.find('div').addClass('c-list-img-active');
            });
            elem.find('div').bind('mouseleave', function () {
                elem.find('div').removeClass('c-list-img-active');
            });
        }
    };
});