# 安装

```
$ npm install xw-table --save
```

# 引入

### 在入口文件 main.js 中如下配置：

```
import xwTable from 'xw-table';

Vue.use(xwArea);
```

### 页面中使用组件

```
<xw-table></xw-table>
```

# config 配置

### props：

属性 | 说明 | 类型 | 默认值
:-------: | ------- | :-------: | :-------:
tableColumns | 表头数据 | Array | 必传数据
tableData | 表格数据 | Array | []
headerShow | 页眉 | Boolean | true
footerShow | 页脚 | Boolean | true
seekShow | 搜索框控件 | Boolean | true
pageShow | 分页控件 | Boolean | true
modalTitle | 对话框标题 | String | 对话框标题
noDataText | 数据为空时显示的提示内容 | String | 暂无数据
pagingData | 分页数据 | Object | {total: 0, current_page: 1, page_size: 10,}


### handle参数：
参数名 | 说明 | 类型 | 默认值
:-------: | ------- | :-------: | :-------:
name | 按钮名称 | String | 按钮
modalShow | 是否打开对话框 | Boolean | false
poptipOpen | 是否打开气泡提示 | Boolean | false
button_props | 按钮的iview，api属性 | Object | {}
poptip_props | 气泡提示的iview，api属性 | Object | {}
callback | 按钮渲染时的回调，返回值：params：表格当前行参数，btnParams：按钮参数| Function(params, btnParams) | 无


### events：

事件名 | 说明 | 返回值 | 类型 |
:-------: | ------- | :-------: | :-------:
on-page-change | 页码改变时 | page：当前页码 | number
on-page-size-change | 切换每页条数时的回调，返回切换后的每页条数 | page_size：每页条数 | number
select-change | 勾选改变时 | checkedData：已选择的数据 | []
on-btn-click | 点击表格中的按钮时触发 | data：返回表格当前行数据,和当前handle的参数 | {}
on-poptip-ok | 点击表格中的气泡提示确定按钮时触发 | data：返回表格当前行数据,和当前handle的参数 | {}
on-poptip-cancel | 点击表格中的气泡提示取消按钮时触发 | data：返回表格当前行数据,和当前handle的参数 | {}


### slot：

名称 | 说明
:-------: | :-------:
header | 表格页头
footer | 表格页尾
modalContent | 对话框内容
