import { useState } from "react";
import { Link } from "react-router-dom";
import rec from '../../images/rec.jpg';
import Form from '../../utilities/Forms';
import logo from '../../images/img.png';
import gateway from '../../connections';

const Activation = () => {

    const [activationcode, setactivationcode] = useState('');

    const validateCode = () => {
        let isValid = true;

        let validator = Form.validator({
            code: {
                value: activationcode,
                isRequired: true
                
            },
        });

        if (validator !== null) {
            setactivationcode({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const insertcode = (e) => {
        e.preventDefault();

        const validate = validateCode();

        if (validate) {

            console.log(validate);
            console.log("Tentar comunicar com o gateway");
            gateway
                .post("/users/activate", {
                    email:  localStorage.getItem("email"),
                    code: activationcode,
                })
                .then((response) => {
                    if (response.status === 200) {
                        setactivationcode('');
                        alert('Conta ativada com sucesso!');
                        window.location.href = "/login";
                    }
                })
                .catch((e) => {
                    console.log(e);
                    switch (e.response.status) {
                        case 400:
                            alert(e.response.data.message);
                            break;
                          case 404:
                            alert(e.response.data.message);
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
                    <div className="text-login">Ativar conta</div>
                    <div className="text1">Insira o código de ativação</div>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={insertcode} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input type="text"
                                        className={`form-control ${activationcode.validate && activationcode.validate.email ? 'is-invalid ' : ''}`}
                                        id="activationcode"
                                        name="activationcode"
                                        value={activationcode}
                                        onChange={(e) => setactivationcode(e.target.value)}
                                    />
                                </div>
                                <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Inserir<Link className="text-link" to="/login" ></Link></button>
                                </div>
                            </form>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Activation;