$( document ).ready(function(){
    renderSignInPage();
});

function renderSignInPage() {
    var source = $("#signin-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('#sadang').html(html);

    $('#go-signup-page-js').click(function(){
        renderSignUpPage();
    });

    $('#signin-js').click(function(event){
        event.preventDefault();
        var email = $('#signin-email').val();
        var password = $('#signin-passwd').val();
        UserApi.signIn(email, password, function(data){
            localStorage.setItem("token", data.token);
            renderTodoPage();
        }, function(error){
            alert(error.message);
        });
    });
}

function renderSignUpPage(){
    var source = $("#signup-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('#sadang').html(html);

    $('#signup-js').click(function(event){
        event.preventDefault();
        var email = $('#signup-email').val();
        var password = $('#signup-passwd').val();

        UserApi.signUp(email, password, function(){
            renderSignInPage();
        }, function(error){
            alert(error.message);
        });
    });
}

function renderTodoPage(){
    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    $('#sadang').html(html);

    // Add Todo
    $('#add-todo-btn-js').click(function (e) {
        e.preventDefault();
        var content = $('#todo-content-js').val();
        TodoApi.add({content: content, category: localStorage.getItem('current')}, function (data) {
            renderTodoListCmp();
            $('#todo-content-js').val('');
        }, function (error) {
            alert(error.message);
        });
    });

    $("#todo-content-js").keypress(function (e) {
        if (e.keyCode == 13) {
            var content = $('#todo-content-js').val();
            TodoApi.add({content: content, category: localStorage.getItem('current')}, function (data) {
                renderTodoListCmp();
                $('#todo-content-js').val('');
            }, function (error) {
                alert(error.message);
            });
        }
    });

    renderSidebarCmp(localStorage.getItem('current') || 'TOTAL');
    renderTodoListCmp();

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}

function renderSidebarCmp(current) {
    CategoryApi.get({}, function(data){
        var source = $("#category-template").html();
        var template = Handlebars.compile(source);
        var html = template({
            categoryList: _.map(data.categoryList, function (name) {return {name: name}}), current: current
        });
        $('.sidebar-nav').html(html);

        // binding Events
        $('#signout-js').unbind('click').click(function(){
            localStorage.clear();
            renderSignInPage();
        });

        $("#add-category-modal-js").unbind('click').click(function(e){
            $("#myModal").modal();
        });

        $("#add-category-js").unbind('click').click(function(e){
            e.preventDefault();
            var category = $("#addCategoryText").val();
            localStorage.setItem('current', category);

            TodoApi.add({content: 'New Todo', category: category}, function (data) {
                renderSidebarCmp(category);
                renderTodoListCmp({category: category});
                $("#addCategoryText").val('');
                $("#myModal").modal('hide');
            }, function (error) {
                alert(error.message);
            });
        });

        $(".go-to-total-js").unbind('click').click(function(e){
            e.preventDefault();
            localStorage.removeItem('current');
            renderSidebarCmp('TOTAL');
            renderTodoListCmp();
        });

        $(".go-to-bookmark-js").unbind('click').click(function(e){
            e.preventDefault();
            localStorage.setItem('current', 'BOOKMARK');
            renderSidebarCmp('BOOKMARK');
            renderTodoListCmp({bookmarked : true});
        });

        $(".go-to-completed-js").unbind('click').click(function(e){
            e.preventDefault();
            localStorage.setItem('current', 'COMPLETED');
            renderSidebarCmp('COMPLETED');
            renderTodoListCmp({completed : true});
        });

        $(".go-to-category-js").unbind('click').click(function(e){
            e.preventDefault();
            var category = $(e.target).data('category');
            localStorage.setItem('current', category);
            renderSidebarCmp(category);
            renderTodoListCmp({category: category});
        });
    }, function(error){
        console.log(error.message);
    });
}



function renderTodoListCmp(filter) {
    if(!filter){
        var current = localStorage.getItem('current');
        if (current) {
            if(current == 'COMPLETED')
                filter = {completed : true};
            else if(current == 'BOOKMARK')
                filter = {bookmarked : true};
            else
                filter = {category : current};
        }
        else filter = {};
    }
    TodoApi.get(filter, function (data) {
        var source = $("#todolist-template").html();
        var template = Handlebars.compile(source);
        var html = template({data: data});
        $('.total-todolist').html(html);
        bindTodoEvents();
    }, function (error) {
        alert(error.message);
    });
}

function bindTodoEvents() {

    // Remove Todo
    $(".trash-wrapper-js").unbind('click').click(function(event){
        var todoId = $(event.target).parent().siblings('#todoId').val();
        TodoApi.remove({
            todoId: todoId
        }, function (data) {
            renderTodoListCmp();
        }, function (error) {
            console.log(error);
        });
    });

    // Modify the content of Todo
    $(".todo .content").unbind('click').click(function (event) {
        var self = $(event.target);
        var text = self.text();

        var editElement = $('<input type="text" class="form-control" value="' + text + '">');
        editElement.unbind('keypress').keypress(function (e) {
            if (e.keyCode == 13) {
                var newContents = $(this).val();
                var todoId = $(this).parent().siblings('#todoId').val();
                TodoApi.modify({
                    content: newContents,
                    todoId: todoId,
                    category: localStorage.getItem('current')
                }, function () {
                    renderTodoListCmp();
                }, function (error) {
                    console.log(error);
                });
            }
        });
        self.html(editElement);

        editElement.focus();
        editElement.putCursorAtEnd();
        editElement.focusout(function () {
            var newContents = $(this).val();
            var todoId = $(this).parent().siblings('#todoId').val();
            TodoApi.modify({
                content: newContents,
                todoId: todoId,
                category: localStorage.getItem('current')
            }, function () {
                renderTodoListCmp();
            }, function (error) {
                console.log(error);
            });
        });
    });

    // Bookmark Todo
    $(".star-wrapper-js").unbind('click').click(function (event) {
        var todoId = $(this).siblings('#todoId').val();
        var bookmarked = $(this).siblings('#bookmarked').val();
        var content = $(this).siblings('.content').text();
        if(bookmarked == 'true') bookmarked = false; else bookmarked = true;
        TodoApi.modify({
            todoId: todoId,
            bookmarked: bookmarked,
            content : content
        }, function () {
            renderTodoListCmp();
        }, function (error) {
            console.log(error);
        });
    });

    // Complete Todo
    $(".status-wrapper-js").unbind('click').click(function (event) {
        var todoId = $(this).siblings('#todoId').val();
        var content = $(this).siblings('.content').text();
        var completed = $(this).siblings('#completed').val();
        if(completed == 'true') completed = false; else completed = true;
        TodoApi.modify({
            todoId: todoId,
            completed: completed,
            content : content
        }, function () {
            renderTodoListCmp();
        }, function (error) {
            console.log(error);
        });
    });
}