<template>
	<div>
		<el-row>
			<el-col :span="24">
				<el-page-header @back="goBack" style="margin: 0 0 20px 20px"></el-page-header>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="18">
				<el-card shadow="never" style="width: 100%; float: left;text-align: center;">
					<h1 slot="header">{{metadata.metadata.title}}</h1>
					<video
						class="video-js vjs-layout-medium vjs-default-skin vjs-big-play-centered"
						ref="player"
					>
					</video>
				</el-card>
			</el-col>
			<el-col :span="6">
				<div>
					<el-card shadow="never" style="width: 90%; text-align: left; display: inline-block; line-height: 2em">
						<span slot="header" style="margin-left: 1em"><b>Metadata</b></span>
						<div style="margin-left: 2em">
							<b>Identifier</b>: {{metadata.metadata.identifier}}<br>
							<b>Subject</b>: {{metadata.metadata.subject}}<br>
							<b>Collection</b>: {{metadata.metadata.collection}}<br>
							<b>Description</b>: {{metadata.metadata.description}}<br>
							<b>Add Date</b>: {{metadata.metadata.addeddate}}<br>
							<b>Uploader</b>: {{metadata.metadata.uploader}}<br>
						</div>
					</el-card>
					<el-card shadow="never" style="width: 90%; text-align: left; display: inline-block; line-height: 2em">
						<span slot="header" style="margin-left: 1em"><b>Files</b></span>
						<div style="margin-left: 2em">
							<p v-for="(file, index) in metadata.files"><el-button type="text" @click="loadVideo(index)">{{file.name}}</el-button></p>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    const querystring = require('querystring')

    export default {
        name: "Player",
        data() {
            return {
                player: null,
	            metadata: null,
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
            loadVideo(index) {
                let cid = this.metadata.files[index].cid;
                let id = this.metadata.metadata.identifier;
                //let filename = `${this.meta.files[this.currentFile].name}.mp4`;
                let miner = this.metadata.files[index].deals[index].miner;
                this.options.sources=[{
					src: `/api/retrieve?${querystring.stringify({miner: miner, dataCid: cid, id: id})}`,
	                type: 'video/mp4'
                }]
            }
        },
	    beforeMount(){
            if(this.meta){
                this.metadata = this.meta;
                localStorage.metadata = JSON.stringify(this.metadata);
            }else{
                this.metadata = JSON.parse(localStorage.metadata);
            }
	    },
        mounted() {
            console.log(this.meta);
            console.log(this.metadata);
            this.loadVideo(0);
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
 /deep/ .el-card__header {padding: 0 !important;}
 /deep/ .el-card__body {padding: 0 !important;}
</style>
