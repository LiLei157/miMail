/**
 * Storage封装：目的是便于存储，这里为了配合后台使用SessionSotrage
 * 
 */
const STORAGE_KEY = "mall"  //全局常量，用于获取整个大的数据模块,例如：key为mall的value中有多项数据，product,order
export default{
    /**
     * 2、往sessionStorage设置数据
     * @param {*} key 添加数据到哪个key
     * @param {*} value 待添加的数据，JSON对象
     * @param {*} module_name 要添加数据的子模块
     */
    setItem(key,value,module_name){
        // 设置数据也分2种情况：1、如果该数据下key下有module_name，则先找到对应的module_name对象
        //                     2、如果没有module_name,则直接向STORAGE_KEY下添加数据
        if(module_name){
            let val = this.getItem(module_name)
            val[key] = value
            // 递归函数自己调用自己设置参数
            this.setItem(module_name,val)
        }else{
            let val = this.getStorage()
            val[key] = value
            // 修改数据后还要记得重新往SessionStorage设置一次，SessionStorage,Cookie都是存储String字符串
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
        }
    },
    /**
     * 1、根据key获取value
     * @param {*} key :想要获取的key对应的value
     * @param {*} module_name :STORAGE_KEY大模块下的子module_name
     */
    getItem(key,module_name){
        //这里要分2种情况：1.mall下有子module_name
        if(module_name){
            // 如果STORAGE_KEY有二级module_name
            let val = this.getItem(module_name)
            // 如果module_name对应的val不是空     
            if(val) return val[key]
        }
        //如果mall下没有二级module_name
        return this.getStorage()[key]
    },
    /**
     * 根据key删除对应的value
     * @param {*} key 
     * @param {*} module_name 
     */
    clear(key,module_name){
        let val = this.getStorage()
        // 和获取module_name的value一样，删除这里需要判断module_name的value是否本来就为空，如果为空就不用再删一次了；
        // 不为空则delete
        if(module_name){
            if(!val[module_name]){
                return
            }else{
                delete val[module_name]
            }
        }else{
            delete val[key]
        }
        // 无论是修改还是删除，都需要将数据重新写进SessionStorage
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
    ,
    // 1、获取整个大的数据模块,因为Storage中以key/value,并且字符串的形式，所以这里要使用JSON.parse()转换成json对象
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_kEY) || '{}')
    }
}