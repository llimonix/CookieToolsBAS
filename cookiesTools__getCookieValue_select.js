var basCookies = GetInputConstructorValue("basCookies", loader);
                 if(basCookies["original"].length == 0)
                 {
                   Invalid("basCookies" + " is empty");
                   return;
                 }
var domain = GetInputConstructorValue("domain", loader);
                 if(domain["original"].length == 0)
                 {
                   Invalid("domain" + " is empty");
                   return;
                 }
var name = GetInputConstructorValue("name", loader);
                 if(name["original"].length == 0)
                 {
                   Invalid("name" + " is empty");
                   return;
                 }
var Save = this.$el.find("#Save").val().toUpperCase();
try{
          var code = loader.GetAdditionalData() + _.template($("#cookiesTools__getCookieValue_code").html())({"basCookies": basCookies["updated"],"domain": domain["updated"],"name": name["updated"],"variable": "VAR_" + Save});
          code = Normalize(code,0);
          BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
        }catch(e)
        {}
