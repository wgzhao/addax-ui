<template>
<div class="container">

    <form class="form-signin" action="/login" method="post">
        <div class="form-signin-heading text-center">
            <h1 class="sign-title">登录</h1>
        </div>
        <div class="login-wrap">
            <input type="text" class="form-control"  name="username" id="username" placeholder="用户名" autofocus>
            <input type="password" class="form-control" name="password"  id="password" placeholder="密码">

            <button class="btn btn-lg btn-login btn-block" type="submit">
                <i class="fa fa-check"></i>
            </button>

            <div class="registration">
                还没有账号?
                <a class="" href="/register" th:href="@{/register}">
                    去注册
                </a>
            </div>
            <label class="checkbox">
                <input type="checkbox" value="remember-me"> 记住密码
                <span class="pull-right">
                    <a data-toggle="modal" href="#myModal"> 忘记密码?</a>

                </span>
            </label>

        </div>

        <!-- Modal -->
        <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">忘记了密码 ?</h4>
                    </div>
                    <div class="modal-body">
                        <p>输入您的电子邮件地址重新设置您的密码.</p>
                        <input type="text" name="email" placeholder="邮箱" autocomplete="off" class="form-control placeholder-no-fix">

                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button class="btn btn-primary" type="button">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal -->

    </form>

</div>

</template>
