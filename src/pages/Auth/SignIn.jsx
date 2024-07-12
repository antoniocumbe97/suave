import React, { Fragment, useState } from "react";
import "../../assets/app/pages/page-auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login, saveUser } from "../../service/auth";
import { API, apiURL, clientSecret, clienteId } from "../../service/api";
import { SYSTEM_ROUTES } from "../../navigation";
import Logo from "../../assets/img/logo.png";
import { DASHBOARD } from "../../routes";
import { jwtDecode } from "jwt-decode";
import { Layout } from "../Layouts";
import axios from "axios";
import {
  UncontrolledAlert,
  FormFeedback,
  CardBody,
  Spinner,
  Button,
  Input,
  Card,
  Form,
} from "reactstrap";

export function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const { setAuthenticated, setUser } = useAuth();

  const parseUserString = (userString) => {
    const user = {};
    const regex = /(\w+)=([^,]+),?/g;
    let match;

    while ((match = regex.exec(userString)) !== null) {
      user[match[1]] = match[2];
    }

    return user;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const params = new URLSearchParams();
    params.append('username', contact);
    params.append('password', password);
    params.append('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${clienteId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(`${apiURL}/oauth/token`, params.toString(), { headers });
      login(response.data.access_token);
      const decodedToken = jwtDecode(response.data.access_token);
      const userString = decodedToken.user_name;
      const jwtUser = parseUserString(userString);
      console.debug("USER JWT", jwtUser);
      const response2 = await API.get(`/users/${jwtUser.id}`);
      const UserData = response2.data;
      console.debug("USER FORMATED", UserData);
      const user = {
        bi: UserData.bi,
        id: UserData.id,
        role: UserData.role,
        name: UserData.name,
        gender: UserData.gender,
        contact: UserData.contact,
        bithDate: UserData.bithDate,
      }
      saveUser(user);
      setUser(user);
      setAuthenticated(true);
      navigate(DASHBOARD);
      return response.data;
    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="auth-bg-container "
        style={{ backgroundColor: "#f294c0" }}
      >
        <div className="row authentication-wrapper authentication-basic container-p-y">
          <div className="row authentication-inner">
            <Card className="shadow p-4">
              <div className="">
                <span
                  className="row"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    paddingTop: "4em",
                  }}
                >
                  <img
                    className=""
                    style={{ width: "20em", aspectRatio: "auto" }}
                    src={Logo}
                    alt="Suave"
                  />
                </span>
              </div>
              <CardBody>
                <div className="app-brand justify-content-center mb-0">
                  <Link
                    to={SYSTEM_ROUTES.APP.index}
                    className="app-brand-link gap-2"
                  ></Link>
                </div>
                <h5 className="text-center text-dark">Forneça suas credenciais abaixo</h5>
                {errorMessage && (
                  <UncontrolledAlert color="danger">
                    {errorMessage}
                  </UncontrolledAlert>
                )}

                <Form
                  id="formAuthentication"
                  className="mb-3 pt-4"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <Input
                      type="number"
                      className="form-control py-3"
                      id="phone"
                      placeholder="Contacto"
                      autoFocus
                      required
                      invalid={errors.contact}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      autoComplete="false"
                    />

                    {errors.contact && (
                      <FormFeedback>{errors.contact[0]}</FormFeedback>
                    )}
                  </div>

                  <div className="mb-3 form-password-toggle">
                    <div className="input-group input-group-merge">
                      <Input
                        type="password"
                        id="password"
                        className="form-control py-3"
                        placeholder="Password"
                        aria-describedby="password"
                        required
                        invalid={errors.password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {errors.password && (
                        <FormFeedback>{errors.password[0]}</FormFeedback>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <Button
                      className="text-white fw-semibold d-grid w-100 p-3"
                      type="submit"
                      style={{ backgroundColor: "#de679f" }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="d-flex w-100 justify-content-center">
                          <Spinner size={"sm"} />
                        </div>
                      ) : (
                        <Fragment>
                          Login
                        </Fragment>
                      )}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
