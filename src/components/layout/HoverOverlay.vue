<template>
    <div>
        <div class="position-relative" @mouseover="hovering=true" @mouseleave="hovering=false">
            <slot></slot>
            <div v-show="hovering" class="hover-overlay overlay-8-pink clickable vertical middle center" :class="rounded ? 'rounded-circle' : ''">
                <i class="color-white super-bold" :class="icon"></i>
            </div>
        </div>
    </div>
</template>

<style>
    .hover-overlay {
        transition: display 1s ease ;
    }
</style>

<script>
    export default {
        data: function () {
            return {
                hovering: false
            }
        },
        mounted () { },
        props: {
            icon:       String,
            rounded:    {type: Boolean, default: true}
        },
        methods: { },
        computed: { },
    }
</script>