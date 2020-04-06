<template>
    <div ref="parent" class="board">
        <a v-if="board.length > 0" :href="board"
           data-pin-do="embedBoard"
           :data-pin-board-width="width"
           :data-pin-scale-height="height"
           data-pin-scale-width="200">
        </a>        
        <div v-else class="color-brand super-bold horizontal center middle">        
            <h2><i class="fab fa-pinterest margin-right-10"></i></h2>
            Este profissional ainda não conectou nenhum quadro.
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            width:  200,
            height: 200
        }
    },
    mounted () {
        let that = this
        this.$nextTick(function () {                
            this.width  = this.$refs.parent.clientWidth
            this.height = this.$refs.parent.clientHeight
        })
    },
    props: {
        board: String
    },
    methods: { },
    computed: { },
}
</script>

<style lang="scss" scoped>
    .board {
        min-height: 100vh;
        min-width: 50vw;
    }
</style>