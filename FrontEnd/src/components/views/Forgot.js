import { useState } from "react";
import Form from '../../utilities/Forms';
import logo from '../../images/img.png';
import rec from '../../images/rec.jpg';
import gateway from '../../connections';

const Forgot = () => {

    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState({});

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const forgotPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {

            console.log(validate);
            console.log("Tentar comunicar com o gateway");
            gateway
                .post("/users/forgot", {
                    email: email,
                })
                .then((response) => {
                    if (response.status === 200) {
                        setEmail('');
                        setValidate('');
                        alert('Pedido de recuperação de Palavra Passe enviado com sucesso!');
                        window.location.href = "/resetpassword";
                    }
                })
                .catch((e) => {
                    console.log(e);
                    switch (e.status)  {
                        case 400:
                            alert("Náo foi possivel processar o pedido");
                            break;
                        default:
                            alert("Algo correu mal");
                            break;
                    }
                    return false;
                });
        }
    }

    return (
        <div className="row g-0 auth-wrapper">

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="auth-wrapper4">
                    <div><img src={rec} width="500" height="977" padding-left="200" alt="Registo" /></div>
                </div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="auth-wrapper3">
                    <div className="auth-wrapper auth-body">
                        <div><img src={logo} width="200px" height="200px" padding-left="200" alt="CoolScooter" /></div>
                        <div className="text-login">Recuperar Palavra Passe</div>
                        <div className="text1">Email</div>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={forgotPassword} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Recuperar Palavra Passe</button>
                                </div>
                            </form>
                            <hr />
                            <div className="auth-option text-center pt-2">Será enviado um email com as intruções para a recuperação da Palavra Passe.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgot;