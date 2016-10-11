function clearAddTodoInput(){
    $('#exampleInputAmount').val('');
}

function handleAddTodo(contents){
    var categorySeq = Store.currentCategorySeq || getTodoCategorySeq();
    TodoApi.create({contents: contents, category_seq: categorySeq}, function () {
        renderPage();
        clearAddTodoInput();
    }, function (msg) {
        alert(msg);
    });
}

function handleUpdateTodo(todoSeq, newContents, complete, bookmark) {
    TodoApi.update({todo_seq: todoSeq, contents:newContents, complete: complete, bookmark: bookmark}, function(){
        renderPage();
    }, function(msg){
        alert(msg);
    });
}

function handleRemoveTodo(todoSeq) {
    TodoApi.remove({todo_seq: todoSeq}, function(){
        renderPage();
    }, function(msg){
        alert(msg);
    });
}

function handleGoToCategory(categoryName, categorySeq){
    CategoryApi.goTo(categoryName, categorySeq);
    renderPage();
}

function handleAddNewCategory(category) {
    CategoryApi.createNew({category_name : category}, function(){
        $("#myModal").modal('hide');
    }, function(msg){
        alert(msg);
    });
}

function handleAddSharedCategory(sharingCode) {
    CategoryApi.createShared({category_hash : sharingCode}, function(){
        $("#myModal").modal('hide');
    }, function(msg){
        alert(msg);
    });
}

function bindEvent() {
    $(".todo .content").click(function(event){
        var self = $(event.target);
        var text = self.text();

        var editElement = $('<input type="text" class="form-control" value="'+text+'">');
        editElement.keypress(function(e){
            if(e.keyCode == 13){
                var newContents = $(this).val();
                var todoId = $(this).parent().siblings('#todoId').val();
                var complete = $(this).parent().siblings('#complete').val();
                var bookmark = $(this).parent().siblings('#bookmark').val();
                handleUpdateTodo(todoId, newContents, complete, bookmark);
            }
        });
        self.html(editElement);

        editElement.focus();
        editElement.putCursorAtEnd();
        editElement.focusout(function(){
            var newContents = $(this).val();
            var todoId = $(this).parent().siblings('#todoId').val();
            var complete = $(this).parent().siblings('#complete').val();
            var bookmark = $(this).parent().siblings('#bookmark').val();
            handleUpdateTodo(todoId, newContents, complete, bookmark);
        });
    });

    $(".add-todo-btn-js").unbind('click');
    $(".add-todo-btn-js").click(function(event){
        var contents = $("#exampleInputAmount").val();
        handleAddTodo(contents);
    });

    $(".add-todo-js").unbind('keypress');
    $(".add-todo-js").keypress(function(e) {
        if (e.keyCode == 13) {
            var contents = $("#exampleInputAmount").val();
            handleAddTodo(contents);
        }
    });

    $(".trash-wrapper-js").click(function(event){
        var todoSeq = $(event.target).parent().siblings('#todoId').val();
        handleRemoveTodo(todoSeq);
    });

    $(".status-wrapper-js").click(function (event) {
        var todoId = $(this).siblings('#todoId').val();
        var contents = $(this).siblings('.content').text();
        var complete = $(this).siblings('#complete').val();
        var bookmark = $(this).siblings('#bookmark').val();
        if(complete === "0") complete = "1"; else complete = "0";
        handleUpdateTodo(todoId, contents, complete, bookmark);
    });

    $(".star-wrapper-js").click(function(event){
        var todoId = $(this).siblings('#todoId').val();
        var contents = $(this).siblings('.content').text();
        var complete = $(this).siblings('#complete').val();
        var bookmark = $(this).siblings('#bookmark').val();
        if(bookmark === "0") bookmark = "1"; else bookmark = "0";
        handleUpdateTodo(todoId, contents, complete, bookmark);
    });

    $(".go-to-category-js").click(function(e){
        if(e.target.nodeName === 'SPAN'){
            e.preventDefault();
        }else{
            var categoryName = $(e.target).data('category');
            var categorySeq = $(e.target).data('seq');
            handleGoToCategory(categoryName, categorySeq);
        }
    });

    $(".go-to-category-js>.icon").click(function(e){
        var categoryName = $(e.target).parent().data('category');
        var categorySeq = $(e.target).parent().data('seq');
        handleGoToCategory(categoryName, categorySeq);
    });

    $(".go-to-category-js>.category").click(function(e){
        var categoryName = $(e.target).parent().data('category');
        var categorySeq = $(e.target).parent().data('seq');
        handleGoToCategory(categoryName, categorySeq);
    });

    $(".add-category-modal-js").click(function(e){
        $("#myModal").modal();
    });

    $('#myModal').on('hidden.bs.modal', function (e) {
        renderPage();
    });

    $(".add-category-js").unbind('click');
    $(".add-category-js").click(function(e){
        e.preventDefault();

        var category = $("#addCategoryText").val();
        if($("#addNewCategory").is(':checked')){
            handleAddNewCategory(category);
        }else{
            handleAddSharedCategory(category);
        }
        //console.log($("#addSharedCategory").is(':checked'));
    });

    $('[data-toggle="tooltip"]').tooltip();
}

function sort(myTodo, currentCategoryName, currentCategorySeq){
    var temp = {};

    if(currentCategoryName == 'Bookmark'){
        myTodo.forEach(function(todo){
            if(todo.bookmark === 1){
                if(_.has(temp, todo.start_date)){
                    temp[todo.start_date].unshift(todo);
                }else{
                    temp[todo.start_date] = [todo];
                }
            }
        });
    }else if(currentCategoryName == 'Done'){
        myTodo.forEach(function(todo){
            if(todo.complete === 1){
                if(_.has(temp, todo.start_date)){
                    temp[todo.start_date].unshift(todo);
                }else{
                    temp[todo.start_date] = [todo];
                }
            }
        });
    }else if(currentCategoryName == 'ToDo'){
        myTodo.forEach(function(todo){
            if(todo.complete === 0){
                if(_.has(temp, todo.start_date)){
                    temp[todo.start_date].unshift(todo);
                }else{
                    temp[todo.start_date] = [todo];
                }
            }
        });
    } else{
        function insert(todo) {
            if (currentCategorySeq && currentCategorySeq == todo.category_seq)
                temp[todo.start_date].unshift(todo);
            else if (!currentCategorySeq) {
                temp[todo.start_date].unshift(todo);
            }
        }

        myTodo.forEach(function(todo){
            if(_.has(temp, todo.start_date)){
                insert(todo);
            }else{
                temp[todo.start_date] = [];
                insert(todo);
            }
        });
    }

    var data = [];
    $.each(temp, function(date, todoList) {
        var momentDate = moment(date, "YYYY-MM-DD"); //January 03, 2016
        data.unshift({date: {dayOfWeek: momentDate.format('dddd'), fullDate: momentDate.format('MMMM DD, YYYY')}, todoList: todoList});
    });

    return data;
}

function renderHash() {
    var hash = getTodoCurrentCategoryHash();
    if(hash) $(".sharing-code").html("Sharing code : " + hash);
}

function renderPage() {
    function renderTodoList() {
        var source = $("#todolist-template").html();
        var template = Handlebars.compile(source);

        var data = sort(Store.data.my_todo, Store.currentCategory, Store.currentCategorySeq);
        console.log(data);
        var html = template({data: data});
        $('.total-todolist').html(html);
    }

    function renderCategories() {
        var source = $("#category-template").html();
        var template = Handlebars.compile(source);
        var html = template({data: Store.data.my_category, currentCategory: Store.currentCategory});
        $('.sidebar-nav').html(html);
    }

    renderCategories();
    renderHash();
    renderTodoList();
    bindEvent();
}
$( document ).ready(function(){
    initStore(function(){
        renderPage();
    });
});
