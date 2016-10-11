$(document).ready(function() {
	$('button[id^=delBtn]').click(function() {
		var btn_str = $(this).attr("id").split("_");
		var btn_id = btn_str[1];

		$.ajax({
			url:"./rest/test/"+btn_id,
			type:"DELETE",
			data:{'seq':btn_id},
			success:function(data){
				$('#test_row_'+btn_id).remove();
			}
		});
	});

	$('#testInsertButton').click(function() {
		var formData = $('#testInsertForm').serialize();
		alert(formData);
		$.ajax({
            url:"./rest/test",
            type:"POST",
            data:formData,
            success:function(data){

			}
        });
	});
	
	/*$.ajax({
        url: "./rest/test.json"
    }).then(function(data) {
    	var i=0;
    	while(data[i])
    	{
    		putAttributeAtTable(data[i]);
    		i++;
    	} 
    });*/
	
	var t = $('#myTable').DataTable();
});
	
function putAttributeAtTable(data){
	var dataSource = "";
	dataSource += "<tr>";
    dataSource += "<td>"+data.seq+"</td>";
    dataSource += "<td>"+data.test_id+"</td>";
    dataSource += "<td>"+data.gems+"</td>";
    dataSource += "<td>"+data.coins+"</td>";
    dataSource += "<td>"+data.hearts+"</td>";
    dataSource += "<td>"+data.highscore+"</td>";
    dataSource += "<td><a href=\"deleteTest?seq="+data.seq+"\">삭제1</a></td>";
	dataSource += "<td><input id=\"delBtn_"+data.seq+"\" type=\"button\" value=\"Delete\"/></td>";
	dataSource += "</tr>";
	
	$('#myTable').append(dataSource);
};