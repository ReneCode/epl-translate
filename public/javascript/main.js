


function displayTranslationResult(data) {
    // remove old table content
    $('#resulttable').children().remove();
    
    if (data.translations.length == 0) {
        return;
    }
    
    // display header
    var tr = $('<tr>');
    for (var i=0; i<data.languages.length; i++) {
        var th = $('<th>').html( data.languages[i] );
        tr.append(th);
    }  
    $('#resulttable').append(tr);
    
    // display rows
    for (var iTrans=0; iTrans<data.translations.length; iTrans++)
    {
        var t = data.translations[iTrans];
        console.log("abc");
        var tr = $('<tr>');
        for (var i=0; i<t.texts.length; i++) {
            var td = $('<td>').html( t.texts[i] );
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

