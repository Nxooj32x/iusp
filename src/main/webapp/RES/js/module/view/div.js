define(function (require, exports, module) {
    var row_num = 46;
    var row__seat_num = 86;
    var html = '';

    for (var j = 0; j < row_num; j++) {
        html += ' <div class="row" >';
        for (var i = 0; i < row__seat_num; i++) {
            html += '<div class="row__seat tooltip" data-tooltip="A'+i+'-'+j+'"></div>';
        }
        html += '</div>';
    }

    return {
        divStr:html
    }
});