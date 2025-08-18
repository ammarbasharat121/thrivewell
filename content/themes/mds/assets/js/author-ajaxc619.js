(function($) {
	var i = 1;
	var offset;

	var data_max = 10;

//console.log(max_num_pages.number,location_page);

	var initialCount = $("#author-container .author-post").length;

	//hide button if clicked 10 times or hide if less than 10 first shown
	if (i > (9) || initialCount<data_max) {
		$('#ajax-load-author').addClass('hidden');
	}

	var authorid = $("#author-container").data('authorid');

	$(document).on('click', '#ajax-load-author', function(){

		//no offset needed with exclude
		//set offset
		/*
		if (i < 2) {
	    	offset = 2;
	    }else {
	    	offset = (i * 2);
	    }
	    */
	    i++;
	    

	    //get excludes
	    var excludeArray = [];

	    $("#author-container .author-post").each(function(){
	    	excludeArray.push($(this).data("id"));
	    });

	   //console.log(excludeArray,offset,authorid);

	    load_author_posts(excludeArray, offset, authorid);
		return false;
	});

    //load more
    function load_author_posts(excludeArray, offset, authorid) {


    	$.ajax({
	      cache: false,
	      timeout: 8000,
	      url: php_array.admin_ajax,
	      type: "GET",
	      data: ({
	        action: 'load_more_author',
	        //offset: offset,
	        authorid: authorid,
	        exclude: excludeArray
	      }),

	      beforeSend: function() {
	        //$( '#ajax-response' ).html( 'Loading' );
	      },

	      success: function(response) {
	        $('#author-container').append(response);
	        console.log('response: '+response);
	        if (typeof(response)==="undefined"){
	        	$('#ajax-load-author').addClass('hidden');
	        }
	      },

	      error: function(jqXHR, textStatus, errorThrown) {
	        console.log('The following error occured: ' + textStatus, errorThrown);
	      },

	      complete: function(jqXHR, textStatus) {
	      	//console.log('i: '+i); //2
	      	//console.log('typeofresponse:' + typeof(response)==="undefined");
	      	
	      	
	      	//console.log(i > (data_max - 1));

	        if (i > (data_max - 1)) {
	        	
	          	$('#ajax-load-author').addClass('hidden');
	          
	        }
	        //i = 1;
	      }

	    });
    }


})(jQuery);