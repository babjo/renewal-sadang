$(document).ready(function() {	
	var dialog, form,
      
      seq = $( "#modify_seq" ),
      test_id = $( "#modify_test_id" ),
      gems = $( "#modify_gems" ),
      coins = $( "#modify_coins" ),
      hearts = $( "#modify_hearts"),
      highscore = $( "#modify_hearts"),
      allFields = $( [] ).add( test_id ).add( gems ).add( coins ).add( hearts ).add( highscore ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function addUser() {		     
		allFields.removeClass( "ui-state-error" );

		var dataSource = "";
		dataSource += "<tr id=\"test_row_"+seq.val()+"\">";
	    dataSource += "<td>"+seq.val()+"</td>";
	    dataSource += "<td>"+test_id.val()+"</td>";
	    dataSource += "<td>"+gems.val()+"</td>";
	    dataSource += "<td>"+coins.val()+"</td>";
	    dataSource += "<td>"+hearts.val()+"</td>";
	    dataSource += "<td>"+highscore.val()+"</td>";
	    dataSource += "<td><button id=\"modyBtn_"+seq.val()+">Create</button></td>";
		dataSource += "<td><button id=\"delBtn_"+seq.val()+">Delete</button></td>";
		dataSource += "</tr>";
		
		$('#myTable').append(dataSource);

		dialog.dialog( "close" );
    }
    
    function modifyUser() {		     
		allFields.removeClass( "ui-state-error" );
		
		var formData = $('#testModifyForm').serialize();
		alert(formData);
		
		$.ajax({
            url:"./rest/test/"+seq.val(),
            type:"PUT",
            data:formData,
            success:function(data){

			}
        });
		
		dialog.dialog( "close" );
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 600,
      width: 450,
      modal: true,
      buttons: {
        "Create an account": modifyUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
    	event.preventDefault();
      //addUser();
    });
 
    $( 'button[id^=modyBtn]' ).button().on( "click", function() {
    	var btn_str = $(this).attr("id").split("_");
		var btn_id = btn_str[1];
    	
    	dialog.dialog( "open" );
    	
    	$.ajax({
            url: "./rest/test/"+btn_id+".json",
            type:"GET"
        }).then(function(data) {
        	$('#modify_seq').val(data.seq);
            $('#modify_test_id').val(data.test_id);
            $('#modify_gems').val(data.gems);
            $('#modify_coins').val(data.coins);
            $('#modify_hearts').val(data.hearts);
            $('#modify_highscore').val(data.highscore);
        });
    });
});