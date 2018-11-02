import xwTable from './components/xw-table.vue';

const paykeyboard = {
    install (Vue, options) {
        Vue.component(xwTable.name, xwTable);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(paykeyboard);
}

export default paykeyboard