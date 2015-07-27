(function(){
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

        af.on("renderComplete",function(){
            $(".aform > fieldset  > .json-form-fdset > .json-form-element").each(function(){
                var name =  $(this).attr("name") || $(this).attr("jpath").substr(1);
                name = name.toLowerCase();
                var helpTitle = "goto the help page of ["+name+"]";
                var removeTitle = "remove setion ["+name+"]";
                var href = 'https://docs.npmjs.com/files/package.json#'+name;
                $(this).append('<div class="section-toolbar">' +
                    '<a title="'+removeTitle+'" class="remove-section glyphicon glyphicon-remove-circle" href="#nolink"></a>' +
                    '<a title="'+helpTitle+'" class="link-to-help glyphicon glyphicon-question-sign" target="_blank" href="'+(href)+'"></a>' +
                    '</div>');
            });
        });
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
        $("#btnCreate").click(function(){

        });
        $("body").on("click",".remove-section",function(){
            $(this).closest(".json-form-element").fadeOut(function(){
                $(this).remove();
            });
        });
    }

    $(function(){
        initBehavior();
        initAce();
        $("#btnRender").click();
    })
})();
