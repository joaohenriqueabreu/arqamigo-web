const createRoomStepsCfg = {
    MAIN_STEP:          'main',
    CATEGORIES_STEP:    'categories',
    AREA_STEP:          'area',
    MEDIAS_STEP:        'medias',
    DETAILS_STEP:       'details',
    READY_STEP:         'ready',
};

const events = {
    IMAGE_UPLOADED:     'image-uploaded',
    VIDEO_UPLOADED:     'video-uploaded',
    CONTENT_UPDATED:    'content-updated',
    TOGGLE_SLIDER:      'toggle-slide',
    FORM_SUBMIT:         'form-submit',
};

const mediaCfg = {
    IMAGE_TYPE:         'image',
    VIDEO_TYPE:         'video',    
};

const consultingCfg = {
    SENDER_CUSTOMER:     'customer',
    SENDER_PROFESSIONAL: 'professional',
}

const baseConfig = {
    UNIT_OF_MEASURE:    'm',    
    ROOM_STEPS:          [
        createRoomStepsCfg.MAIN_STEP, 
        createRoomStepsCfg.CATEGORIES_STEP, 
        createRoomStepsCfg.AREA_STEP, 
        createRoomStepsCfg.MEDIAS_STEP,
        createRoomStepsCfg.DETAILS_STEP, 
        createRoomStepsCfg.READY_STEP
    ],
};

export default {
    ...baseConfig,
    ...events,
    ...mediaCfg,
    ...consultingCfg,
    ...createRoomStepsCfg,
};

// const IMAGE_UPLOADED =     'image-uploaded';
// const VIDEO_UPLOADED =     'video-uploaded';
// const CONTENT_UPDATED =    'content-updated';

// const IMAGE_TYPE =         'image';
// const VIDEO_TYPE =         'video';
    
// const TOGGLE_SLIDER =      'toggle-slide';
    
// const SENDER_CUSTOMER =     'customer';
// const SENDER_PROFESSIONAL = 'professional';