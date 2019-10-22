module.exports = function () {
    //i18n l10n
    const DEFAULT_LANGUAGE = "en";

    const TEXTS = {
        en: {

        },
        no: {
            
        },
        ro: {
            
        },
        fr: {
            
        },
        ar: {
            
        },

        de: {

        },

        bg: {
            
        },
        sa: {
            
        }
    };


    return function getClientLang(req, res, next) {
        let language = req.headers["accept-language"] || DEFAULT_LANGUAGE;
        language = language.split(/[, -]/)[0].split(";")[0]; 
        let languages = Object.keys(TEXTS); 
        if (languages.indexOf(language) < 0) {
            language = DEFAULT_LANGUAGE;
        }

        req.language = function (key) {
            let value = TEXTS[language][key];
            if (!value) {
                value = TEXTS[DEFAULT_LANGUAGE][key];
                console.error(
                    `Person that wrote the ${language} made a mistake with key ${key}`
                );
            }

            return value;
        };

        next();
    };
};


