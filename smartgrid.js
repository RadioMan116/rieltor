const smartgrid = require('smart-grid');

const settings = {
    columns: 12,
    offset: '20px',
    container: {
        maxWidth: '1166px',
        fields: '0'
    },
    breakPoints: {
        ls: {
            width: "1280px",
            fields: "20px"
        },
        ld: {
            width: "1024px",
            fields: "15px"
        },
        sm: {
            width: "768px",
            fields: "10px"
        },
        md: {
            width: "600px",
            fields: "5px"
        },
        xs: {
            width: "480px",
            fields: "5px"
        },
        xxs: {
            width: "320px",
            fields: "5px"
        }
    },
    oldSizeStyle: false,
    properties: [
        'justify-content'
    ]
};

smartgrid('./src/precss', settings);