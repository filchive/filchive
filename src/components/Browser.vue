<template>
    <el-container>
	    <el-aside>
		    <el-input :placeholder="$t('search')" v-model="search" class="searchBox" size="mini">
			    <el-button slot="append" icon="el-icon-search"></el-button>
		    </el-input>
		    <div style="margin-top: 3em; text-align: center; width: 100%">
			    <p>Topics & Subjects</p>
			    <!--		    <el-form :model="form">-->
			    <!--			    <el-form-item label="topics" v-model="form.type">-->
			    <!--				    <el-checkbox-group>-->
			    <el-checkbox v-for="topic in topics" :label="topic" :key="topic" name="topic" style="display: flex; margin: 0 0 0.2em 6em"></el-checkbox>
			    <!--				    </el-checkbox-group>-->
			    <!--			    </el-form-item>-->
			    <!--		    </el-form>-->
		    </div>
	    </el-aside>
	    <el-main>
			<el-table :data="content" >
				<el-table-column label="Title">
					<template v-slot="scope">
						<el-link @click.stop="()=>{$router.push({name:'player', params: {meta: scope.row, page: currentPage}})}"><i class="el-icon-film"></i>{{scope.row.metadata.title}}</el-link>
					</template>
				</el-table-column>
				<el-table-column label="Creator" prop="metadata.creator" width="250"></el-table-column>
				<el-table-column label="AddDate" prop="metadata.addeddate" width="250"></el-table-column>
			</el-table>
		    <el-pagination
			    v-if="showPagination"
			    layout="prev, pager, next, jumper, total"
			    background
			    :current-page.sync="currentPage"
			    :page-count="pageCount"
			    style="margin-top: 1em"
			    @current-change="getContent"
		    >
		    </el-pagination>
	    </el-main>
    </el-container>
</template>

<script>
    import moment from 'moment';
    import api from '../assets/js/api'
    export default {
        data() {
            return {
                content: [],
	            topics:[
	                'video', 'Twitter', 'news', 'music', 'story'
	            ],
	            form: {},
	            search: '',
	            pageCount : 0,
	            currentPage: 1,
                showPagination: true
            };
        },
        methods: {
			getPageCount(){
			    api.getPageCount((err, count)=>{
			        if(err){
			            console.log(err);
			            return;
			        }
			        this.pageCount = parseInt(count);
			    })
			},
	        getContent(){
			    api.getContent(this.currentPage, (err, content)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    this.content = content;
			    })
	        }
        },
        mounted() {
            this.getPageCount();
            this.showPagination = false;
            if (this.$route.params.page) {
                this.currentPage = this.$route.params.page;
            }
            this.showPagination = true;
            this.getContent(this.currentPage);
        }
    };
</script>

<style scoped>
    .hidden {
        visibility: hidden;
    }

    .el-table {
        font-size: 13px;
    }

    .el-table .hidden-row {
        background-color: red;
    }

    .red {
        color: red;
    }

    .searchBox {
        width: 18em;
        border: 1px solid #c5c5c5;
        border-radius: 20px;
        background: #f4f4f4;

    }

    .searchBox /deep/ .el-input-group__append {
        border: none !important;
        background-color: transparent;
    }

    .searchBox /deep/ .el-input__inner {
        height: 2.4em;
        line-height: 2.4em;
        border: none;
        background-color: transparent;
    }

    .searchBox:hover {
        border: 1px solid #D5E3E8;
        background: #fff;
    }

    .searchBox:hover /deep/ .el-icon-search {
        color: #409eff;
        font-size: 16px;
    }
    /deep/ .el-badge__content.is-fixed{
	    top: 10px !important
    }



</style>
