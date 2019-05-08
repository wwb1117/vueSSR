import router from '../router'
// import store from '../store'
import myBase from '../utils/base'
const customDirective = {}

customDirective.install = Vue => {

    //自定义指令 路由后退一步
    Vue.directive('RouterBack', function(el){
        el.onclick = function(){
            router.go(-1)
        }
    })

    //验证是否有权限
    Vue.directive('perss', function(el, binding){
		let hasPermisson = myBase.isHasPerssion(binding.value)
		
        if (!hasPermisson){
            el.style.display = "none"
        }
    })
}

export default customDirective
