var basCookies = GetInputConstructorValue("basCookies", loader);
                 if(basCookies["original"].length == 0)
                 {
                   Invalid("bas cookies" + " is empty");
                   return;
                 }
var domain = GetInputConstructorValue("domain", loader);
                 if(domain["original"].length == 0)
                 {
                   Invalid("domain" + " is empty");
                   return;
                 }
var expires = GetInputConstructorValue("expires", loader);
                 if(expires["original"].length == 0)
                 {
                   Invalid("expires" + " is empty");
                   return;
                 }
var name = GetInputConstructorValue("name", loader);
                 if(name["original"].length == 0)
                 {
                   Invalid("name" + " is empty");
                   return;
                 }
var secure = GetInputConstructorValue("secure", loader);
                 if(secure["original"].length == 0)
                 {
                   Invalid("secure" + " is empty");
                   return;
                 }
var value = GetInputConstructorValue("value", loader);
                 if(value["original"].length == 0)
                 {
                   Invalid("value" + " is empty");
                   return;
                 }
var Save = this.$el.find("#Save").val().toUpperCase();
try{
          var code = loader.GetAdditionalData() + _.template($("#cookiesTools__pushCookie_code").html())({"basCookies": basCookies["updated"],"domain": domain["updated"],"expires": expires["updated"],"name": name["updated"],"secure": secure["updated"],"value": value["updated"],"variable": "VAR_" + Save});
          code = Normalize(code,0);
          BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
        }catch(e)
        {}
