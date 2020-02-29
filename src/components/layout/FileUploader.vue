<template>
    <div class="horizontal middle center">
        <!-- <div v-if="showCamera" class="media-button clickable" v-on:click="openImageUploader('camera')" v-tooltip.top-center="'Tirar uma fota'"> -->
        <div v-if="showCamera" class="horizontal media-button clickable" v-on:click="openImageUploader('camera')">
            <font-awesome-icon icon="camera"></font-awesome-icon>            
            <div class="h-space-10"></div>
        </div>        
        <!-- <div v-if="showVideo" class="media-button clickable" v-on:click="openImageUploader('local')" v-tooltip.top-center="'Enviar um video'"> -->
        <div v-if="showVideo" class="horizontal media-button clickable" v-on:click="openImageUploader('local')">
            <font-awesome-icon icon="video"></font-awesome-icon>            
            <div class="h-space-10"></div>
        </div>        
        <!-- <div class="media-button clickable" :class="docmode ? 'dark' : ''" v-on:click="openImageUploader('local')" v-tooltip.top-center="docmode ? '' : 'Enviar uma imagem'"> -->
        <div class="horizontal media-button clickable" :class="docmode ? 'dark' : ''" v-on:click="openImageUploader('local')">
            <font-awesome-icon :icon="docmode ? ['far', 'arrow-circle-up'] : ['fas', 'images']"></font-awesome-icon>            
            <div class="h-space-10"></div>
        </div>        
        <!-- <div v-if="showInstagram" class="media-button clickable" v-on:click="openImageUploader('instagram')" v-tooltip.top-center="'Adicione uma imagem do seu instagram'"> -->
        <div v-if="showInstagram" class="horizontal media-button clickable" v-on:click="openImageUploader('instagram')">
            <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>                            
        </div>

        <input type="hidden" name="images" v-model="images">
        <input type="hidden" name="videos" v-model="videos">
    </div>
</template>

<style lang="scss">    

    .media-button {
        color:          white;
        background:     transparent;

        &.dark {
            color: $pink;

            &:hover {
                color:  $pink;
            }
        }

        &:hover {
            color: purple;
        }

        i {
            margin-right:   20px;
            font-size:      20px;
        }
    }
</style>

<script>
    let cloudinary = window.cloudinary;    

    const CLOUD_NAME = 'arquiamigo';
    const ALLOWED_MEDIA_FORMATS = [
        '3gp', 'png', 'jpg', 'jpeg', 'tiff', 'gif', 'avi', 'flv', 'wmv', 'mp4', 'mov', 'ogg', 'pdf'
    ];
    export default {
        data: function () {
            return {
                hover:  false,
                images: [],
                docs:   [],
                videos: [],
                media:  {},
            }
        },
        props: { 
            video:      { type: Boolean, default: true },
            instagram:  { type: Boolean, default: true },
            camera:     { type: Boolean, default: true },
            docmode:    { type: Boolean, default: false }
        },
        methods: {
            openImageUploader: function (source) {
                cloudinary.openUploadWidget({
                    cloud_name:             CLOUD_NAME,
                    upload_preset:          'geiyc85i',
                    defaultSource:          source,
                    resourceTypes:          ['image', 'raw'],
                    maxFiles:               1,
                    maxFileSize:            20000000, // 20MB
                    clientAllowedFormats:   ALLOWED_MEDIA_FORMATS,
                    cropping:               true,
                    folder:                 'customer',
                    sources:                this.fileSources,
                    language:               'pt-Br',
                },
                (error, result) => {
                    if (result && result.event === "success") {
                        this.media = {
                            'name':             result.info.original_filename + '.' + result.info.format,
                            'public_id':        result.info.public_id,
                            'type':             result.info.resource_type,
                            'resouce_type':     result.info.resource_type,
                            'format':           result.info.format,
                            'url':              result.info.secure_url,
                            'thumbnail_url':    result.info.thumbnail_url
                        };

                        if (result.info.resource_type === this.$config.IMAGE_TYPE) {                            
                            this.images.push(JSON.stringify([this.media]));
                            if (this.docmode) { this.docs = this.images; }
                        }

                        if (result.info.resource_type === this.$config.VIDEO_TYPE) {
                            this.videos.push(JSON.stringify([this.media]));
                            this.$parent.$emit(this.$config.VIDEO_UPLOADED, result.info);
                        }
                    }

                    if (result && result.event === "close" && this.images.length > 0) {
                        this.$parent.$emit(this.$config.IMAGE_UPLOADED, this.media);
                    }                    
                });
            },

            openVideoUploader: function () {
                this.$modal.show('youtube-link');
            },
        },
        computed: {
            showCamera: function ()     { return this.camera    && ! this.docmode; },
            showVideo: function ()      { return this.video     && ! this.docmode; },
            showInstagram: function ()  { return this.instagram && ! this.docmode; },
            fileSources: function () {
                let sources = ['local'];
                if (this.showCamera)    { sources.push('camera'); }
                if (this.showVideo)     { sources.push('video'); }
                if (this.showInstagram) { sources.push('instagram'); }

                return sources;
            }
        },
    }
</script>