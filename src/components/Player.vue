<template>
	<div>
		<el-page-header @back="goBack" style="margin: 0 0 20px 20px"></el-page-header>
		<el-card shadow="never" style="width: 70%; float: left;text-align: center">
			<h1 slot="header">{{meta.metadata.title}}</h1>
			<video
				class="video-js vjs-layout-medium vjs-default-skin vjs-big-play-centered"
				ref="player"
			>
			</video>
		</el-card>
<!--		<el-row >-->
<!--			<el-col :span="16">-->
<!--				<div style="text-align: center; position: relative; padding: auto; margin: auto">-->
<!--					<h1>{{meta.metadata.title}}</h1>-->
<!--					<video-->
<!--						class="video-js vjs-layout-medium vjs-default-skin vjs-big-play-centered"-->
<!--						ref="player"-->
<!--						style="float: right"-->
<!--					>-->
<!--					</video>-->
<!--				</div>-->
<!--			</el-col>-->
<!--			<el-col>-->
<!--				1243-->
<!--			</el-col>-->
<!--		</el-row>-->
	</div>
</template>

<script>
    import api from '../assets/js/api'
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    const querystring = require('querystring')

    export default {
        name: "Player",
        data() {
            return {
                currentFile: 0,
                player: null,
                options: {
                    autoplay: false,
	                preload: 'none',
                    controls: true,
                    responsive: true,
                    width: 800,
                    height: 600,
                    sources: [],
                    fluid: true
                }
            }
        },
        props: ['meta', 'page'],
        methods: {
            goBack() {
                this.$router.push({
                    name: 'browser',
                    params: {
                        page: this.page
                    }
                });
            },
            loadVideo() {
                let cid = this.meta.files[this.currentFile].cid;
                let id = this.meta.metadata.identifier;
                //let filename = `${this.meta.files[this.currentFile].name}.mp4`;
                let miner = this.meta.deals[this.currentFile].miner;
                this.options.sources.push({
					src: `/api/retrieve?${querystring.stringify({miner: miner, dataCid: cid, id: id})}`,
	                type: 'video/mp4'
                })
                // api.loadVideo({miner: miner, dataCid: cid, id: id}, (err, data) => {
                //     if (err) {
                //         console.log(err);
                //         return;
                //     }
                //     console.log(data);
                // })
            }
        },
        mounted() {
            console.log(this.meta);
            this.loadVideo();
            this.player = videojs(this.$refs.player, this.options, ()=> {
            })
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose();
            }
        }
    }
</script>

<style scoped>

</style>
