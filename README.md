# 版本

```
v1.0.9
```

# 安装

```
$ npm install xw-table --save
```

# 更新

```
$ npm update xw-table
```

# 引入

### 在入口文件 main.js 中如下配置：

```
import xwTable from 'xw-table';

Vue.use(xwTable);
```

### 页面中使用组件

```
<xw-table></xw-table>
```

# config 配置

### props：

属性 | 说明 | 类型 | 默认值
:-------: | ------- | :-------: | :-------:
tableId | 表格唯一标识 | Number | 无
tableColumns | 传入表头数据 | Array | 必传数据
tableData | 传入表格数据 | Array | []
headerShow | 是否显示页眉 | Boolean | true
footerShow | 是否显示页脚 | Boolean | true
seekShow | 是否显示搜索框控件 | Boolean | true
pageShow | 是否显示分页控件 | Boolean | true
modalTitle | 对话框标题 | String | 对话框标题
noDataText | 表格数据为空时显示的提示内容 | String | 暂无数据
pagingData | 传入分页数据 | Object | {total: 0, current_page: 1, page_size: 10,}
modalWidth | 对话框宽度 | String / Number | 80%
modalFooterHide | 不显示对话框页脚 | Boolean | false
modalOkBtnName | 对话框页脚确定按钮名称 | String | 确定
okBtnHide | 隐藏对话框页脚确定按钮 | Boolean | false
modalCancelBtnName | 对话框页脚取消按钮名称 | String | 取消
modalBtnPlace | 对话框页脚按钮位置 | String | right
searchTxt | 搜索框占位文本 | String | 搜索...
loading | 表格是否加载中 | Boolean | false


### 表头数据参数：

参数名 | 说明 | 类型 | 默认值
:-------: | ------- | :-------: | :-------:
editable | 需要编辑的当前字段 | Boolean | false
handle | 设置操作按钮 | Array | 无


### 表头handle参数：

参数名 | 说明 | 类型 | 默认值
:-------: | ------- | :-------: | :-------:
name | 按钮名称 | String | 按钮
hideBtn | 隐藏按钮 | Boolean | false
modalShow | 是否打开对话框 | Boolean | false
poptipOpen | 是否打开气泡提示 | Boolean | false
button_props | 按钮组件的iview原生api属性 | Object | {}
poptip_props | 气泡提示组件的iview原生api属性 | Object | {}
callback | 按钮渲染时的回调，返回值：params：表格当前行参数，btnParams：按钮参数| Function(params, btnParams) | 无
rowEdit | 是否打开编辑当前行功能（编辑当前行按钮不支持“button_props”参数） | Boolean | false
editKeyArr | 需要编辑行的表头key值 | Array | 无


### events：

事件名 | 说明 | 返回值 | 类型 |
:-------: | ------- | :-------: | :-------:
on-page-change | 页码改变时 | page：当前页码 | number
on-page-size-change | 切换每页条数时的回调，返回切换后的每页条数 | page_size：每页条数 | number
select-change | 勾选改变时 | checkedData：已选择的数据 | []
on-btn-click | 点击表格中的按钮时触发 | data：返回表格当前行数据,和当前handle的参数 | {}
on-poptip-ok | 点击表格中的气泡提示确定按钮时触发 | data：返回表格当前行数据,和当前handle的参数 | {}
on-poptip-cancel | 点击表格中的气泡提示取消按钮时触发 | data：返回表格当前行数据,和当前handle的参数 | {}
on-modal-ok | 对话框确定按钮点击事件 | -- | --
on-modal-cancel | 对话框取消按钮点击事件 | -- | --
on-search | 点击或回车触发搜索按钮事件 | value：搜索框输入的值 | String
on-editRow-save | 点击编辑但前行的保存按钮 | editSuccData：返回保存成功后的数据 | Object
route-query | 刷新页面后获取当前路由状态（实例被创建完毕之后执行） | $route.query | Object


### slot：

名称 | 说明
:-------: | :-------:
header | 表格页头
footer | 表格页尾
modalContent | 对话框内容
modalFooterBtn | 自定义对话框页脚按钮
