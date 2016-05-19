/**
 * url过滤器
 */
content.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);

/**
 * 发布时间格式化过滤器
 */
list.filter('timeDiff', function () {
    return function (input) {
        var time = formatTimeDiff(input);
        switch (time.type){
            case 'one':
                w = '一分钟内';break;
            case 'min':
                w = '分钟前';break;
            case 'hour':
                w = '小时前';break;
            case 'day':
                w = '天前';break;
        }
        return time.timeDiff + w;
    };
});

/**
 * 国旗显示过滤器
 */
list.filter('country', function () {
    return function (input) {
        return getNationalFlag(input);
    };
});

/**
 * 话题类型过滤器
 */
list.filter('payType', function () {
    return function (input) {
        switch (input) {
            case 1:
                type = '悬赏';
                break;
            case 2:
                type = '服务';
                break;
            case 3:
                type = '动态';
                break;
        }
        return type;
    };
});

/*停止全部媒体播放*/
function stopAllMedia() {
    $('.loading').each(function () {
        var media = $(this)[0];
        //console.log(media);
        media.load();
    });
    $('.play_ico').show();
    $('.bg-img').removeClass('bottom');
}

/**
 * 时间戳转小时数
 * @param timestamp
 * @returns {string}
 */
//格式化发布时间
function formatTimeDiff(time_diff)
{
    time_diff /= 1000;
    var timeDiff = 1;
    var type = 'one';
    var day = time_diff / (24 * 60 * 60);
    if(day >= 1){
        timeDiff = (day + 1).toFixed(0);
        type = 'day';
    }else{
        var hour = time_diff / (60 * 60);
        if(hour > 1){
            timeDiff = (hour + 1).toFixed(0);
            type = 'hour';
        }else{
            var min = time_diff / (60);
            if(min >= 1){
                timeDiff = (min + 1).toFixed(0);
                type = 'min';
            }
        }
    }
    return {timeDiff:timeDiff,type:type};
}

/**
 * 显示国旗
 * @param country
 * @returns {string|*}
 */

function getNationalFlag(country) {
    $flagImg = QFILE_ST + '/images/front/share/national_flag/' + country.toLowerCase() + '.png';
    return $flagImg;
}
