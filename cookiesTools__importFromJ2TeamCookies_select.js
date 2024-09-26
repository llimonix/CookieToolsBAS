var importCookies = GetInputConstructorValue("importCookies", loader);
                 if(importCookies["original"].length == 0)
                 {
                   Invalid("IMPORT_COOKIES" + " is empty");
                   return;
                 }
var Save = this.$el.find("#Save").val().toUpperCase();
try{
          var code = loader.GetAdditionalData() + _.template($("#cookiesTools__importFromJ2TeamCookies_code").html())({"importCookies": importCookies["updated"],"variable": "VAR_" + Save});
          code = Normalize(code,0);
          BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
        }catch(e)
        {}
