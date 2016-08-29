/**
 * Created by jiqiang on 2016/8/27.
 */
function relieveDeal(){
    $(document).on('click', 'form.relieveDeal button.btn-cancel', function(){
        $('#relieveDeal').modal('hide');
    });
}

function relieveApply(){
    $(document).on('click', 'form.relieveApply button.btn-cancel', function(){
        $('#relieveApply').modal('hide');
    });
}

//取消原因
function cancelReason(){
    var _selectStr = 'div.ipt-select2';
    //切换
    $(document).on('click', _selectStr, function(){
        var _input = $(this).find('input[type=radio]');
        var _name = $.trim(_input.attr('name'));
        if(_input.is(':checked')){
            _input.prop('checked', false);
            $(this).removeClass('active');
        }else{
            $('input[type=radio][name=' + _name + ']').parents(_selectStr).removeClass('active');
            _input.prop('checked', true);
            $(this).addClass('active');
        }
    });

    $(_selectStr).each(function(){
        var _input = $(this).find('input[type=radio]');
        var _name = $.trim(_input.attr('name'));
        if(_input.is(':checked')){
            $('input[type=radio][name=' + _name + ']').parents(_selectStr).removeClass('active');
            $(this).addClass('active');
        }else{
            $(this).removeClass('active');
        }
    });

    //取消
    $(document).on('click', 'form.cancelMeetMsg button.btn-cancel', function(){
        $('#cancelMeetMsg').modal('hide');
    });
}

//表单校验
function  validateForm(){
    //取消表单校验
    $('form.cancelMeetMsg').validate({
        errorLabelContainer: $("form.cancelMeetMsg div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            console.log($(form).serialize());       //输出表单数据
        },
        rules : {
            "cancelReason" : { required : true }
        },
        messages : {
            "cancelReason" : { required : "请选择取消原因" }
        }
    });
    //取消报名表单校验
    $('form.relieveApply').validate({
        errorLabelContainer: $("form.relieveApply div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            console.log($(form).serialize());       //输出表单数据
        },
        rules : {
            "message" : { required : true }
        },
        messages : {
            "message" : { required : "请选择取消原因" }
        }
    });
    //取消协议
    $('form.relieveDeal').validate({
        errorLabelContainer: $("form.relieveDeal div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            console.log($(form).serialize());       //输出表单数据
        },
        rules : {
            "message" : { required : true }
        },
        messages : {
            "message" : { required : "请选择取消原因" }
        }
    });
}

$(function(){
    relieveDeal();      //协议
    relieveApply();     //取消报名
    cancelReason();
    validateForm();
    //
    $(document).on('click','button[data-toggle="modal"][data-target="#cancelMeetMsg"]', function(){
        $('#meetMsg').modal('hide');
    });
});