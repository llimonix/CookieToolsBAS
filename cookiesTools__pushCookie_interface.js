<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"basCookies", description:"BAS cookies", default_selector: "string", disable_int:true, value_string: "[[SAVED_COOKIES]]", help: {description: "bas cookies"} }) %>
<%= _.template($('#input_constructor').html())({id:"domain", description:"domain", default_selector: "string", disable_int:true, value_string: "", help: {description: "domain for value"} }) %>
<%= _.template($('#input_constructor').html())({id:"expires", description:"expires", default_selector: "string", disable_int:true, value_string: "2030-01-01", help: {description: "Date in ISO format"} }) %>
<%= _.template($('#input_constructor').html())({id:"name", description:"name", default_selector: "string", disable_int:true, value_string: "", help: {description: "name for value"} }) %>
<%= _.template($('#input_constructor').html())({id:"secure", description:"secure", default_selector: "string", variants: ["true","false"], disable_int:true, value_string: "false", help: {description: "https"} }) %>
<%= _.template($('#input_constructor').html())({id:"value", description:"value", default_selector: "string", disable_int:true, value_string: "", help: {description: "value"} }) %>
<%= _.template($('#variable_constructor').html())({id:"Save", description:"Result", default_variable: "SAVED_COOKIES", help: {description: ""}}) %>
</div>
<div class="tooltipinternal">
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
