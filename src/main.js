// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import messages from './assets/js/i18n'
import flags  from 'flag-icon-css/css/flag-icon.css'
import FontAwesomeIcon from 'font-awesome/css/font-awesome.min.css'
import VueI18n from 'vue-i18n'


Vue.use(ElementUI);
Vue.use(require('vue-cookies'));
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(flags)
Vue.use(FontAwesomeIcon)
let lang = (navigator.language||navigator.userLanguage).substring(0, 2) || 'cn'

const i18n = new VueI18n({
	locale: lang.startsWith('zh') ? 'cn' : lang,
	messages: messages
})


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	i18n,
	template: '<App/>'
})
