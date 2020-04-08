/**
 * actions 事件派发
 */
export default{
    /**
     * Action：类似于mutation，不同的是action操作的是mutation，而不是直接改变state,action可以包含异步操作
     * @param {*} context 
     * @param {*} username 
     */
    saveUserName(context,username){
        context.commit('saveUserName',username)
    },
    saveCartCount(context,count){
        context.commit('saveCartCount',count)
    },
    saveAddressForm(context,addressForm){
        context.commit('saveAddressForm',addressForm)
    }
}