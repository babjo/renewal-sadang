var UserApi = {
        login : function(email, password, cbSessionId){
            var formData = {user_email : email, user_passwd : ''+password};

            $.ajax({
                url: "http://127.0.0.1:8080/midasWeb/loginCheck",
                method: "POST",
                data: formData,
                dataType: "html",
                success:function(data, textStatus, request){
                    cbSessionId($(data).find('#session_id').val());
                },
                error:function(request, status, error){
                }
            });
        }
    };