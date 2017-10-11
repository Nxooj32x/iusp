//**************************************************//
//插件名：jQuery simpleToolTip v1.11                //
//作者：吴慧旻  Copyright (c) 2011 Aguro wu         //
//功能：可为页面中元素添加提示框，改善元素的用户体验//              
//参数：                                            //
//     position：提示框对于元素的位置               //
//     showClose：是否显示关闭按钮，默认为false     //
//     method：激发提示框的事件。比如click,mouseover//
//             默认为mouseover                      //
//     isAutoHide：是否自动消失，默认为true，此参数 //
//             应同showClose参数同时使用            //
//     context：提示框中内容文字，也可以是html片段  //
//     width：提示框宽度，默认150，单位px           //
//     height：提示框高度，默认80，单位px           //
//     speed：显示和消失速度，单位毫秒              //
//使用要求:                                         //
//jQuery 1.4.2   可以从 http://www.jquery.com 获得  //
//如有bug或者任何问题，请联系：                     //
//                     QQ：87117395                 //
//                     email：huimin1984@citiz.net  //
//如果这插件对您有用，那它是Aguro的作品             //
//如果您认为这插件是垃圾，那我不知道它是谁写的      //
//**************************************************//
$.fn.simpleToolTip = function(options) {
    //私有变量
    var elementTop = 0,
        elementLeft = 0,
        elementWidth = 0,
        elementHeight = 0,
        tooltipTop = 0,
        tooltipLeft = 0,
        tooltipWidth = 0,
        tooltipHeight = 0,
        bgWidth = 38,
        bgHeight = 30,
        arrowHeight = 0,
        tooltipHtml = '<div class="tooltip">'
                  + '<div class="tooltip_close">'
                  + '<img src="/img/toolTip/close_box_red.png" alt="close" width="30px" height="30px" onclick="CloseToolTip()" />'
                  + '</div>'
                  + '<div class="tooltip_arrow">'
                  + '<img src="/img/toolTip/bottom_arrow.png" style="display:none" />'
                  + '</div>'
                  + '<table class="tooltip_table"  border="0" cellspacing="0" cellpadding="0">'
                  + '<tbody>'
                  + '<tr class="tooltip_top">'
                  + '<td class="tooltip_top_left">'
                  + '</td>'
                  + '<td class="tooltip_top_center">'
                  + '</td>'
                  + '<td class="tooltip_top_right">'
                  + '</td>'
                  + '</tr>'
                  + '<tr class="tooltip_middle">'
                  + '<td class="tooltip_middle_left">'
                  + '</td>'
                  + '<td class="tooltip_middle_center">'
                  + '</td>'
                  + '<td class="tooltip_middle_right">'
                  + '</td>'
                  + '</tr>'
                  + '<tr class="tooltip_bottom">'
                  + '<td class="tooltip_bottom_left">'
                  + '</td>'
                  + '<td class="tooltip_bottom_center">'
                  + '</td>'
                  + '<td class="tooltip_bottom_right">'
                  + '</td>'
                  + '</tr>'
                  + '</tbody>'
                  + '</table>'
                  + '</div>';

    var container = this;

    //默认参数
    var settings = {
        position: 'top',
        showClose: false,
        method: 'mouseover',
        isAutoHide: true,
        context: '测试内容',
        width: 150,
        height: 80,
        speed: 1000
    };
    if (options) {
        $.extend(settings, options);
    }

    if ($('.tooltip').size() == 0) {
        $('body').append(tooltipHtml);
    }

    if (!settings.showClose) {
        $('.tooltip_close').hide();
    }

    $(container).bind(settings.method, function() {
        $('.tooltip').stop(true, true);
        SetToolTipAttr(settings.width, settings.height);
        GetElementAttr($(this), $('.tooltip'));
        SelectMethod(settings.position);
        $('.tooltip_middle_center').html(settings.context);
        $('.tooltip').fadeIn(settings.speed).offset({ top: tooltipTop, left: tooltipLeft });
    });

    $('.tooltip').bind('mouseout', function() {
        CloseToolTip(settings.speed);
    });

    if (settings.isAutoHide) {
        $(container).bind('mouseout', function() {
            CloseToolTip(settings.speed);
        });
    }


    //设定tooltip的长宽
    function SetToolTipAttr(width, height) {
        var w = width - bgWidth,
            h = height - bgHeight;
        $('.tooltip').css('width', width + 'px').css('height', height + 'px');
        $('.tooltip_top_center').css('width', w + 'px');
        $('.tooltip_middle_center').css('width', w + 'px').css('height', h + 'px');
        $('.tooltip_bottom_center').css('width', w + 'px');
        $('.tooltip_middle_left').css('height', h + 'px');
        $('.tooltip_middle_right').css('height', h + 'px');
        arrowHeight = height;
    }

    //获取元素的位置和高宽
    function GetElementAttr(element, tooltip) {
        elementTop = $(element).offset().top;
        elementLeft = $(element).offset().left;
        elementWidth = $(element).width();
        elementHeight = $(element).height();
        tooltipWidth = $(tooltip).width();
        tooltipHeight = $(tooltip).height();
    }

    //选择计算tooltip位置的方法
    function SelectMethod(position) {
        switch (position) {
            case 'right':
                AtRight();
                break;
            case 'top':
                AtTop();
                break;
            case 'bottom':
                AtBottom();
                break;
            default:
                alert('暂无此位置方法支持');
                break;
        }
    }

    //下方
    function AtBottom() {
        tooltipTop = elementTop + elementHeight + 10;
        tooltipLeft = elementLeft + elementWidth / 2;
        $('.tooltip_arrow>img').attr("src", "/img/toolTip/top_arrow.png").show();
        $('.tooltip_arrow').removeClass('tooltip_arrow_top').removeClass('tooltip_arrow_right').addClass('tooltip_arrow_bottom');
        $('.tooltip_arrow').css('top', '-14px');
    }

    //上方
    function AtTop() {
        tooltipTop = elementTop - tooltipHeight - 10;
        tooltipLeft = elementLeft + elementWidth / 2;
        $('.tooltip_arrow>img').attr("src", "/img/toolTip/bottom_arrow.png").show();
        $('.tooltip_arrow').removeClass('tooltip_arrow_bottom').removeClass('tooltip_arrow_right').addClass('tooltip_arrow_top');
        $('.tooltip_arrow').css('top', (65 + arrowHeight * 1 - 80) + 'px');
    }

    //右方
    function AtRight() {
        tooltipTop = elementTop - 15;
        tooltipLeft = elementLeft + elementWidth + 10;
        $('.tooltip_arrow>img').attr("src", "/img/toolTip/right_arrow.png").show();
        $('.tooltip_arrow').removeClass('tooltip_arrow_top').removeClass('tooltip_arrow_bottom').addClass('tooltip_arrow_right');
        $('.tooltip_arrow').css('top', '19px');
    }

    //关闭
    function CloseToolTip(speed) {
        $('.tooltip').fadeOut(speed);
    }
}