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

    <!-- Custom styles for this template -->
    <link href="/resources/less/style.less" type="text/css" rel="stylesheet/less">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body class="form-signin-background">

<div class="container">
    <form class="form-signin is-Transformed" action="loginCheck" method="POST">
        <div class="valign">
            <h1 class="form-signin-heading">Sadang</h1>
            <p class="form-signin-description">당신의 일정을 관리하고 더 나은 삶을 살아보세요 !</p>
            <label class="sr-only">Email</label>
            <input type="email" name="user_email" id="user_email" class="form-control" placeholder="Email" required autofocus>
            <label class="sr-only">Password</label>
            <input type="password" name="user_passwd" id="user_passwd" class="form-control" placeholder="Password" required>
            <button class="btn btn-lg btn-primary btn-block sadang-btn" type="submit">sign in</button>
            <p><a href="./signup">아직 회원이 아니시라면...</a></p>
        </div>
    </form>
</div> <!-- /container -->

<script src="/resources/js/node_modules/less/dist/less.min.js" type="text/javascript"></script></body>
</html>