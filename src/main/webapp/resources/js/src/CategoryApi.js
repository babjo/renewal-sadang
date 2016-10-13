var CategoryApi = {
    get: function(args, cbSuccess, cbFailure){
        $.ajax({
            beforeSend: setAuthHeader,
            url: HOST + "/api/category",
            method: "GET",
            data: args,
            success:function(response){
                if(response.error){
                    cbFailure(response.error);
                }else{
                    cbSuccess(response.data);
                }
            }
        });
    },
    createShared : function(args, cbSuccess, cbError){
        if(args === undefined || !args.category_hash){
            cbError('내용을 입력해야 합니다');
            return ;
        }

        $.ajax({
            type: "POST",
            url: "./joinCategory",
            data: args,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data) {
                TodoApi.getData(function(data){
                    Store.data = data;
                    cbSuccess();
                });
            },
            error:function(request, status, error){
                cbError();
            }
        });
    },
    goTo: function(categoryName, categorySeq){
        Store.currentCategory = categoryName;
        Store.currentCategorySeq = categorySeq;
    }
};

function setAuthHeader(request) {
    request.setRequestHeader("Authorization", 'Bearer '+localStorage.getItem('token'));
}