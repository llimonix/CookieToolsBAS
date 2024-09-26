var cookies1 = GetInputConstructorValue("cookies1", loader);
                 if(cookies1["original"].length == 0)
                 {
                   Invalid("COOKIES 1" + " is empty");
                   return;
                 }
var cookies2 = GetInputConstructorValue("cookies2", loader);
                 if(cookies2["original"].length == 0)
                 {
                   Invalid("COOKIES 2" + " is empty");
                   return;
                 }
var Save = this.$el.find("#Save").val().toUpperCase();
try{
          var code = loader.GetAdditionalData() + _.template($("#cookiesTools__concatCookies_code").html())({"cookies1": cookies1["updated"],"cookies2": cookies2["updated"],"variable": "VAR_" + Save});
          code = Normalize(code,0);
          BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
        }catch(e)
        {}
