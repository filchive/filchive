import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router = new Router({
        routes: [
            {
				path: '/',
				name: 'landing-page',
				component: require('@/components/LandingPage').default,
            },
        ],
    }
);

export default router;
