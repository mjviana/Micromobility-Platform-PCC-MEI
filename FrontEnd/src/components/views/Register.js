import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import logo from "../../images/img.png";
import reg from "../../images/reg.png";
import gateway from "../../connections";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepetPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true,
      },
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 5,
      },
      repeatpassword: {
        value: password,
        isRequired: true,
        minLength: 5,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      console.log(validate);
      console.log("Tentar comunicar com o gateway");
      gateway
        .post("/users/signup", {
          email: email,
          password: password,
          confirmPassword: repeatPassword,
        })
        .then((response) => {
          if (response.status === 200) {
            setValidate({});
            setName("");
            setEmail("");
            setPassword("");
            setRepetPassword("");
            localStorage.setItem("email", email);
            alert("Registo efetuado com sucesso!");
            window.location.href = "/activation";
          }
        })
        .catch((e) => {
          console.log(e);
          switch (e.status) {
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
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="auth-wrapper4">
          <div>
            <img
              src={reg}
              width="500"
              height="977"
              padding-left="200"
              alt="Registo"
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="auth-wrapper3">
          <div className="auth-wrapper auth-body">
            <div>
              <img
                src={logo}
                width="200px"
                height="200px"
                padding-left="200"
                alt="CoolScooter"
              />
            </div>
            <div className="text-login">Efetue o seu registo</div>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={register}
                autoComplete={"off"}
              >
                <div className="text1">Nome</div>
                <div className="name mb-3">
                  <input
                    type="text"
                    className={`form-control ${validate.validate && validate.validate.name
                        ? "is-invalid "
                        : ""
                      }`}
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.name
                        ? "d-block"
                        : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.name
                      ? validate.validate.name[0]
                      : ""}
                  </div>
                </div>
                <div className="text11">Email</div>
                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
                      }`}
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div>
                </div>
                <div className="password mb-3">
                  <div className="text11">Palavra Passe</div>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                        }`}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>
                    <div
                      className={`invalid-feedback text-start ${validate.validate && validate.validate.password
                          ? "d-block"
                          : "d-none"
                        }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="password mb-3">
                  <div className="text11">Repita a Palavra Passe</div>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                        }`}
                      name="repeatPassword"
                      id="repeatPassword"
                      value={repeatPassword}
                      onChange={(e) => setRepetPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>
                    <div
                      className={`invalid-feedback text-start ${validate.validate && validate.validate.password
                          ? "d-block"
                          : "d-none"
                        }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Criar registo
                    <Link className="text-link" to="/register"></Link>
                  </button>
                </div>
              </form>
              <hr />
              <div className="auth-option text-center pt-2">
                Será enviado um email com o código de ativação.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
