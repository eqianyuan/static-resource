/**
 * Created by jiqiang on 2016/8/27.
 */
//修改需求编辑表单校验
function editApplyForm(){
    //解除协议校验
    $('form.editApply-form').validate({
        errorLabelContainer: $("form.editApply-form div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            //修改需求
            $('#editApplyDialog').modal('hide');
            form.submit();
        },
        rules : {
            "state1" : { required : true },
            "state2" : { required : true },
            "state3" : { required : true },
            "number" : { required : true },
            "treatment" : { required : true },
            "arriveTime" : { required : true },
            "jobTime" : { required : true },
            "workTime" : { required : true },
            "workContent" : { required : true },
            "address" : { required : true },
            "contact" : { required : true },
            "telPhone" : { required : true }
        },
        messages : {
            "state1" : { required : "请选择岗位" },
            "state2" : { required : "请选择岗位" },
            "state3" : { required : "请选择岗位" },
            "number" : { required : "请输入招聘人数" },
            "treatment" : { required : "请输入薪资待遇" },
            "arriveTime" : { required : "请选择到岗时间" },
            "jobTime" : { required : "请选择工作时间" },
            "workTime" : { required : "请选择工作日" },
            "workContent" : { required : "请输入工作内容" },
            "address" : { required : "请输入详情地址" },
            "contact" : { required : "请输入联系人" },
            "telPhone" : { required : "请输入联系电话" }
        }
    });
}

//时间设置
function setWorkTime(start, end){
    var graduateStartTime = $(start).datepicker({
        onClose : function(selectDate){

            graduateEndTime.datepicker( "option", "minDate", selectDate );
        }
    });                //加载日期控件
    var graduateEndTime = $(end).datepicker({
        onClose : function(selectDate){
            graduateStartTime.datepicker( "option", "maxDate", selectDate );
        }
    });
}

function employment(){
    $('#employment').modal('show');

    $(document).on('click', 'div.select-check ul li[data-value]', function(){
        var _value = $(this).data('value');
        $(this).parents('div.select-check').find('input[type=text]').val(_value).end().find('div.select-list').slideUp();
    });
}

$(function(){
    //设置时间
    $('td.setWork input.times').each(function(){
        $(this).datetimepicker({
            language : 'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            minuteStep : 2                      //分钟间隔2分钟
        });
    });


    //取消
    $(document).on('click', 'form.relieveDeal button.btn-cancel', function(){
        $('#relieveDeal').modal('hide');
    });


    //报到列表
    $(document).on('click', 'a#btn-toggle-apply', function(){
        var _closeApplyList = $('div.close-apply-list table tr');
       var _showSize = $('div.close-apply-list table tr:hidden').size();
        if(_closeApplyList.size() == 1) return;
       if(_showSize > 0){
           _closeApplyList.show();
           $(this).removeClass('showDown');
       } else{
           _closeApplyList.hide().eq(0).show();
           $(this).addClass('showDown');
       }
    });


    //解除协议校验
    $('form.relieveDeal').validate({
        errorLabelContainer: $("form.company-form div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            alert("注册提交事件!");
            form.submit();
        },
        rules : {
            "message" : { required : true }
        },
        messages : {
            "message" : { required : "请输入原因" }
        }
    });

    fixSelect();
    editApplyForm();
    employment();
});