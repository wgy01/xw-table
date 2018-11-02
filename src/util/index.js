
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
	
	btnParams.callback && btnParams.callback(params, btnParams);
	
	if(btnParams.hideBtn && btnParams.hideBtn === true) return false;
	
	if(!btnParams.poptipOpen){
		
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
		
	}else if(btnParams.poptipOpen){//二次确认
		
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
		
	}
	
}
