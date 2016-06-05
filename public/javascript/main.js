


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
    var thead = $("<thead>");
    thead.append(tr);
    $('#resulttable').append(thead);
    
    // display rows
    var tbody = $("<tbody>");
    for (var iTrans=0; iTrans<data.translations.length; iTrans++)
    {
        var t = data.translations[iTrans];
        console.log("abc");
        var tr = $('<tr>');
        for (var i=0; i<t.texts.length; i++) {
            var td = $('<td>').html( t.texts[i] );
            tr.append(td);
        }  
        tbody.append(tr);
    }
    $('#resulttable').append(tbody);
    
}

$('#searchbutton').click(function(ev){
	ev.preventDefault();
	var input = $('#searchinput').val();
    // translate source => target
    var source = "de_DE";
    var target = "en_US";
	var data = 
        {   text: input,
            source: source,
            target: target };
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

