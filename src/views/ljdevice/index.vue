<template>
	<div class="app-container">
		<el-table v-loading="listLoading" :data="tableData" border style="width: 100%">
			<el-table-column prop="deviceSeril" label="设备序列号" width="180">
			</el-table-column>
			<el-table-column prop="deviceName" label="设备名称" width="180">
			</el-table-column>
			<el-table-column prop="deviceAddress" label="设备地址" width="180">
			</el-table-column>
			<el-table-column prop="tcpIp" label="tcp_ip" width="180">
			</el-table-column>
			<el-table-column prop="state" label="状态" width="180">
				<template slot-scope="scope">
					<div v-if="scope.row.state === 'on'">
						<p style="color: #008000;">在线</p>
					</div>
					<div v-else> 离线</div>
				
				</template>
			</el-table-column>
			<!-- <el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column> -->
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10, 20, 40, 60]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
		</el-pagination>
	</div>
</template>

<script>
	import {
		getLjDevices
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
			this.getLjDeivces()
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
					getLjDeivces(){
						console.log("jjj")
						this.listLoading = true
						getLjDevices(this.listQuery).then(data => {
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
