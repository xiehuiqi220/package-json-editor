    AForm.Config.extClassName.basicContainer = "form-group";
    AForm.Config.extClassName.table = "table table-bordered";
    AForm.Config.extClassName.control = "form-control";
    AForm.Config.wording.addRowText = "add";

    var txtCodeArea = $("#txtCodeArea");
    var editor;
    var af = new AForm("form", {
        fields : {
            description : {type:"textarea"}
        }
    });

    function format(){
        var str = editor.getValue();
        try {
            var json = eval("(" + str + ")");
        } catch (ex) {

        }
        str = JSON.stringify(json,null,"\t");
        editor.session.setValue(str);
    }

    function renderForm() {
        var str = editor.getValue();
        try {
            var json = eval("(" + str + ")");
        } catch (ex) {
            alert("invalid package.json");
            return false;
        }

        af.render(json);
        format();
    }

    function initAce(){
        txtCodeArea.hide();
        editor = ace.edit("aceEditor");
        editor.setTheme("ace/theme/ecllipse");
        editor.setFontSize(14);
        editor.getSession().setMode("ace/mode/json");
        editor.getSession().setValue(txtCodeArea.val());
        editor.getSession().on('change', function(){
            txtCodeArea.val(editor.getSession().getValue());
        });
    }

    function getJson() {
        var str = af.getJsonString();
        editor.setValue(str);
        format();
    }

    function initBehavior() {
        $("#btnRender").click(function() {
            renderForm();
        });
        $("#btnGetJson").click(function() {
            getJson();
        });
    }

    $(function(){
        initBehavior();
        initAce();
        $("#btnRender").click();
    })
