<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"importCookies", description:"Import cookies", default_selector: "string", disable_int:true, value_string: "[[IMPORT_COOKIES]]", help: {description: "Cookies from netscape format"} }) %>
<%= _.template($('#input_constructor').html())({id:"debug", description:"Debug log", default_selector: "string", disable_int:true, value_string: "true", variants: ["true", "false"], help: {description: ""} }) %>
<%= _.template($('#variable_constructor').html())({id:"Save", description:"Result", default_variable: "SAVED_COOKIES", help: {description: ""}}) %>
</div>
<div class="tooltipinternal">
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
