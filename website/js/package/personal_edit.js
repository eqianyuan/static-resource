/**
 * Created by jiqiang on 2016/8/21.
 */
//时间设置
function setWorkTime(){
    var graduateStartTime = $('input.graduateStartTime').datepicker({
        onClose : function(selectDate){
            graduateEndTime.datepicker( "option", "minDate", selectDate );
        }
    });                //加载日期控件
    var graduateEndTime = $('input.graduateEndTime').datepicker({
        onClose : function(selectDate){
            graduateStartTime.datepicker( "option", "maxDate", selectDate );
        }
    });
}

//基本信息校验
function baseInfoValidate(){
    $('form.personal-form').validate({
        errorLabelContainer: $("form.personal-form div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            alert("表单事件!");
            form.submit();
        },
        rules : {
            "userName" : { required : true }
        },
        messages : {
            "userName" : { required : "请输入真实姓名" }
        }
    });
}

//其它页面校验
function bottomInfoValidate(){
    $('form.bottom-form').validate({
        errorLabelContainer: $("form.bottom-form div.error"),
        wrapper: "p",
        ignore: ".ignore",
        submitHandler:function(form){
            alert("表单事件!");
            form.submit();
        },
        rules : {
            "state1" : { required : true },
            "state2" : { required : true },
            "state3" : { required : true },
            "contact" : { required : true },
            "workExperience" : { required : true },
            "compensation" : { required : true },
            "experience" : { required : true },
            "project" : { required : true }
        },
        messages : {
            "state1" : { required : "请选择所处行业" },
            "state2" : { required : "请选择所处行业" },
            "state3" : { required : "请选择所处行业" },
            "contact" : { required : "请输入联系方式" },
            "workExperience" : { required : "请填写工作年限" },
            "compensation" : { required : "请填写薪资待遇" },
            "experience" : { required : "请填写工作经历" },
            "project" : { required : "请填写参与项目" }
        }
    });
}

//添加工作经历
function addExperience(){
    var tpl_first = '<tr data-flag="0"> ' +
        '<th>工作经历：</th>' +
        '<td>' +
        '<p class="ipt-txt wd420 fl"><input type="text" name="experience" value="" /></p>' +
        '<button type="button" class="btn btn-delete" data-target="0">删除</button> <i class="warn-star">*</i>' +
        '</td>' +
        '</tr>';
    var tpl_second = '<tr data-flag="0">' +
        '<th>负责岗位：</th>' +
        '<td><p class="ipt-txt wd670 fl"><textarea name="station" class="tta" placeholder="请描述在公司的岗位职责。"></textarea></p></td>' +
        '</tr>';
    var _obj = $('#workExperience');
    //添加事件
    $(document).on('click', 'button#btn-experience', function(){
        var _index = Math.floor(_obj.find('tr').size() / 2);
        if('undefined' !== typeof _obj[0]){
            $(tpl_first).attr('data-flag', _index).find('button.btn-delete').attr('data-target', _index).end().appendTo(_obj);
            $(tpl_second).attr('data-flag', _index).appendTo(_obj);
        }
    });
    //删除事件
    $(document).on('click', '#workExperience button.btn-delete', function(){
        var _target = $(this).data('target');
        _obj.find('tr[data-flag=' + _target + ']').remove();
    });
}

//添加项目经验
function addProjectExperience(){
    var tpl_first = '<tr data-flag="0"> ' +
        '<th>参与项目：</th>' +
        '<td>' +
        '<p class="ipt-txt wd420 fl"><input type="text" name="project" value="" /></p>' +
        '<button type="button" class="btn btn-delete" data-target="0">删除</button> <i class="warn-star">*</i>' +
        '</td>' +
        '</tr>';
    var tpl_second = '<tr data-flag="0">' +
        '<th>负责岗位：</th>' +
        '<td><p class="ipt-txt wd670 fl"><textarea name="module" class="tta" placeholder="请描述在此项目负责的部分。"></textarea></p></td>' +
        '</tr>';
    var _obj = $('#addProject');
    //添加事件
    $(document).on('click', 'button#btn-addProject', function(){
        var _index = Math.floor(_obj.find('tr').size() / 2);
        if('undefined' !== typeof _obj[0]){
            $(tpl_first).attr('data-flag', _index).find('button.btn-delete').attr('data-target', _index).end().appendTo(_obj);
            $(tpl_second).attr('data-flag', _index).appendTo(_obj);
        }
    });
    //删除事件
    $(document).on('click', '#addProject button.btn-delete', function(){
        var _target = $(this).data('target');
        _obj.find('tr[data-flag=' + _target + ']').remove();
    });
}

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
    $(document).on('click', 'div.progress', function(e){
        var _bar = $(this).find('.progress-bar');
        var _startPos = $(this).offset().left;
        var _max = parseInt(_bar.attr('aria-valuemax'));
        var _left = e.clientX - _startPos;
        var _value = parseInt(_left * _max / _width);
        $(this).find('input[type=hidden]').val(_value);
        _bar.width(_left);
    });
}

$(function(){
    setWorkTime();      //设置时间
    fixSelect();        //select事件
    selectRadioBox();   //radio事件
    baseInfoValidate(); //基本信息校验
    bottomInfoValidate();
    addExperience();        //添加工作经历
    addProjectExperience(); //
    addProgressbar();       //添加进度条
});