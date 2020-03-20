<template>
  <div>
      <carousel class="full-width" :perPage="50">
            <slide v-for="thumb in thumbs" :key="thumb" class="clickable mr-2" @slideclick="openModal(thumb)">
                <div class="horizontal">
                    <hover-overlay icon="search">
                        <img v-if="thumb" class="thumbnail" :src="thumb"/>
                    </hover-overlay>                    
                </div>
            </slide>            
        </carousel>      
  </div>
</template>

<script>
export default {
    props: {
        thumbs: { type: Array }
    },
    methods: {
        openModal(url) {
            this.$swal("url");
        }
    }
}
</script>

<style lang="scss" scoped>
    .thumbnail {
        height: 50px;
        width: 50px;
    }
</style>