<template>
    <div>           
        <form v-on:submit.prevent="reply">     
            <div class="text-container">
                <div v-if="hasUploadedMedias > 0" class="row mb-3"> 
                    <div class="col-sm-1"></div>
                    <div class="col-sm-10">
                        <thumbnails></thumbnails>                                              
                    </div>                    
                </div>                          
                <div class="horizontal middle justify-content-between">
                    <div class="col-sm-1 shadow horizontal middle center rounded-pill p-2 bg-pink color-white">
                        <file-uploader singlebtn></file-uploader>
                    </div>
                    <div class="vertical col-sm-10">
                        <div v-if="displayTitle" class="full-width">
                            <input class="" type="text" name="title" placeholder="Dê um título para seu pedido" v-model="title">
                        </div>
                        <div class="position-relative">                                                         
                         <textarea v-model="getComment.content" name="content" :rows="displayTitle ? 3 : 1" title="content"></textarea>
                            <div v-if="displayTitle" class="character-counter">{{ charCount }}</div>                                                                
                        </div>
                    </div>   
                    <div class="col-sm-1">
                        <submit-button ref="submit">
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
import { mapActions, mapGetters }   from 'vuex';
import FileUploader     from '@/components/layout/FileUploader';
import Thumbnails       from '@/components/layout/Thumbnails';

const MAX_CHARACTERS = 1000;
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
        placeholder:    String,
        sender:         String,        
    },
    mounted() { },      
    methods: {
        ...mapActions(['replyComment']),
        reply() {
            this.replyComment();
            this.$refs.submit.disable();
        }
    },  
    computed: {
        ...mapGetters(['hasComment', 'getComment', 'hasUploadedMedias', 'getUploadedMedias']),
        charCount() {
            return this.getComment.content.length + '/' + MAX_CHARACTERS;
        },

        charCountColor() {
            return this.getComment.content.length < MAX_CHARACTERS ? 'color-light-gray' : 'color-red';
        },

        hasTitle() { return this.getComment.title.length > 0; },
        hasContent() { return this.getComment.content.length > 0; },
    },
}
</script>

<style lang="scss" scoped>   
    .text-container {        
        background:     transparentize($lightPink, 0.8);
        padding:        20px 50px 20px 50px;

        input[type=text], textarea {
            background: $white;            
            border: none;
            border-radius: 40px;
            padding: 15px;
            box-shadow: none;
            width: 100%;
            resize: none;

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
            position: absolute;
            bottom: 10px;
            right: 0px;      
            color: $lightGray;
            font-weight: $bold;
            font-size: 10px;      
        }
    }
</style>