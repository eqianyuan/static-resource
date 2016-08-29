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
//未上班工作日表单校验
function unWorkCheck(){
    $('form.checkbox-form').validate({
        errorLabelContainer: $("form.checkbox-form div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            console.log($(form).serialize());       //输出表单数据

            $('#payTypeWrap').modal('show');            //显示支付弹框
        },
        rules : {
            "weeks" : { required : true }
        },
        messages : {
            "weeks" : { required : "请选择未能上班工作日" }
        }
    });
}
//checkbox
function selectCheckbox(){
    $(document).on('click', 'p.ipt-checkbox', function(){
        var _input = $(this).find('input[type=checkbox]');
        if(_input.is(':checked')){
            $(this).removeClass('active');
            _input.prop('checked', false);
        }else{
            $(this).addClass('active');
            _input.prop('checked', true);
        }
    });
}
//评分
function scoreCheck(){
    //评份校验
    var validateForm = $('form.upload-score').validate({
        errorLabelContainer: $("form.upload-score div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            console.log($(form).serialize());       //输出表单数据
        },
        rules : {
            "number" : { required : true, number : true , min : 0, max : 100 }
        },
        messages : {
            "number" : { required : "请输入评分", number : "请输入整数", min : "最小值为0", max : "最大值为100" }
        }
    });
    //星级选择处理功能区域 START
    var _starClass = ['star_00', 'star_01', 'star_02', 'star_03', 'star_04', 'star_05'];
    var _selectStar = $('p#selectStar');
    $(document).on('blur', 'form.upload-score input.scoreValue', function(){
        var _val = parseInt($(this).val());
        if(!isNaN(_val) && validateForm.valid()){
            removeAllStar();
            if(_val <= 0) _selectStar.addClass(_starClass[0]);
            else if(_val > 0 && _val <= 20) _selectStar.addClass(_starClass[1]);
            else if(_val > 20 && _val <= 40) _selectStar.addClass(_starClass[2]);
            else if(_val > 40 && _val <=60) _selectStar.addClass(_starClass[3]);
            else if(_val > 60 && _val <= 80) _selectStar.addClass(_starClass[4]);
            else if(_val > 80 && _val < 100) _selectStar.addClass(_starClass[5]);
        }else if( _val > 100 || _val < 0){
            removeAllStar();
        }
    });

    function removeAllStar(){
        for(var i = 0; i < _starClass.length; i++){
            _selectStar.removeClass(_starClass[i]);
        }
    }

}

$(function(){
    payTypeSelect();    //支付方式
    payPwdWrap();       //支付密码

    selectCheckbox();       //checkbox选择
    unWorkCheck();          //确认支付
    scoreCheck();           //评分
});