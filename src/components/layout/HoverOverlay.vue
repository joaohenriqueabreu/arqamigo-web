<template>
    <div>
        <div class="position-relative" @mouseover="hovering=true" @mouseleave="hovering=false">
            <slot></slot>
            <div v-show="hovering" class="overlay clickable vertical middle center" :class="rounded ? 'rounded-circle' : ''">
                <font-awesome-icon :icon="fontIcon"></font-awesome-icon>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>    
.overlay {    
    position:   absolute;
    top:        0;
    left:       0;
    min-height: 100%;
    width:      100%;   
    color:      $white; 
    &:hover {
        @extend .transition-ease;
        // transition: all 0.5s ease;
        background-color: $pink;
        z-index:          100;
        opacity:          0.8;
    }   
    
    .circle {
        border-radius: 50%;
    }
}
</style>

<script>
    export default {
        data: function () {
            return {
                hovering: false
            }
        },
        props: ['rounded', 'icon'],
        computed: {
            fontIcon() {
                return this.icon;
            }
        }
    }
</script>