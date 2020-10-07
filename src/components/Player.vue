<template>
	<div>
		<el-page-header @back="goBack" style="margin: 0 0 20px 20px"></el-page-header>
		<h1>{{meta.metadata.title}}</h1>
	</div>
</template>

<script>
    export default {
        name: "Player",
	    props:['meta', 'page'],
	    methods:{
          goBack(){
              this.$router.push({
                  name: 'browser',
                  params: {
                      page: this.page
                  }
              });
          }
	    },
	    mounted() {
            console.log(this.page)
        }
    }
</script>

<style scoped>

</style>
