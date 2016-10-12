var TodoApi = {
    add: function(args, cbSuccess, cbFailure){
        if(args === undefined || !args.content){
            cbFailure({message:'내용을 입력해야 합니다'});
            return ;
        }
        if(!args.category){
            cbFailure({message:'카테고리가 없어'});
            return ;
        }
        $.ajax({
            beforeSend: setAuthHeader,
            type: "POST",
            url: HOST + "/api/todo",
            data: JSON.stringify(args),
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                if(response.error){
                    cbFailure(response.error);
                }else{
                    cbSuccess(response.data);
                }
            }
        });
    },

    modify: function(args, cbSuccess, cbFailure){
        if(args === undefined || !args.content){
            cbFailure({message:'새로운 내용을 입력해야 합니다'});
            return ;
        }
        if(!args.todoId){
            cbFailure({message:'없는 id'});
            return ;
        }
        $.ajax({
            beforeSend: setAuthHeader,
            type: "POST",
            url: HOST + "/api/todo/"+args.todoId,
            data: JSON.stringify(args),
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                if(response.error){
                    cbFailure(response.error);
                }else{
                    cbSuccess(response.data);
                }
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
    },
    get: function(args, cbSuccess, cbFailure){
        $.ajax({
            beforeSend: setAuthHeader,
            url: HOST + "/api/todo",
            method: "GET",
            data: args,
            success:function(response){
                if(response.error){
                    cbFailure(response.error);
                }else{
                    cbSuccess(arrange(response.data));
                }
            }
        });
    }
};

function arrange(target){
    var result = {};
    $.each(target.todoList, function(index, todo){
        console.log(todo.createAt);
        var createAt = moment.unix(todo.createAt/1000).format("YYYY/MM/DD");
        if(_.has(result, createAt)){
            result[createAt].unshift({content : todo.content});
        }else{
            result[createAt] = [{content : todo.content}];
        }
    });

    console.log(result);
    var data = [];
    $.each(result, function(createAt, todoList) {
        var momentDate = moment(createAt, "YYYY/MM/DD");
        console.log(momentDate);
        data.unshift({date: {dayOfWeek: momentDate.format('dddd'), fullDate: momentDate.format('MMMM DD, YYYY')}, todoList: todoList});
    });

    return data;
}

function setAuthHeader(request) {
    request.setRequestHeader("Authorization", 'Bearer '+localStorage.getItem('token'));
}