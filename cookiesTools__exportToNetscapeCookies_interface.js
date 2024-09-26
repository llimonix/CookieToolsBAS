<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"basCookies", description:"BAS cookies", default_selector: "string", disable_int:true, value_string: "[[SAVED_COOKIES]]", help: {description: "BAS cookies"} }) %>
<%= _.template($('#variable_constructor').html())({id:"Save", description:"Result", default_variable: "EXPORT_COOKIES", help: {description: ""}}) %>
</div>
<div class="tooltipinternal">
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
