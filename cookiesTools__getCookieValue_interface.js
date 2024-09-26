<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"basCookies", description:"BAS cookies", default_selector: "string", disable_int:true, value_string: "[[SAVED_COOKIES]]", help: {description: ""} }) %>
<%= _.template($('#input_constructor').html())({id:"domain", description:"domain", default_selector: "string", disable_int:true, value_string: "", help: {description: ""} }) %>
<%= _.template($('#input_constructor').html())({id:"name", description:"name", default_selector: "string", disable_int:true, value_string: "", help: {description: ""} }) %>
<%= _.template($('#variable_constructor').html())({id:"Save", description:"Result", default_variable: "COOKIE_VALUE", help: {description: ""}}) %>
</div>
<div class="tooltipinternal">
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
