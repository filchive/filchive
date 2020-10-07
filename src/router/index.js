import Vue from 'vue'
import Router from 'vue-router'
import Browser from '../components/Browser'
import Player from '../components/Player'
import LandingPage from '../components/LandingPage'


Vue.use(Router);
const router = new Router({
        routes: [
            {
				path: '/',
				name: 'landingPage',
				component: LandingPage,
				children:[
					{path:'', name:'browser', component: Browser},
					{path:'player', name:'player', component: Player, props: true}
				]
            },
        ],
    }
);

export default router;
