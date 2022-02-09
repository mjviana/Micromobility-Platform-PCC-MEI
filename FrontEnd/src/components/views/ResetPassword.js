import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import logo from "../../images/img.png";
import reg from "../../images/reg.png";
import gateway from "../../connections";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateresetPassword = () => {
    let isValid = true;

    let validator = Form.validator({
      token: {
        value: token,
        isRequired: true,
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

  const resetPassword = (e) => {
    e.preventDefault();

    const validate = validateresetPassword();

    if (validate) {
      console.log(validate);
      console.log("Tentar comunicar com o gateway");
      gateway
        .post("/users/reset", {
          token: token,
          newPassword: password,
          confirmPassword: repeatPassword,
        })
        .then((response) => {
          if (response.status === 200) {
            setValidate({});
            setToken("");
            setPassword("");
            setRepeatPassword("");
            alert("Palavra Passe alterada com sucesso!");
            window.location.href = "/login";
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
            <div className="text-login">Alterar Palavra Passe</div>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={resetPassword}
                autoComplete={"off"}
              >
                <div className="text11">Código</div>
                <div className="email mb-3">
                  <input
                    type="text"
                    className={`form-control `}
                    id="token"
                    name="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </div>
                <div className="password mb-3">
                  <div className="text11">Palavra Passe</div>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        validate.validate && validate.validate.password
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
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.password
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
                      className={`form-control ${
                        validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                      name="repeatPassword"
                      id="repeatPassword"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
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
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.password
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
                    Alterar Palavra Passe
                    <Link className="text-link" to="/register"></Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
