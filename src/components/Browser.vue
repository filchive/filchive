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
				<el-table-column label="Title">
					<template v-slot="scope">
						<el-link><i class="el-icon-film"></i>{{scope.row.name}}</el-link>
					</template>
				</el-table-column>
				<el-table-column label="Creator" prop="creator" width="250"></el-table-column>
				<el-table-column label="AddDate" prop="addDate" width="250"></el-table-column>
			</el-table>
		    <el-pagination
			    layout="prev, pager, next, jumper, total"
			    background
			    :current-page1="1"
			    :page-count="100"
			    :page-size="100"
			    style="margin-top: 1em"
		    >
		    </el-pagination>
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
                    {
                        name: 'O Shahade Amira Imarata Kavkaz Dokku Abu Usmana',
                        creator: 'Kavkaz TV',
                        addDate: '2014-07-20 10:26:36'
                    },
                    {
                        name: 'israelbicepilp',
                        creator: 'israelbicepilp',
                        addDate: '2011-05-28 18:17:31'
                    },
                    {
                        name: 'Medical Videos - 05 Normal Spontsneous vaginal delivery - Obstetrics and Gynecology.',
                        creator: 'mvbirth',
                        addDate: '2010-10-23 05:09:30'
                    },
                    {
                        name: 'Dokku_obrash',
                        creator: 'Dokku_obrash',
                        addDate: '2014-10-30 18:21:35'
                    },
                    {
                        name: 'His new job ( Charles Chaplin-1915)',
                        creator: 'Faluu',
                        addDate: '2012-08-02 21:50:12'
                    },
                    {
                        name: 'unlimited_earning_trick_on_mobile_premier_league_mpl',
                        creator: 'mbelong',
                        addDate: '2020-01-29 15:44:19'
                    },
                    {
                        name: 'Wanyed Mbuapa',
                        creator: 'Sitampan',
                        addDate: '2018-05-09 17:29:48'
                    }
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
