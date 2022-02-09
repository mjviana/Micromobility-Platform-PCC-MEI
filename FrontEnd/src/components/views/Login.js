import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import logo from "../../images/img.png";
import smartmobility from "../../images/smartmobility.png";
import gateway from "../../connections";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 4,
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

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin();

    if (validate) {
      console.log(validate);
      console.log("Tentar comunicar com o gateway");

      gateway
        .post("/users/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setValidate({});
            setEmail("");
            setPassword("");
            alert("Login efetuado com sucesso");
            window.location.href = "/home";
          }
        })
        .catch((e) => {
          console.log(e);
          switch (e.response.status)  {
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
        <div className="auth-wrapper2">
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
            <div className="text-login">Efetue login na sua conta</div>
            <div className="text1">Email</div>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={authenticate}
                autoComplete={"off"}
              >
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
                <div className="text11">Palavra Passe</div>
                <div className="password mb-3">
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
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div className="auth-option text-center pt-2">
                <Link className="text-link" to="/register">
                  Criar conta
                </Link>
              </div>
              <div className="auth-option text-center pt-2">
                Dificuldades em efetuar{" "}
                <Link to="/forgot-password">Login?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div>
          {" "}
          <img src={smartmobility} width="1370" height="977" alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Login;
