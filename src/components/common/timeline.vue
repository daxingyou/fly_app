<template>
  <div id="timeLine">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String,Number]
    }
  },
  mounted() {
    
    this.init();

  },
  methods: {
    init() {
      var arr = Array.of();
      for (var item of this.$slots.default) {
        if (item.componentOptions) {
          if (item.componentOptions.tag === "timelineItem") {
             item.child.sign = false;
            arr.push(item);
            if (this.label) {
              if (item.child.index === this.label) {
                for (var item2 of arr) {
                  item2.child.sign = true;
                }
              }
            }
          }
        }
      }
      arr[arr.length - 1].child.show = false;
    }
  },
  watch:{
    label(){
    this.$nextTick(()=>{
      this.init();
      // alert(1)
    })
    


    }
    
  }
};
</script>

<style lang="less">
#timeLine {
  display: flex;
  justify-content: center;
}
</style>
