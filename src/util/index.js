
let defaultBtnProps = {
    type: 'primary',
    size: 'small',
}

let defaultPoptip = {
	confirm: true,
    title: "标题",
    transfer: true
}

export const buttonItem = (vm, h, params, btnParams={}) => {
	
	let tabCurrentRow = vm.tableDataList.filter(item => {
		return item.id === params.row.id
	})[0];
	
	btnParams.callback && btnParams.callback(params, btnParams);//按钮加载中回调
	
	if(btnParams.hideBtn && btnParams.hideBtn === true) return false;//隐藏按钮
	
	if(btnParams.poptipOpen){//二次确认功能按钮
		
		return h('Poptip',{
			
			props: Object.assign({}, defaultPoptip, (btnParams.poptip_props || {})),
			
			on: {
		    		
	    		'on-ok': () => {
	    			
	    			vm.$emit('on-poptip-ok', Object.assign({}, btnParams, {params: params}));
	    			
	    		},
	    		
	    		'on-cancel': () => {
	    			
	    			vm.$emit('on-poptip-cancel', Object.assign({}, btnParams, {params: params}));
	    			
	    		}
	    		
	    	},
			
		},[
			
			h('Button',{
	    	
		    	props: Object.assign({}, defaultBtnProps, (btnParams.button_props || {})),
		    	
		    	style: {
		    		
		    		margin: '2px 2px',
		    		
		    	},
		    	
//		    	on: {
//	    		
//		    		click: () => {
//		    			
//		    			vm.$emit('on-btn-click', Object.assign({}, btnParams, {params: params}));
//		    			
//		    		}
//		    		
//		    	},
		    	
		    },btnParams.name || '按钮')
			
		]);
		
	}else if(btnParams.rowEdit){//编辑当前行功能按钮
		
		let children = [];
		
		let editBtn = h('Button',{ //编辑按钮
    	
	    	props: {
	    		type: tabCurrentRow.editting ? 'success' : 'primary',
				icon: tabCurrentRow.editting ? 'md-checkmark' : '',
	    	},
	    	on: {
	    		
	    		click: () => {
	    			
	    			if(tabCurrentRow.editting){//点击保存
	    				
	    				let editSuccData = {};
	    				
	    				btnParams.editKeyArr.forEach(keyItem => {
	    					tabCurrentRow[keyItem] = params.row[keyItem];
	    					editSuccData[keyItem] = params.row[keyItem];
	    				});
	    				
	    				if(tabCurrentRow){
	    					tabCurrentRow.editting = false;
	    				}
	    				
	    				vm.$emit('on-editRow-save', editSuccData);
	    				
	    			}else{//点击编辑
	    				
	    				if(tabCurrentRow){
	    					tabCurrentRow.editting = true;
	    				}
	    				
	    			}
					
	    			vm.tableDataList = JSON.parse(JSON.stringify(vm.tableDataList));//重新渲染表格数据
	    			
	    		}
	    		
	    	},
	    	
	    }, tabCurrentRow.editting ? '' : '编辑');
	    
	    let cancelBtn = h('Button',{//取消按钮
			props: {
				type: 'error',
				icon: 'md-close',
			},
			on:{
				click: () => {
					if(tabCurrentRow){
						tabCurrentRow.editting = false;
					}
				}
			}
		}, '');
		
		if(tabCurrentRow.editting){//点击编辑显示按钮
			
			children.push(editBtn, cancelBtn);
			
		}else{//默认显示按钮
			
			children.push(editBtn);
			
		}
		
		return h('ButtonGroup',{
			props: {
				size: 'small',
			},
			style: {
	    		margin: '2px 2px',
	    	},
		},children);
		
	}else{//默认功能按钮
		
		return h('Button',{
    	
	    	props: Object.assign({}, defaultBtnProps, (btnParams.button_props || {})),
	    	
	    	style: {
	    		
	    		margin: '2px 2px',
	    		
	    	},
	    	
	    	on: {
	    		
	    		click: () => {
	    			
	    			vm.$emit('on-btn-click', Object.assign({}, btnParams, {params: params}));
	    			
	    			if(btnParams.modalShow){
	    				vm.modalShow = btnParams.modalShow;
	    			}
	    			
	    		}
	    		
	    	},
	    	
	    },btnParams.name || '按钮');
		
	}
	
}
