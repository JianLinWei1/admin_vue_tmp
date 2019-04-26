<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="tableData" border style="width: 100%">
			<el-table-column prop="recordid" label="记录号" width="180">
			</el-table-column>
			<el-table-column prop="cardid" label="卡号/编号" width="100">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="80">
			</el-table-column>
			<el-table-column prop="verifyPhoto" label="比对照片" width="180">
				<template slot-scope="scope">
					<img :src="scope.row.verifyPhoto" alt="" style="width:50%">
				</template>
			</el-table-column>
			<el-table-column prop="verifytime" label="比对日期" width="180">
			</el-table-column>
			<el-table-column prop="verifyScore" label="比对分值" width="80">
			</el-table-column>
			<el-table-column prop="verifyResult" label="比对结果" width="80">
			</el-table-column>
			<el-table-column prop="deviceseril" label="设备" >
			</el-table-column>
			
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10, 20, 40, 60]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
		</el-pagination>
	</div>
</template>

<script>
	import {
		getLsRecord
	} from "@/api/LsPerson"

	export default {
		data() {
			return {
				totalCount: 0,
				tableData: null,
				listQuery: {
					page: 1, //页码
					limit: 10, //每页条数
				}
			}
		},
		created() {
			this.getLsPeron()
		},

		methods: {
			//编辑
			handleClick(row) {
				this.$alert('暂无', '提示', {
							confirmButtonText: '确定',
							/* callback: action => {
								this.$message({
									type: 'info',
									message: `action: ${ action }`
								});
							}, */
						})

					},
					//删除
					delClick(row) {
						row.photo = null;
						row.photofeatrue = null;
						delLsPerson(row).then(data => {
							if (data.code === 0)
								this.$message({
									message: data.msg,
									type: 'success'
								});
							this.getLsPeron();
						})
					},
					//每页数量改变
					handleSizeChange(val) {
						this.listQuery.limit = val
						this.handleFilter()
					},
					//当前页改变
					handleCurrentChange(val) {
						this.listQuery.page = val
						this.getLsPeron()
					},
					handleFilter() {
						//查询事件
						this.listQuery.pageNum = 1
						this.getLsPeron()
					},
					//加载数据
					getLsPeron() {
						this.listLoading = true
						getLsRecord(this.listQuery).then(data => {
							console.log(data)
							this.tableData = data.data;
							this.totalCount = data.count;
							this.listLoading = false

						})

					}
			},


		}
</script>

<style>
</style>
