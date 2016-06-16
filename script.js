$(document).ready(function(){
    var search;
    
    $('#searchbutton').click(function(){ // Zorgt ervoor dat de foto's kunnen worden opgehaald met de zoek knop
        search = $('#search').val();
        requestPics();
    });
    
    $('#search').keydown(function(e){ // Doet hetzelfde maar dan als je gelijk op enter drukt
        if(e.keyCode == 13){
            search = $(this).val();
            requestPics();
        }
    });
    
    function requestPics(){ // Pakt de data uit flickr
        var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+ search + "&jsoncallback=?"
        $.ajax ({
            dataType:  "json",
            method: "GET",
            url: flickrURL,
            success: ProcessPics
        })
    }
    
    function ProcessPics(data){ // Verwerkt de json data in html code
        console.log(data);
        $('#pics').html("");
        for(var i=0; i<data.items.length; i++){
            var pics = data.items[i];
            var htmlCode = "<div class='grid'><div class='grid-item'><a href='" + pics.link + "' target='_blank'><img src='" + pics.media.m + "' alt='" + pics.title + "' ></a></div><h4>" + pics.title + "</h4></div>";
            $('#pics').append(htmlCode);
            
        }
        $('#search a').attr("href",data.link).text(data.title + " door Flickr.com");
    }
})