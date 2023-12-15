<template>
<section>
    <!-- 左边开始-->
    <div class="left-side sticky-left-side">

        <!--网站logo 大 和 小-->
        <div class="logo">
            <a href="/"><img src="/assets/images/logo.png"  alt=""></a>
        </div>

        <!-- 隐藏侧边栏时显示logo -->
        <div class="logo-icon text-center">
            <a href="/"><img src="/images/logo_icon.png" alt=""></a>
        </div>
        <!--网站logo 大 和 小-->

        <div class="left-side-inner">

            <!-- 头部用户个人操作 -->
            <div class="visible-xs hidden-sm hidden-md hidden-lg">
                <div class="media logged-user">
                    <img alt="" th:href="@{/images/photos/user-avatar.png}" class="media-object">
                    <div class="media-body">
                        <h4><a href="#"><span sec:authentication="principal.username"></span></a></h4>
                        <span>"你好啊..."</span>
                    </div>
                </div>

                <h5 class="left-nav-title">账户信息</h5>
                <ul class="nav nav-pills nav-stacked custom-nav">
                    <li><a href="#"><i class="fa fa-user"></i> <span>用户资料 </span></a></li>
                    <li><a href="#"><i class="fa fa-cog"></i> <span>设置</span></a></li>
                    <li><a href="#" th:action="@{/logout}"><i class="fa fa-sign-out"></i> <span>退出</span></a></li>
                </ul>

            </div>

            <!--侧边栏导航开始-->
            <div th:replace="~{side-nav}"></div>
            <!--侧边栏导航结束-->
        </div>
    </div>
    <!-- 左边结束-->

    <!--主要内容开始-->
    <div class="main-content">

        <!-- 头部分开始-->
        <div class="header-section">

            <!--开关按钮开始-->
            <a class="toggle-btn"><i class="fa fa-bars"></i></a>
            <!--开关按钮结束-->

            <!--搜索开始-->
            <!--搜索结束-->

            <!--通知菜单开始 -->
            <div class="menu-right">
                <ul class="notification-menu">
                    <li>
                        <div class="dropdown">
                            <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                <img src="/assets/images/photos/user-avatar.png" alt=""/>
                                <span sec:authentication="name"></span>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#" class="dropdown-item">
                                        <i class="fa fa-user"></i>
                                        用户信息
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="dropdown-item">
                                        <i class="fa fa-cog"></i>
                                        设置
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="dropdown-item">
                                        <i class="fa fa-sign-out"></i>
                                        登出
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <!--通知菜单结束 -->

        </div>
        <!-- 头部分结束-->

        <!-- 页面标题开始-->
        <div class="page-heading">
            <div th:replace="${breadcrumb}"></div>
        </div>
        <!-- page heading end-->

        <!--body wrapper start-->
        <div class="wrapper" th:replace="${content}"></div>
        <!--body end-->

        <!--footer section start-->
        <div th:insert="~{footer}"></div>
        <!--footer section end-->


    </div>
    <!--主要内容结束-->
</section>
</template>