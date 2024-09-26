var basCookies = GetInputConstructorValue("basCookies", loader);
                 if(basCookies["original"].length == 0)
                 {
                   Invalid("BAS_COOKIES" + " is empty");
                   return;
                 }

var Save = this.$el.find("#Save").val().toUpperCase();
try{
          var code = loader.GetAdditionalData() + _.template($("#cookiesTools__exportToEditThisCookies_code").html())({
            "basCookies": basCookies["updated"],
            "variable": "VAR_" + Save
          });
          code = Normalize(code,0);
          BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
        }catch(e)
        {}
