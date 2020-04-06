<template>
    <div>           
        <!-- <form v-on:submit.prevent="reply" v-bind:style="{'width': largura}">      -->
        <form v-on:submit.prevent="reply">     
            <div class="text-container">
                <div v-if="hasUploadedMedias > 0" class="row mb-3"> 
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <thumbnails></thumbnails>                                              
                    </div>    
                    <div class="col-sm-1"></div>                
                </div>                          
                <div class="row horizontal middle">
                    <div class="col-sm-1">
                        <file-uploader singlebtn class="shadow horizontal middle center rounded-pill p-2 bg-brand color-white"></file-uploader>
                    </div>
                    <!-- TODO Investigate why cant we use 10 here -->
                    <div class="col-sm-10">                        
                        <input type="text" v-model="getComment.content" name="content"/>
                    </div>   
                    <div class="col-sm-1">
                        <submit-button>
                            <font-awesome-icon icon="paper-plane"></font-awesome-icon>
                        </submit-button>                        
                    </div>
                </div>                                                
            </div>                     
            <input v-if="sender" type="hidden" name="sender" :value="sender">
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters }   from 'vuex'
import FileUploader     from '@/components/layout/FileUploader'
import Thumbnails       from '@/components/layout/Thumbnails'

const MAX_CHARACTERS = 1000
export default {
    components: {
        'file-uploader': FileUploader,
        'thumbnails': Thumbnails  
    },
    data: function () {
        return {
            title:      '',
            content:    '',
            medias:     [],
            images:     [],
            links:      [],
            videos:     [],
            files:      [],
            thumbs:     [],
            enterToSend: true,            
        }
    },    
    props: {
        displayTitle:  Boolean,
        displaySend:   Boolean,
        placeholder:   String,
        sender:        String,        
        largura:         String
    },
    mounted() { },      
    methods: {
        ...mapActions(['replyComment']),
        reply() {
            this.replyComment()
        }
    },  
    computed: {
        ...mapGetters(['hasComment', 'getComment', 'hasUploadedMedias', 'getUploadedMedias']),
        charCount() {
            return this.getComment.content.length + '/' + MAX_CHARACTERS
        },

        charCountColor() {
            return this.getComment.content.length < MAX_CHARACTERS ? 'color-light-gray' : 'color-red'
        },

        hasTitle() { return this.getComment.title.length > 0 },
        hasContent() { return this.getComment.content.length > 0 },
    },
}
</script>

<style lang="scss" scoped>   
    .text-container {        
        background:     transparentize($lightPink, 0.8);
        padding:        20px 50px 20px 50px;

        input[type=text] {
            background:     $white;            
            border:         none;
            border-radius:  40px;
            padding:        15px;
            box-shadow:     none;
            width:          100%;
            resize:         none;

            &::placeholder, &::-webkit-input-placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder {
                font-size:  14px;
                opacity:    0.5;
            }

            &:focus {
                outline: none;
            }
        }
        
        [data-icon] {
            color: $white;
            margin-right: 0;
        }

        .character-counter {
            position:       absolute;
            bottom:         10px;
            right:          0px;
            color:          $lightGray;
            font-weight:    $bold;
            font-size:      10px;    
        }
    }
</style>