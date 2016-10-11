var CategoryApi = {
    createNew: function(args, cbSuccess, cbError){
        if(args === undefined || !args.category_name){
            cbError('내용을 입력해야 합니다');
            return ;
        }

        $.ajax({
            type: "POST",
            url: "./rest/category",
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