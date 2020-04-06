<template>
    <div>
        <div class="position-relative" @mouseover="hovering=true" @mouseleave="hovering=false">
            <slot></slot>
            <div v-show="hovering || (radioMode && selected)" 
                class="overlay clickable vertical middle center" :class="{'rounded-circle': rounded, 'selected': selected}">
                <font-awesome-icon :icon="fontIcon" v-if="icon"></font-awesome-icon>
                <span v-if="text">{{ text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                hovering: false,
                selected: false
            }
        },
        props: {
            rounded:        { type: Boolean, default: false }, 
            icon:           { type: String }, 
            text:           { type: String },
            radioMode:      { type: Boolean, default: false },      
            id:             { type: String }      
        },
        methods: {
            select()    { this.selected = true },
            unselect()  { this.selected = false }
        },
        computed: {
            fontIcon() {
                return this.icon
            }
        }
    }
</script>

<style lang="scss" scoped>    
.overlay {    
    position:   absolute;
    top:        0;
    left:       0;
    min-height: 100%;
    width:      100%;  
    color:      $white;
    &:hover, &.selected {
        @extend .transition-ease;
        background-color: $brand;
        z-index:          100;
        opacity:          0.9;
        &:hover {
            opacity: 0.7;
        }
    }
    
    [data-icon] {    
        color: $white;
        font-weight: $bold;
        margin-right: 0;
        opacity: 1;
    }

    span {
        opacity: 1;
    }
    
    .circle {
        border-radius: 50%;
    }
}
</style>