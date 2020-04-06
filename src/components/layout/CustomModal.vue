<template>
    <div>
        <v-modal :name="name" :adaptive="true" :clickToClose="true" height="auto">        
            <div class="top-right" @click="$modal.hide(name)">
                <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
            <slot></slot>    
        </v-modal>
    </div>
  <!--  -->
</template>

<script>
export default {
    props: {
        name: String
    }
}
</script>

<style lang="scss" scoped>
    [data-icon] {
        @extend .clickable;
        font-size:  $large;
        color:      $lightGray;
    }

    .top-right {        
        @extend .clickable;
        position:   absolute;
        top:        5px;
        right:      5px;
        z-index:    $moveToTop;
    }
</style>