<template>
	
	<div>
		
		<!--页眉-->
		<header v-if="headerShow" class="header">
			<Row type="flex" align="middle" :gutter="10">
				<Col span="16">
					<slot name="header" :slotEvent="slotEvent"></slot>
				</Col>
				<Col span="8">
					<Input v-if="seekShow" :search="true" enter-button clearable placeholder="搜索..." class="seek" />
				</Col>
			</Row>
		</header>
		
		<!--表格-->
		<Table
		stripe
		:columns="tableColumns"
		:data="tableData"
		:highlight-row="true"
		:no-data-text="noDataText"
		@on-select-all="tabSelectAll"
		@on-select-all-cancel="tabSelectAllCancel"
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
		width="80%"
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
	        			<Button type="primary" @click="modalOk">{{modalBtnName}}</Button>
	        			<Button @click="modalCancel">取消</Button>
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
		
		tableColumns: {//表头数据
			type: Array,
			required: true
		},
		
		tableData: {//表格数据
			type: Array,
			default: () => []
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
		
		modalFooterHide: {//对话框页脚显示
			type: Boolean,
			default: false
		},
		
		modalBtnName: {//对话框页脚按钮名称
			type: String,
			default: '确定'
		},
		
		modalBtnPlace: {//对话框页脚按钮位置
			type: String,
			default: 'right'
		},
		
	},
    data () {//数据
        return {
        	
        	modalShow: false,
        	
        	checkedData: [],//已选数据
        	
        }
    },
    methods: {//方法
    	
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
    		
	    		if(item.handle){
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
    	
    	pageChange(page){//页码改变时
    		this.$emit('on-page-change', page);
    	},
    	
    	pageSizeChange(page_size){//切换每页条数时的回调，返回切换后的每页条数
    		this.$emit('on-page-size-change', page_size);
    	},
    	
    	tabSelectAll(selection){//全选
    		
    		this.tableData.forEach(item => {
    			selection.forEach(item2 => {
    				if(item.id === item2.id){
    					this.$set(item, '_checked', true);
    				}
    			});
    		});
    		
    	},
    	
    	tabSelectAllCancel(selection){//取消全选
    		
    		this.tableData.forEach(item => {
				this.$set(item, '_checked', false);
			});
			
    	},
    	
    	tabSelect(selection, row){//单选
    		
    		this.tableData.forEach(item => {
    			if(item.id === row.id){
      				this.$set(item, '_checked', true);
    			}
    		});
    		
    	},
    	
    	tabSelectCancel(selection, row){//单个取消
    		
    		this.tableData.forEach(item => {
    			if(item.id === row.id){
      				this.$set(item, '_checked', false);
    			}
    		});
    		
    	},
    	
    	tabSelectionChange(selection){//勾选改变时
    		
    		this.checkedData = selection;
    		
    		this.$emit('select-change', this.checkedData);
    		
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	this.initColumns();
    	
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