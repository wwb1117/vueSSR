<template>
    <div class="login_wrap" :style="{height: $store.state.home.device.height + 'px', background: '#f5f5f5'}">
        <div class="login_box">
            <div class="login_logo">
                <img style="width: 178px" src="../../../public/img/login/login_logo.png" alt="妈妈去哪儿">
            </div>
            <div class="login_content">
                <div class="login_title">登录</div>
                <div class="login_input_wrap">
                    <el-input
                        placeholder="账号"
                        v-model="userInfo.loginCode"
                        @keyup.enter.native="loginEvent"
                        :style="{width: '320px'}"
                        clearable>
                    </el-input>
                </div>
                <div class="login_input_wrap">
                    <el-input
                        placeholder="密码"
                        type="password"
                        v-model="userInfo.password"
                        @keyup.enter.native="loginEvent"
                        :style="{width: '320px'}"
                        clearable>
                    </el-input>
                </div>
                <div class="login_remPwd">
                    <el-checkbox v-model="isRemPwd">记住密码</el-checkbox>
                </div>
                <div class="login_loginBtn">
                    <el-button @click="loginEvent" class="logo_red" :style="{width: '320px'}" type="danger">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import capi from 'api/common'
import lapi from 'api/login'
export default {
    data() {
        return {
            isRemPwd: true,
            userInfo: {
                loginCode: '',
				password: '',
				source: 0
            }

        }
    },
    computed: {

    },
    methods: {
		getOwnerGuides(){
			capi.allGuides().then((res) => {
				this.$store.commit('setOwnerGuides', res.data.listData)
			})
		},
		getOwnerShopList(){
			capi.allShops().then((res) => {
				this.$store.commit('setOwnerShopList', res.data)
			})
		},
        getOwnerRoleList() {
            capi.allRoles().then((res) => {
                this.$store.commit('setOwnerRoleList', res.data)
            })
        },
		getCurrentShop(){
			capi.getCurrentShop().then((res) => {
				this.$store.commit('setCurrentShop', res.data)
			})
		},
		getOwnerCashiers(){
			capi.allCashiers().then((res) => {
				this.$store.commit('setOwnerCashiers', res.data)
			})
		},
        loginEvent(){
            if (this.userInfo.loginCode == ""){
                this.$message({
                    message: '请输入账号',
                    showClose: true,
                    type: 'warning'
                });
                return
            }
            if (this.userInfo.password == ""){
                this.$message({
                    message: '请输入密码',
                    showClose: true,
                    type: 'warning'
                });
                return
            }
            if (this.isRemPwd) {
                window.localStorage.setItem("user", JSON.stringify(this.userInfo))
            } else {
                window.localStorage.removeItem("user")
            }

            lapi.login(this.userInfo).then((reponse) => {
                sessionStorage.setItem("user", JSON.stringify(this.userInfo))
                this.$store.commit('setUserInfo', reponse.data)
                this.$store.commit('setCurrFid', 1)
                this.$store.commit('setNextMenuShow', false)
                this.$router.push({
                    path: '/main'
				});
				// 获取先关用户信息
				this.getOwnerShopList()  //获取门店列表
				this.getOwnerRoleList() // 获取角色列表
				this.getCurrentShop()  //获取当前账号店铺
				this.getOwnerCashiers()  //获取收银员列表
				this.getOwnerGuides() //获取导购员列表
			})
        }
    },
    activated(){
		
    },
    created() {
		var olduser = window.localStorage.getItem("user")

		console.log(olduser)

        if (olduser) {
			console.log("1")
            olduser = JSON.parse(olduser)
			this.userInfo = olduser
        } else {
			console.log('2')
			this.$set(this.userInfo, 'loginCode', '')
			this.$set(this.userInfo, 'password', '')
            
        }
	}
};
</script>
<style scoped>
    .login_wrap{
        width: 100%;
        height: 100%;
        background: #F5F5F5;

    }
    .login_box{
        width: 403px;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        top: 20%;
        margin: auto;
    }
    .login_logo{
        text-align: center;
        margin-bottom: 22px;
    }
    .login_content{
        background: #ffffff;
        height: 335px;
        border-radius: 3px;
    }
    .login_title{
        font-size: 18px;
        text-align: center;
        letter-spacing: 2px;
        color: #606266;
        padding: 30px 0;
    }
    .login_input_wrap{
        text-align: center;
        margin-bottom: 17px;
    }
    .login_remPwd{
        padding-left: 42px;
    }
    .login_loginBtn{
        padding: 40px 0;
        text-align: center;
    }
</style>

