<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType == 1" @click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType == 2" @click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>  
      </div>
    </div>
  </transition>
  
</template>

<script>
export default {
  name:'modal',
  props:{
    //弹框类型:小small、中middle、大large、表单form
    modalType:{
      type:String,
      default:'form',
    },
    //弹框标题
    title:{
      type:String,
      required: true
    },
    //1代表确定，2代表取消
    btnType:String,
    sureText:{
      type:String,
      default:'确定'
    },
    cancelText:{
      type:String,
      default:'取消'
    },
    showModal:Boolean
  }
}
</script>

<style lang="less">
@import './../assets/less/config.less';
@import './../assets/less/mixin.less';
@import './../assets/less/modal.less';
</style>