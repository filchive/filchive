<template>
    <el-container>
        <el-header id="account" height="5em" style="margin: 1em 1.5em 0 1.5em">
            <div style="text-align: left">
	            <a href="/"><img src="../assets/img/filchive.png" style="height: 3.5em"></a>
	            <div style="text-align: right; float: right; margin-top: 1.8em">
		            <i class="fa fa-globe fa-lg" aria-hidden="true" style="color: cornflowerblue;"></i>
		            <el-select v-model="lang" @change="changeLang" size="mini" style="width: 100px;">
			            <el-option value="cn" label="中文">
				            <span class="flag-icon flag-icon-cn"></span> 中文
			            </el-option>
			            <el-option value="en" label="EN">
				            <span class="flag-icon flag-icon-us"></span> EN
			            </el-option>
		            </el-select>
	            </div>
            </div>
            <el-divider style="margin: 0"></el-divider>
        </el-header>
        <el-main>
	        <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import Browser from './Browser';
    export default {
        components: { Browser },
        data() {
            return {
                lang: this.$i18n.locale,
            };
        },
        methods: {
            changeLang(value) {
                this.$i18n.locale = value;
            }
        }
    };

</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
    /*body { font-family: 'Source Sans Pro', sans-serif; }*/
    body {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }


    #account {
        /*background-color: #DCD0C0;*/
        color: #333;
    }

    .el-aside {
        color: #333;
    }

    .el-divider--horizontal {
        margin: 0.5em 0 !important;
    }

    .el-main {
        padding-top: 1em !important;
    }

    .el-tabs {
        margin-bottom: 20px;
    }

    ::-webkit-scrollbar {
        width: 7px;
        height: 4px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
        background: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: rgba(158, 158, 158, 0.4);
    }

    ::-webkit-scrollbar-thumb:hover {
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: rgba(158, 158, 158, 1);
    }
</style>
