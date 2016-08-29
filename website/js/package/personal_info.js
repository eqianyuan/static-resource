/**
 * Created by jiqiang on 2016/8/27.
 */
function selectRadio(){
    //radio
    $('div.radio-box p.ipt-radio').click(function(){
        var _input = $(this).find('input[type=radio]');
        $('div.radio-box p.ipt-radio').removeClass('active');
        if(_input.is(':checked')){
            _input.prop('checked', false);
            $(this).removeClass('active');
        }else{
            _input.prop('checked', true);
            $(this).addClass('active');
        }
    }).each(function(){
        var _input = $(this).find('input[type=radio]');
        if(_input.is(':checked')){
            _input.prop('checked', false);
            $(this).removeClass('active');
        }else{
            _input.prop('checked', true);
            $(this).addClass('active');
        }
    });
}

$(function(){
    //selectRadio();

});