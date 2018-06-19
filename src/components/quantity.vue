<template>
    <div class="count">
        <span class="item quantity" @click="minus">-</span>
        <input type="item text" v-model="number" @blur="checkNumber">
        <span class="item quantity" @click="add">+</span>
    </div>
</template>

<script>
export default {
    props: {
        max: {
            type:Number,
            default: 50
        },
        min: {
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            number: this.min
        }
    },
    watch: {
        number(){
            this.$emit('changeNumber',this.number)
        }
    },
    methods: {
        checkNumber(){
          let fix;
          if(typeof this.number === 'string'){
            // 把所有不是数字的字符都清除掉;
              fix = Number(this.number.replace(/\D/g,''))
          }else{
              fix = this.number;
          }
          if(fix > this.max || fix < this.min){
              fix = this.min;
          }
          this.number = fix;
      },
      minus(){
          if(this.number <= this.min){
              return;
          }
          this.number--;
      },
      add(){
          if(this.number >= this.max){
              return;
          }
          this.number++;
      }
    }
}
</script>

<style scoped lang="scss">
    .count {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: flex-end;
    }
    .quantity {
        border: 1px solid #ccc;
        width: 2.6rem;
        height: 30px;
        line-height: 28px;
    }
    input {
        width: 2.8rem;
        border: none;
        text-align: center;
        height: 30px;
        line-height: 28px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        outline: 0;
    }
</style>

