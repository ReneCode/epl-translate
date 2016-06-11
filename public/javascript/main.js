


function displayTranslationResult(data) {
    // remove old table content
    $('#resulttable').children().remove();
    
    if (data.length == 0) {
        return;
    }
    
    // display header
    var tr = $('<tr>');
    for (var prop in data[0]) {
        var th = $('<th>').html( prop );
        tr.append(th);
    }
    var thead = $("<thead>");
    thead.append(tr);
    $('#resulttable').append(thead);
    
    // display rows
    var tbody = $("<tbody>");
    for (var iTrans=0; iTrans<data.length; iTrans++)
    {
        var trans = data[iTrans];
        var tr = $('<tr>');
        for (var prop in trans) {
            var td = $('<td>').html( trans[prop] );
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
    var target = ["en_US", "fr_FR"];
	var data = 
        {   q: input,
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

