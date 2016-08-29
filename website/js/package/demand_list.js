/**
 * Created by jiqiang on 2016/8/27.
 */
//支付选择方式
function payTypeSelect(){
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
    $(document).on('click', 'form.payType-form button.btn-cancel', function(){
        $('#relieveDeal').modal('hide');
    });
    //确定
    $(document).on('click', 'form.payType-form button.btn-pay', function(){
        var _value = $('form.payType-form input[type=radio][name=payType]:checked').val();
        //账户余额支付
        if('accountBalance' == $.trim(_value)){
            $('#payTypeWrap').modal('hide');
            $('#inputPwdWrap').modal('show');
        }
        //支付宝支付
        else if('iPaySweep' == $.trim(_value)){
            $('#payTypeWrap').modal('hide');
            $('#QRCodeWrap').modal('show');
        }
        return false;
    });
}

//支付内容信息
function payInfoWrap(){
    //取消
    $(document).on('click', 'form.payInfo-form .btn-cancel', function(){
       $('#payWrap').modal('hide');
    });
    //支付
    $(document).on('click', 'form.payInfo-form .btn-pay', function(){
        $('#payWrap').modal('hide');
        $('#payTypeWrap').modal('show');            //显示支付方式弹框
        return false;
    });
}

//支付密码
function payPwdWrap(){
    var _tabIndex = 0;
    var _inputsStr = 'form.inputPwd-form div.pay-group input';
    $(document).on('keyup', _inputsStr, function(){
        var _value = $(this).val();
        if(_value.length == 1){
            $(this).prop('readonly', true).next().focus();
            _tabIndex++;
        }
        if(_tabIndex >= 6) _tabIndex = 6;
    });
    $(document).on('keydown', _inputsStr, function(){
        var _value = $(this).val();
        if(_value.length >= 1){
            $(this).prop('readonly', true).next().focus();
            _tabIndex++;
        }
        if(_tabIndex >= 6) _tabIndex = 6;
    });
    //清除
    $(document).on('click', 'form.inputPwd-form .btn-clear', function(){
        $(_inputsStr).eq(--_tabIndex).val('').prop('readonly', false);
    });
    //取消
    $(document).on('click', 'form.inputPwd-form .btn-cancel', function(){
        $('#inputPwdWrap').modal('hide');
    });
    //确定支付
    $(document).on('click', 'form.inputPwd-form .btn-pay', function(){
        //$('#inputPwdWrap').modal('hide');
        return false;
    });
}

$(function(){
    payInfoWrap();      //支付内容
    payTypeSelect();    //支付方式
    payPwdWrap();       //支付密码
});