$('.share-video').each(function(){
    $(this).find('.video-ctrl').height($('.video-ctrl').width());
    $(this).find('.video-img').height($('.video-ctrl').height());
});
//滑动
window.indicate = function indicate ($e, current) {
var obj_left = $e[0].offsetLeft;
var obj = $e.offset(),
    height = $e.height(),
    width = $e.width(),
    top = (obj.top + height + 6).toFixed(2),
    left = obj.left.toFixed(2),
    color = "#178cd9";
    $(".indicator").css({
      "top":"2rem",
      "left": obj_left,
      "width": width + "px",
      "height": "2px" ,
      "background-color": color,
    });
};
$(".nav ul").on("click", "li", function(e) {
    index = $(this).index();
    swiper.slideTo(index, 500, true);
    indicate($(this), false);
    $(".nav ul li").each(function(){
      $(this).removeClass("current");
    });
    $(this).addClass("current");
});

$(window).on("resize", function() {
indicate( $("li.current"), true);
});

var indicator = $(".bottom_slide").addClass("indicator");
indicate($(".nav ul li"), true);


