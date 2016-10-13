<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Signin for Sandang</title>

    <!-- Bootstrap core CSS -->
    <link href="/resources/js/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/resources/js/node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/resources/less/style.less" type="text/css" rel="stylesheet/less">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <div id="sadang">
    </div>
</body>

<script id="signin-template" type="text/x-handlebars-template">
    <div class="form-signin-background">
        <div class="container">
            <form class="form-signin is-Transformed" method="POST">
                <div class="valign">
                    <h1 class="form-signin-heading">Sadang</h1>
                    <p class="form-signin-description">당신의 일정을 관리하고 더 나은 삶을 살아보세요 !</p>
                    <label class="sr-only">Email</label>
                    <input type="email" name="user_email" id="signin-email" class="form-control" placeholder="Email" required autofocus value="kd980311@naver.com">
                    <label class="sr-only">Password</label>
                    <input type="password" name="user_passwd" id="signin-passwd" class="form-control" placeholder="Password" required value="1234">
                    <button class="btn btn-lg btn-primary btn-block sadang-btn" id="signin-js" >sign in</button>
                    <p><a id="go-signup-page-js" href="#">아직 회원이 아니시라면...</a></p>
                </div>
            </form>
        </div> <!-- /container -->
    </div>
</script>

<script id="signup-template" type="text/x-handlebars-template">
<div class="form-signin-background">
    <div class="container">
        <form class="form-signin is-Transformed" style="height:500px;">
            <div class="valign">
                <h1 class="form-signin-heading">Sign up</h1>
                <p class="form-signin-description">몇가지 입력으로 회원이 되실 수 있습니다!</p>

                <label class="sr-only">Email</label>
                <input type="email" name="user_email" id="signup-email" class="form-control" placeholder="Email" required autofocus>
                <label class="sr-only">Password</label>
                <input type="password" name="user_passwd" id="signup-passwd" class="form-control" placeholder="Password" required>

                <button class="btn btn-lg btn-primary btn-block sadang-btn" id="signup-js">Register</button>
            </div>
        </form>
    </div>
</div>
</script>

<script id="todo-template" type="text/x-handlebars-template">
<div id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
        </ul>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper" class="sadang-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-10">
                    <input type="text" class="form-control" id="todo-content-js" placeholder="insert new task...">
                </div>
                <div class="col-xs-2">
                    <button id=add-todo-btn-js class="btn btn-primary sadang-btn">추가</button>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <p class="sharing-code" style="margin: 10px;"></p>
                </div>
            </div>
            <div class="total-todolist">
            </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
</div>
<!-- /#wrapper -->

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">New Category</h4>
            </div>
            <div class="modal-body">
                <form role="form">
                    <div class="form-group">
                        <label class="radio-inline"><input id="addNewCategory" type="radio" name="optradio" checked>New</label>
                        <label class="radio-inline"><input id="addSharedCategory" type="radio" name="optradio">Sharing Code</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="addCategoryText" class="form-control">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-default btn-primary sadang-btn add-category-js">만들기</button>
            </div>
        </div>

    </div>
</div>
</script>

<script id="category-template" type="text/x-handlebars-template">
    <li class="sidebar-brand">
        <a href="#">
            Sadang
        </a>
        <a class="settings" href="#" id="signout-js">sign out</a>
    </li>
    {{#each categories}}
    <li>
        <a class="{{active name ../current}} go-to-category-js" data-category={{name}} href="#"><span class="icon"><i class="fa {{icon name}} fa-1" aria-hidden="true"></i></span><span class="category">{{name}}</span></a>
    </li>
    {{/each}}
    <li>
        <a class="add-category add-category-modal-js" href="#"><i class="fa fa-plus fa-1" aria-hidden="true"></i></a>
    </li>
</script>

<script id="todolist-template" type="text/x-handlebars-template">
    <div class="row sadang-todolist">
        <div class="col-xs-12">
            {{#each data}}
            <h2 class="today">{{date.dayOfWeek}}</h2>
            <p class="details">{{date.fullDate}}</p>
            <ul class="todo">
                {{#each todoList}}
                <li class="clearfix {{isCompleted completed}}">
                    <div class="content">{{content}}</div>
                    <input type="hidden" id="todoId" value="{{id}}">
                    <input type="hidden" id="bookmarked" value="{{bookmarked}}">
                    <input type="hidden" id="completed" value="{{completed}}">
                    <div class="status-wrapper status-wrapper-js">
                        <div class="status is-Transformed" data-toggle="tooltip" title="completed?"></div>
                    </div>
                    <div class="trash-wrapper trash-wrapper-js"><i class="fa fa-trash fa-2x" aria-hidden="true" data-toggle="tooltip" title="delete?"></i>
                    </div>
                    <div class="star-wrapper star-wrapper-js {{starred bookmarked}}"><i class="fa fa-star fa-2x" aria-hidden="true" data-toggle="tooltip" title="bookmark?"></i>
                    </div>
                </li>
                <hr>
                {{/each}}
            </ul>
            {{/each}}
        </div>
    </div>
</script>

<script src="/resources/js/node_modules/less/dist/less.min.js" type="text/javascript"></script>
<script src="/resources/js/node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="/resources/js/node_modules/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/resources/js/node_modules/handlebars/dist/handlebars.min.js" type="text/javascript"></script>
<script src="/resources/js/node_modules/moment/min/moment.min.js" type="text/javascript"></script>
<script src="/resources/js/node_modules/underscore/underscore-min.js" type="text/javascript"></script>
<script>
    // config
    var HOST = 'http://localhost:8080';
    // helper
    jQuery.fn.putCursorAtEnd = function() {
        return this.each(function() {
            $(this).focus()
            // If this function exists...
            if (this.setSelectionRange) {
                // ... then use it (Doesn't work in IE)
                // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
                var len = $(this).val().length * 2;
                this.setSelectionRange(len, len);
            } else {
                // ... otherwise replace the contents with itself
                // (Doesn't work in Google Chrome)
                $(this).val($(this).val());
            }
            // Scroll to the bottom, in case we're in a tall textarea
            // (Necessary for Firefox and Google Chrome)
            this.scrollTop = 999999;
        });
    };
</script>
<script src="/resources/js/src/handlebars-helpers.js" type="text/javascript"></script>
<script src="/resources/js/src/UserApi.js" type="text/javascript"></script>
<script src="/resources/js/src/TodoApi.js" type="text/javascript"></script>
<script src="/resources/js/src/Store.js" type="text/javascript"></script>
<script src="/resources/js/src/index.js" type="text/javascript"></script>
</html>