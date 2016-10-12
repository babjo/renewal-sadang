var UserApi = {
    signIn : function(email, password, cbSuccess, cbFailure){
        var formData = {email : email, password : password};
        $.ajax({
            url: HOST + "/user/signIn",
            method: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            success:function(response){
                if(response.error){
                    cbFailure(response.error);
                }else{
                    cbSuccess(response.data);
                }
            }
        });
    },
    signUp : function(email, password, cbSuccess, cbFailure){
        var formData = {email : email, password : password};
        $.ajax({
            url: HOST + "/user/signUp",
            method: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            success:function(response){
                if(response.error){ // 실패
                    cbFailure(response.error);
                }else{ // 성공
                    cbSuccess();
                }
            }
        });
    }
};