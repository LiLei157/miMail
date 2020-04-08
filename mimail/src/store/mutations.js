/**
 * mutations操作state
 */
export default{
    /**
     * 保存用户名
     * @param {} state 
     * @param {*} username 
     */
    saveUserName(state,username){
        state.username = username
    },
    /**
     * 保存购物车数量
     * @param {*} state 
     * @param {*} count 
     */
    saveCartCount(state,count){
        state.cartCount = count
    },
    saveAddressForm(state,addressForm){
        state.addressFormData = addressForm
    }
}