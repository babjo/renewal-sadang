var TodoApi = {
    create: function(args, cbSuccess, cbError){
        var self = this;
        if(args === undefined || !args.contents){
            cbError('내용을 입력해야 합니다');
            return ;
        }
        if(!args.category_seq){
            cbError('카테고리가 없어');
            return ;
        }
        var data = { contents: args.contents, category_seq: args.category_seq };

        $.ajax({
            type: "POST",
            url: "./rest/todo",
            data: data,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data) {
                self.getData(function(data){
                    Store.data = data;
                    cbSuccess();
                }, function(){});

            },
            error:function(request, status, error){
                cbError();
            }
        });
    },
    update: function(args, cbSuccess, cbError){
        var self = this;
        if(args === undefined || !args.contents){
            cbError('새로운 내용을 입력해야 합니다');
            return ;
        }
        if(!args.todo_seq){
            cbError('없는 id');
            return ;
        }
        //var data = { contents: args.contents, category_seq: args.categorySeq };
        $.ajax({
            type: "POST",
            url: "./updateTodo",
            data: {'modify_todo':JSON.stringify(args)},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data) {
                self.getData(function(data){
                    Store.data = data;
                    cbSuccess();
                }, function(){});

            },
            error:function(request, status, error){
                //console.log(status);
                cbError();
            }
        });
    },
    remove: function(args, cbSuccess, cbError){
        var self = this;
        $.ajax({
            method: "DELETE",
            url: "./rest/todo/" + args.todo_seq,
            success: function(data) {
                self.getData(function(data){
                    Store.data = data;
                    cbSuccess();
                }, function(){});

            },
            error:function(request, status, error){
                console.log(status);
                cbError();
            }
        });
    },
    getData: function(cbSuccess, cbError){
        $.get("./todo.json", function(data) {
            cbSuccess(data);
        }).fail(function() {
            cbError();
        });
    }
};