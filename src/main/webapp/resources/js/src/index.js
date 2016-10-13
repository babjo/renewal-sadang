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
            refreshTodoList();
            $('#todo-content-js').val('');
        }, function (error) {
            alert(error.message);
        });
    });

    $("#todo-content-js").keypress(function (e) {
        if (e.keyCode == 13) {
            var content = $('#todo-content-js').val();
            TodoApi.add({content: content, category: localStorage.getItem('current')}, function (data) {
                refreshTodoList();
                $('#todo-content-js').val('');
            }, function (error) {
                alert(error.message);
            });
        }
    });

    renderSidebarCmp();
    renderTodoListCmp();

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
}

function renderSidebarCmp() {
    var source = $("#category-template").html();
    var template = Handlebars.compile(source);

    var current = localStorage.getItem('current') || 'Total';
    localStorage.setItem('current', current);
    var html = template({categories :[{name:'Total'}, {name:'Bookmark'}, {name:'Done'}], current: current});
    $('.sidebar-nav').html(html);

    $('#signout-js').click(function(){
        localStorage.clear();
        renderSignInPage();
    });
}

function renderTodoListCmp() {
    refreshTodoList();
}

function refreshTodoList() {
    var source = $("#todolist-template").html();
    var template = Handlebars.compile(source);
    TodoApi.get({category: localStorage.getItem('current')}, function (data) {
        var html = template({data: data});
        $('.total-todolist').html(html);
        bindTodoEvents();
    }, function (error) {
        alert(error.message);
    });
}

function bindTodoEvents() {

    // Remove Todo
    $(".trash-wrapper-js").click(function(event){
        var todoId = $(event.target).parent().siblings('#todoId').val();
        TodoApi.remove({
            todoId: todoId
        }, function (data) {
            refreshTodoList();
        }, function (error) {
            console.log(error);
        });
    });

    // Modify the content of Todo
    $(".todo .content").click(function (event) {
        var self = $(event.target);
        var text = self.text();

        var editElement = $('<input type="text" class="form-control" value="' + text + '">');
        editElement.keypress(function (e) {
            if (e.keyCode == 13) {
                var newContents = $(this).val();
                var todoId = $(this).parent().siblings('#todoId').val();
                TodoApi.modify({
                    content: newContents,
                    todoId: todoId,
                    category: localStorage.getItem('current')
                }, function () {
                    refreshTodoList();
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
                refreshTodoList();
            }, function (error) {
                console.log(error);
            });
        });
    });

    // Bookmark Todo
    $(".star-wrapper-js").click(function (event) {
        var todoId = $(this).siblings('#todoId').val();
        var bookmarked = $(this).siblings('#bookmarked').val();
        var content = $(this).siblings('.content').text();
        if(bookmarked == 'true') bookmarked = false; else bookmarked = true;
        TodoApi.modify({
            todoId: todoId,
            bookmarked: bookmarked,
            content : content
        }, function () {
            refreshTodoList();
        }, function (error) {
            console.log(error);
        });
    });

    // Complete Todo
    $(".status-wrapper-js").click(function (event) {
        var todoId = $(this).siblings('#todoId').val();
        var content = $(this).siblings('.content').text();
        var completed = $(this).siblings('#completed').val();
        if(completed == 'true') completed = false; else completed = true;
        TodoApi.modify({
            todoId: todoId,
            completed: completed,
            content : content
        }, function () {
            refreshTodoList();
        }, function (error) {
            console.log(error);
        });
    });
}