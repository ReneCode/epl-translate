


function displayTranslationResult(data) {
    // remove old table content
    $('#resulttable').children().remove();
    
    if (data.result.length == 0) {
        return;
    }
    
    // display header
    var firstResult = data.result[0];
    var tr = $('<tr>');
    for (var i=0; i<firstResult.texts.length; i++) {
        var th = $('<th>').html( firstResult.texts[i].lang );
        tr.append(th);
    }  
    $('#resulttable').append(tr);
    
    // display rows
    for (var iResult=0; iResult<data.result.length; iResult++) {
        var result = data.result[iResult];
        var tr = $('<tr>');
        for (var i=0; i<result.texts.length; i++) {
            var td = $('<td>').html( result.texts[i].text );
            tr.append(td);
        }  
        $('#resulttable').append(tr);
        
    }
    
}

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
            displayTranslationResult(data);
        },
        error: function () {
            alert("error");
        }	
	})
});

