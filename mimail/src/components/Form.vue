<template>
  <div class="form">
     <form class='form-box'>
         <input 
         v-for="(item,index) in formList" 
         :key='index' 
         :text="item.type"
         :placeholder="item.placeholder"
         v-model="form[item.model]"
         :class="item.style == 1 ? 'small' : 'len'"
         >
         <p @click='transmit'>保存</p>
     </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    form: Object,
    formList:Array
  },
  data() {
    return {
    };
  },
  methods: {
      // 传参,当调用此方法，将表单数据传递给父组件
      transmit(){
          this.$emit('transmit',this.form)
      }
  },
  created(){
      console.log(this.form)
      console.log(this.formList) 
  }
};
</script>

<style lang="scss" scoped>
@import '.././assets/scss/config.scss';
.form{
    .form-box{
        display:flex;
        justify-content:space-between;
        flex-wrap:wrap;
        position:relative;
        input{
            height:40px;
            display:inline-block;
            outline:none;
            border:1px solid #E5E5E5;
            margin-bottom:15px;
            box-sizing:border-box;
            padding-left:15px;
        }
        // 长的输入框,如占据一行的地址和详细地址
        .len{
            width:100%
        }
        // 短的输入框,如姓名，手机号
        .small{
            width:283px
        }
        p{  
            display: block;
            width: 110PX;
            height: 50px;
            text-align:center;
            line-height: 50px;
            background-color: $colorA;
            font-size:14px;
            color:#FFF;
            cursor:pointer;
            margin:0 38%;
        }
    }
        
}
</style>