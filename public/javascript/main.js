

$('#searchbutton').click(function(ev){
	ev.preventDefault();
	var input = $('#searchinput').val();
	var data = {q: input};
	$.ajax({
		type:"GET",
		url:"/api/translate",
		data: jQuery.param(data),
	    contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert(data.text);
        },
        error: function () {
            alert("error");
        }	
	})
});

$("searchform").bind('submit', function (e) {
	
	console.log("submit");
	e.preventDefault();
	return false;
	/*
    var isValid = someYourFunctionToCheckIfFormIsValid();
    if (!isValid) {
        e.preventDefault();
        return false;
    }
    else {
        jQuery.ajax({
            type: "POST",
            url: "my_custom/url",
            dataType: "html",
            data: { "text": jQuery("#edit-body").html()
            },
            success: function (result) {
                console.log(result);
            }
        });
        e.preventDefault();
        return false;
    }
	*/
});