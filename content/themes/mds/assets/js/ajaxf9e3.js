(function($) {
	var i = 1;
	var offset,
		cat;

	if (i > (max_num_pages.number - 1)) {
		$('#ajax-call').addClass('done');
	}
	$(document).on('click', '#ajax-call', function(){
		//set offset

		if (i < 2) {
	    	offset = 9;
	    }else {
	    	offset = (i * 9);
	    }
	    i++;
	    
	    //get cat
	    $('.cat-filters li').each(function(){
	    	var a = $(this).children('a');
	    	if(a.hasClass('current')){
	    		cat = parseInt(a.attr('data-cat'));
	    	}
	    });

	    //if a sub cat is set, override parent cat
	    $('.sub-cat-filters li').each(function(){
	    	var a = $(this).children('a');
	    	if(a.hasClass('current')){
	    		cat = parseInt(a.attr('data-cat'));
	    	}
	    });

	   // console.log(offset, cat);

	    load_posts(cat, offset);
		return false;
	});

	$('body').on( "click", ".cat-filters li > a", function() {
		var currentCat = $(this).attr('data-cat');
		var currentHref = $(this).attr('href');

		$('a.ajax.current').removeClass('current');
		$(this).addClass('current');
		$('#filters').addClass('clicked');
        //$('.pic').document.createElement('img').addClass('video_icon');
		//$('#loading-animation').show();

		//set url
		if (window.history.replaceState) {
		   //prevents browser from storing history with each change:
		   window.history.replaceState({}, null, currentHref);
		}

		cat_ajax_get(currentCat);
		return false;
	});
	/*
	$('body').on( "click", ".sub-cat-filters li > a", function() {
		var currentCat = $(this).attr('data-cat');
		var currentHref = $(this).attr('href');

		$('a.ajax.current').removeClass('current');
		$(this).addClass('current');
		$('#filters').addClass('clicked');
		//set url
		if (window.history.replaceState) {
		   //prevents browser from storing history with each change:
		   window.history.replaceState({}, null, currentHref);
		}

		cat_ajax_get(currentCat);
		return false;
	});
	*/
    //load more
    function load_posts(cat, offset) {
    	$.ajax({
	      cache: false,
	      timeout: 8000,
	      url: php_array.admin_ajax,
	      type: "GET",
	      data: ({
	        action: 'load_more_posts',
	        offset: offset,
	        cat: cat
	      }),

	      beforeSend: function() {
	        //$( '#ajax-response' ).html( 'Loading' );
	      },

	      success: function(response) {
	        $('#filters').append(response);
	        console.log('response: '+response);
	        if (response === ''){
	        	$('#ajax-call').addClass('done');
	        }
	      },

	      error: function(jqXHR, textStatus, errorThrown) {
	        console.log('The following error occured: ' + textStatus, errorThrown);
	      },

	      complete: function(jqXHR, textStatus) {
	      	console.log('i: '+i); //2
	      	var data_max;
	      	$('.article-list').each(function(){
	      		//the last one it finds will be the value
	      		data_max = parseInt($(this).attr('data-max'));
	      	});
	        if (i > (data_max - 1)) {
	          	$('#ajax-call').addClass('done');
	        }
	        //i = 1;
	      }

	    });
    }

    //cat filters
    function cat_ajax_get(currentCat) {
        $.ajax({
        	cache: false,
        	timeout: 8000,
            type: "GET",
            url: php_array.admin_ajax,
            data: ({
            	action: 'load_cat_posts', 
            	cat: currentCat,
            	offset: offset 
            }),
            
            success: function(response) {
                $('#filters').html(response).removeClass('clicked');
                //console.log(response);
            },

			error: function(jqXHR, textStatus, errorThrown) {
				console.log('The following error occured: ' + textStatus, errorThrown);
			},

			complete: function(jqXHR, textStatus) {
				var max = parseInt($('#filters .article-list').attr('data-max'));
				if ( (max <= 1) || isNaN(max) ) {
					$('#ajax-call').addClass('done');
	        	}else {
	        		$('#ajax-call').removeClass('done');
	        	}

	        	i = 1;
		    }
        });
    }

})(jQuery);