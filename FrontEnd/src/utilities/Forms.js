class Form {

    /**
     * Validate Login
     * @param str 
     * @returns boolean
     */
    static validEmail(str) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str);
    }

    /**
     * Minimum length of string
     * @param str 
     * @param length 
     * @returns 
     */
    static minLength(str, length) {
        let isInvalid = false;

        if (str.length < length) {
            isInvalid = true;
        }

        return isInvalid;
    }

    /**
     * Form Validator
     * @param  obj 
     * @returns 
     */
    static validator(obj) {
        let keys = Object.entries(obj);
        let results = [];
        let validations = null;

        keys.map((key) => {
            if ('isRequired' in key[1] && key[1].isRequired) {
                if (key[1].value.length === 0) {
                    results.push({
                        [key[0]]: [`O campo ${key[0]} é de preenchimento obrigatório!`]
                    });
                } else {
                    if ('isEmail' in key[1] && key[1].isEmail) {
                        let isValidEmail = Form.validEmail(key[1].value);

                        if (!isValidEmail) {
                            results.push({
                                [key[0]]: [`O campo ${key[0]} tem de ser válido!.`]
                            });
                        }
                    }

                    if ('minLength' in key[1] && Form.minLength(key[1].value, key[1].minLength)) {
                        results.push({
                            [key[0]]: [`A ${key[0]} deve conter ${key[1].minLength} caracteres!`]
                        });
                    }
                }
            } else if ('isEmail' in key[1]) {
                let isValidEmail = Form.validEmail(key[1].value);

                if (!isValidEmail) {
                    results.push({
                        [key[0]]: [`O campo ${key[0]} deve ser válido!`]
                    });
                }
            } else if ('minLength' in key[1] && Form.minLength(key[1].value, key[1].minLength)) {
                results.push({
                    [key[0]]: [`A ${key[0]} deve conter ${key[1].minLength} caracteres!`]
                });
            }
            return results
        })

        results = Object.assign({}, ...results.map((result) => result))

        if (Object.keys(results).length > 0) {
            validations = {
                errors: results
            }
        } else {
            validations = null
        }

        return validations;
    }
}

export default Form