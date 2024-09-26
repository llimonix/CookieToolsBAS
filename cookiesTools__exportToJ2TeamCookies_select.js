var basCookies = GetInputConstructorValue("basCookies", loader);
                 if(basCookies["original"].length == 0)
                 {
                   Invalid("BAS COOKIES" + " is empty");
                   return;
                 }

var siteUrl = GetInputConstructorValue("siteUrl", loader);
                 if(siteUrl["original"].length == 0)
                 {
                   Invalid("site url" + " is empty");
                   return;
                 }
var Save = this.$el.find("#Save").val().toUpperCase();
try{
          var code = loader.GetAdditionalData() + _.template($("#cookiesTools__exportToJ2TeamCookies_code").html())({
            "basCookies": basCookies["updated"],
            "siteUrl": siteUrl["updated"],
            "variable": "VAR_" + Save
          });
          code = Normalize(code,0);
          BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
        }catch(e)
        {}
