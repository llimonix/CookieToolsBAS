<div class="container-fluid">
<%= _.template($('#input_constructor').html())({id:"cookies1", description:"COOKIES1", default_selector: "string", disable_int:true, value_string: "", help: {description: ""} }) %>
<%= _.template($('#input_constructor').html())({id:"cookies2", description:"COOKIES2", default_selector: "string", disable_int:true, value_string: "", help: {description: ""} }) %>
<%= _.template($('#variable_constructor').html())({id:"Save", description:"Result", default_variable: "CONCAT_COOKIES", help: {description: ""}}) %>
</div>
<div class="tooltipinternal">
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
