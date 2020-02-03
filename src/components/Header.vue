<template>
    <div id="header">

        <header class="main_header">

            <div class="row">
                <div class="content">
                   <img src="assets/backgrounds/logoV01.png"/><span class="logo">Ahorro tiempo</span>
                </div>
            </div>

        </header>

    </div>
</template>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }

    #header {
        height: 70px;
        opacity: .9;
        z-index: 3;
    }

    a {
        text-decoration: none;
    }

    .row {
        width: 100%;
        margin: 0 auto;
        position: relative;
        padding: 0 2%;
    }

    .content {
        width: 100%;
        margin: 0 auto;
        padding: 50px 2% 50px;
    }

      .content img {
        width: 60px;
        height: 60px;
        float: left;
        margin-top: -13px;
    }

    .main_header .row .content {
        padding: 0;
    }

    .main_header {
        position: fixed;
        top: 0px;
        left: 0px;
        max-height: 70px;
        width: 100%;
        padding-top: 17px;
        overflow: hidden;
        transition: all 0.3s;
        padding-bottom: 6px;
        background: black;
    }

    .logo {
        width: 300px;
        font-size: 25px;
        color: white;
        float: left;
        display: block;
        margin-top: 0;
        margin-bottom: 10px;
        margin-left: 14px;
        font-size: 35px;
    }
</style>