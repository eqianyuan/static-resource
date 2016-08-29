/**
 * Created by jiqiang on 2016/8/21.
 */
//添加进度条
function addProgressbar(){
    var tpl = '<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">' +
        '<span class="sr-only">30% 完成</span>' +
        '<input type="hidden" name="languageValue" value="" />' +
        '</div>';
    var _width = 360;
    $('ul.progress-list li[data-value]').each(function(){
        var progress = $(this).find('div.progress');
        var _length = $(this).data('value');
        var _max = $(this).data('max');
        var _name = $(this).data('name');
        var _left = (_length * _width) / _max;

        $(tpl).css('width', _left).attr('aria-valuemax', _max).find('input[type=hidden]').attr('name', _name).val(_left).end().appendTo(progress);
    });
}
$(function(){
    addProgressbar();//
});