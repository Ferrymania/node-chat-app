$(document).ready(function() {

	$.get( "/rooms", function( data ) {
		console.log(data)
		data.forEach((room) => {
	  		let option = $('<option></option>');
	  		option.attr('value', room);
	  		option.text('Room : '+room );
	  	
	  		$('#active-rooms').append(option);
	  	})
	});
})