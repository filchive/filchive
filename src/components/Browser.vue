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
			<el-table :data="tableData" >
				<el-table-column label="Name">
					<template v-slot="scope">
						<el-link><i class="el-icon-film"></i>{{scope.row.name}}</el-link>
					</template>
				</el-table-column>
				<el-table-column label="Creator" prop="creator" width="250"></el-table-column>
				<el-table-column label="AddDate" prop="addDate" width="250"></el-table-column>
			</el-table>
	    </el-main>
    </el-container>
</template>

<script>
    import moment from 'moment';
    export default {
        data() {
            return {
                tableData: [
	                {
	                    name: 'Namaz nasıl kılınır?',
		                creator: 'Namaz Zamanı',
		                addDate: '2019-12-26 19:31:09'
	                },
                    {
                        name: 'El Senor Es Bueno Gracias Por Todooos',
                        creator: 'CHINO1986',
                        addDate: '2020-02-05 19:44:55'
                    },
                    {
                        name: 'cCloud TV v0.6 Rise',
                        creator: 'Bane',
                        addDate: '2015-11-26 20:04:00'
                    },
                ],
	            topics:[
	                'video', 'Twitter', 'news', 'music', 'story'
	            ],
	            form: {},
	            search: ''
            };
        },
        methods: {

        },
        mounted() {
            //  this.init();
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
