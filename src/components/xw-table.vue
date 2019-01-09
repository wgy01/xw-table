<template>
	
	<div>
		
		<!--页眉-->
		<header v-if="headerShow" class="header">
			<Row type="flex" align="middle" :gutter="10">
				<Col span="16">
					<slot name="header" :slotEvent="slotEvent"></slot>
				</Col>
				<Col span="8">
					<Input v-if="seekShow" class="seek" v-model="searchVal" :search="true" enter-button clearable :placeholder="searchTxt" @on-search="searchClick" />
				</Col>
			</Row>
		</header>
		
		<!--表格-->
		<Table
		stripe
		:columns="tableColumns"
		:data="tableDataList"
		:highlight-row="true"
		:no-data-text="noDataText"
		:loading="loading"
		@on-select-all="tabSelectAll"
		@on-select="tabSelect"
		@on-selection-change="tabSelectionChange"
		@on-select-cancel="tabSelectCancel"
		>
		</Table>
		
		<!--页脚-->
		<footer v-if="footerShow" class="footer">
			<slot name="footer"></slot>
			<Page
			v-if="pageShow"
			:total="pagingData.total"
			:page-size="pagingData.page_size"
			:current="pagingData.current_page"
			@on-change="pageChange"
			@on-page-size-change="pageSizeChange"
			show-total
			show-sizer
			show-elevator
			style="margin-left: auto;" />
		</footer>
		
		<!--弹窗-->
		<Modal
		v-model="modalShow"
		:width="modalWidth"
		:footer-hide="modalFooterHide"
		>
	    	<div slot="header" style="position: relative;">
	    		<p>{{modalTitle}}</p>
		    	<div style="position: absolute;top: -2px;right: 0;">
		    		<Icon color="#ed4014" size="26" type="md-close-circle" @click.native="modalShow = false" style="cursor: pointer;" />
		    	</div>
	    	</div>
	    	<div slot="close"></div>
	        <slot name="modalContent" v-if="modalShow"></slot>
	        <div slot="footer">
	        	<slot name="modalFooterBtn">
	        		<div :style="{textAlign: modalBtnPlace}">
	        			<Button v-if="!okBtnHide" type="primary" @click="modalOk">{{modalOkBtnName}}</Button>
	        			<Button @click="modalCancel">{{modalCancelBtnName}}</Button>
	        		</div>
	        	</slot>
	        </div>
	    </Modal>
		
	</div>
	
</template>

<script>

import { buttonItem } from '../util'

export default {
	name: 'xwTable',
	components:{//组件模板
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		
//		tableId: {//表格唯一标识
//			type: Number,
//		},
		
		tableColumns: {//表头数据
			type: Array,
			required: true
		},
		
		tableData: {//表格数据
			type: Array,
			default: () => []
		},
		
		loading: {//表格是否加载中
			type: Boolean,
			default: false
		},
		
		headerShow: {//页眉
			type: Boolean,
			default: true
		},
		
		footerShow: {//页脚
			type: Boolean,
			default: true
		},
		
		seekShow: {//搜索框控件
			type: Boolean,
			default: true
		},
		
		searchTxt: {//搜索框描述
			type: String,
			default: '搜索...'
		},
		
		pageShow: {//分页控件
			type: Boolean,
			default: true
		},
		
		modalTitle: {//弹窗标题
			type: String,
			default: '对话框标题'
		},
		
		noDataText: {//数据为空时显示的提示内容
			type: String,
			default: '暂无数据'
		},
		
		pagingData: {//分页数据
			type: Object,
			default: () => {
				return {
					total: 0,
					current_page: 1,
					page_size: 10,
				}
			}
		},
		
		modalWidth: {//对话框宽度
			type: [String, Number],
			default: '80%'
		},
		
		modalFooterHide: {//对话框页脚显示
			type: Boolean,
			default: false
		},
		
		okBtnHide: {//隐藏对话框页脚确定按钮
			type: Boolean,
			default: false
		},
		
		modalOkBtnName: {//对话框页脚确定按钮名称
			type: String,
			default: '确定'
		},
		
		modalCancelBtnName: {//对话框页脚取消按钮名称
			type: String,
			default: '取消'
		},
		
		modalBtnPlace: {//对话框页脚按钮位置
			type: String,
			default: 'right'
		},
		
	},
    data () {//数据
        return {
        	
        	tableDataList: this.tableData,//表格数据
        	
        	searchVal: '',//搜索框值
        	
        	modalShow: false,
        	
        	checkedData: [],//已选数据
        	
        	currentCheckedData: [],//当前已选中数据
        	
//      	routerState: {//路由状态
//  			['page'+this.tableId]: 1,
//          	['pageSize'+this.tableId]: 10,
//  		},
    		
        }
    },
    methods: {//方法
    	
    	searchClick(){//点击或回车搜索按钮触发
    		this.$emit('on-search', this.searchVal);
    	},
    	
    	slotEvent(val){//插槽事件
    		
    		console.log(val);
    		console.log('执行了子组件的事件');
    		
    	},
    	
    	modalOk(){//对话框确定按钮点击事件
    		this.$emit('on-modal-ok');
    	},
    	
    	modalCancel(){//对话框取消按钮点击事件
    		this.modalShow = false;
    		this.$emit('on-modal-cancel');
    	},
    	
    	initColumns(){//初始化表头数据
    		
    		this.tableColumns.forEach(item => {
    			
    			if(item.editable){//编辑文本框
    				item.render = (h, params) => {
    					
    					let currentRow = this.tableDataList.filter(item2 => {
		    				return item2.id === params.row.id
		    			})[0];
    					
    					if(currentRow.editting){//编辑
    						
    						return h('Input', {
                                props: {
                                    type: 'text',
                                    value: currentRow[item.key],
                                    placeholder:'请输入'+item.title
                                },
                                on: {
                                    'on-change' (event) {
                                    	params.row[item.key] = event.target.value;
                                    }
                                }
                            });
    						
    					}else{//默认
    						
    						return h('div',currentRow[item.key]);
    						
    					}
    					
    				}
    			}
    			
	    		if(item.handle){//操作按钮
	    			item.render = (h,params) => {
	    				let children = [];
	    				item.handle.forEach(btnItem => {
	    					children.push(buttonItem(this, h, params, btnItem));
	    				});
	    				return h('div',{
	    					style: {
	    						padding: '4px 0'
	    					}
	    				},children);
	    			}
	    		}
	    		
	    	});
    		
    	},
    	
//  	setRoutePara(){//设置路由参数
//  		
//  		this.$router.push(
//	    		{
//	    			name: this.$route.name,
//	    			query: Object.assign({}, this.$route.query, this.routerState)
//	    		}
//  		);
//  		
//  	},
    	
    	pageChange(page){//页码改变时
    		
//  		this.routerState['page'+this.tableId] = page;
//  		
//  		this.setRoutePara();//设置路由参数
    		
    		this.$emit('on-page-change', page);
    		
    	},
    	
    	pageSizeChange(page_size){//切换每页条数时的回调，返回切换后的每页条数
    		
//  		this.routerState['pageSize'+this.tableId] = page_size;
//  		
//  		this.setRoutePara();//设置路由参数
    		
    		this.$emit('on-page-size-change', page_size);
    		
    	},
    	
    	tabSelectAll(selection){//全选
    		
    		let SW1 = false;
    		
    		let SW2 = true;
    		
    		if(this.checkedData.length > 0){
    			
    			selection.forEach(item1 => {
    				
    				this.checkedData.forEach(item2 => {
    					
    					if(item1.id != item2.id){
    						SW1 = false;
    					}else{
    						SW1 = true;
    					}
    					
    					if(SW1){
    						SW2 = false;
    					}
    				
	    			});
	    			
	    			if(SW2){
	    				item1._checked = true;
    					this.checkedData.push(item1);
	    			}else{
	    				
	    				let SW3 = true;
	    				
	    				this.checkedData.forEach(item3 => {
	    					if(item1.id == item3.id){
	    						SW3 = false;
	    						item3._checked = true;
	    					}
	    				});
	    				
	    				if(SW3){
	    					item1._checked = true;
    						this.checkedData.push(item1);
	    				}
	    				
	    			}
    				
	    		});
    			
    		}else{
    			
    			selection.forEach(item => {
    				item._checked = true;
    				this.checkedData.push(item);
	    		});
    			
    		}
    		
    	},
    	
    	tabSelect(selection, row){//单选
    		
    		let SW = true;
    		
    		this.checkedData.forEach(item => {
    			if(item.id == row.id){
    				SW = false;
					item._checked = true;
    			}
    		});
    		
    		if(SW){
    			row._checked = true;
    			this.checkedData.push(row);
    		}
    		
    	},
    	
    	tabSelectCancel(selection, row){//取消单选
    		
    		this.checkedData.forEach(item => {
    			if(item.id == row.id){
					item._checked = false;
    			}
    		});
    		
    	},
    	
    	tabSelectionChange(selection){//勾选改变时
    		
    		if(selection.length == 0){//取消全选
    			this.checkedData.forEach(item1 => {
    				this.tableDataList.forEach(item2 => {
    					if(item1.id == item2.id){
    						item1._checked = false;
    					}
    				});
	    		});
    		}
    		
    		let newArr = [];
    		
    		this.checkedData.forEach(item => {
    			if(item._checked){
    				newArr.push(item);
    			}
    		});
    		
    		this.currentCheckedData = newArr;
    		
    		this.$emit('select-change', this.currentCheckedData);
    		
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
    	'$route'(to){// 对路由变化作出响应...
    		
//  		if((Number(this.pagingData.total) > Number(to.query['pageSize'+this.tableId])) && (Number(to.query['page'+this.tableId]) <= (Math.ceil(Number(this.pagingData.total)/Number(to.query['pageSize'+this.tableId]))))){//一页
//  			
//  			this.pagingData.current_page = Number(to.query['page'+this.tableId]);
//  			
//  		}else{
//  			
//  			this.setRoutePara();
//  			
//  		}
//  		
//  		this.pagingData.page_size = Number(to.query['pageSize'+this.tableId]);
    		
    	},
    	
    	tableData(newData){//切换页码时显示已勾选项
    		
    		if(this.currentCheckedData.length > 0){
    			newData.forEach(item => {
    				this.currentCheckedData.forEach(item2 => {
    					if(item.id == item2.id){
    						item._checked = item2._checked;
    					}
    				});
    			});
    		}
    		
    		this.tableDataList = newData;
    		
    	},
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	this.initColumns();
    	
//  	if(this.$route.query['page'+this.tableId]){
//  		this.pagingData.current_page = Number(this.$route.query['page'+this.tableId]);
//  	}
//  	if(this.$route.query['pageSize'+this.tableId]){
//  		this.pagingData.page_size = Number(this.$route.query['pageSize'+this.tableId]);
//  	}
//  	
//  	this.$emit('route-query', {
//  		page: Number(this.$route.query['page'+this.tableId]),
//  		pageSize: Number(this.$route.query['pageSize'+this.tableId])
//  	});
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
}
</script>

<style scoped lang="less">
	.public(){
		display: flex;
		align-items: center;
	}
	.header{
		margin-bottom: 14px;
	}
	.footer{
		.public();
		margin-top: 14px;
	}
	.seek{
		width: 100%;
	}
</style>

<style lang="less">
	.my-ivu-modal-wrap{
		position: flex !important;
		top: 92px !important;
		transition: left 0.2s ease-in-out;
	}
	.leftmax{
		left: 200px !important;
	}
	.leftmin{
		left: 64px !important;
	}
	.seek{
		.ivu-input-icon-clear{
			right: 50px !important;
		}
	}
	@media (max-width: 768px){
		.my-modal-box .ivu-modal {
		     width: 100% !important;
		     margin: 0 !important; 
		}
	}
	.my-modal-box .ivu-modal-header{
		height: 45px;
	}
</style>