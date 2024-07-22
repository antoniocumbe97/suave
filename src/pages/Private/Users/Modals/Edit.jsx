import React, { useState } from "react";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner
} from "reactstrap";
import { renderToString } from "react-dom/server";
import { FaCheckCircle } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import { API } from "../../../../service/api";

const initialState = {
    contact: "",
    password: "",
}

const ModalEditUser = ({ data, refetchData }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(data);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await API.put(`/users/${user.id}`, user);
            const iconHtml = renderToString(<FaCheckCircle color="#4CAF50" size={70} style={{ border: "none" }} />);
            refetchData();
            toggle();
            Swal.fire({
                title: "User Updated",
                iconHtml: iconHtml
            });
            setUser(initialState);
        } catch (error) {

            if (error.code === 'ERR_NETWORK') {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'There was a problem connecting to the server. Please check your internet connection.'
                });
            } else if (error.response && error.response.status === 403) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "warning",
                });
            } else if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                className="btn btn-sm p-1 shadow-none"
                style={{ border: "2px solid #1D401C", backgroundColor: "#1D401C" }}
                onClick={toggle}
            >
                <BiEdit size={"18px"} color="#FFFFFF" />
            </Button>
            <Modal isOpen={modal} toggle={toggle} size="lg" style={{ color: "var(--insignio-primary-text)" }}>
                <ModalHeader toggle={toggle} className={'border-bottom text-center pb-3'}>Editar Usuário</ModalHeader>
                <ModalBody>
                    <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="name">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder=""
                                required
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="contact">
                                Contacto
                            </Label>
                            <Input
                                id="contact"
                                name="contact"
                                placeholder=""
                                type="text"
                                required
                                value={user.contact}
                                onChange={(e) => setUser({ ...user, contact: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="gender">
                                Sexo
                            </Label>
                            <Input
                                id="gender"
                                name="gender"
                                type="select"
                                required
                                value={user.gender}
                                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                            >
                                <option value=""></option>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="bi">
                                Número do B.I
                            </Label>
                            <Input
                                id="bi"
                                name="bi"
                                placeholder=""
                                type="text"
                                required
                                value={user.bi}
                                onChange={(e) => setUser({ ...user, bi: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="birthDate">
                                Data de Nascimento
                            </Label>
                            <Input
                                id="birthDate"
                                name="birthDate"
                                placeholder="DD/MM/YYYY"
                                type="date"
                                required
                                value={user.birthDate}
                                onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="contact" className="required">Contacto</Label>
                                <Input
                                    id="contact"
                                    type="text"
                                    value={user.contact}
                                    onChange={(e) => setUser({ ...user, contact: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className="border-0 mb-3">
                    <Button color="dark" size="md" onClick={toggle} outline>
                        Cancel
                    </Button>
                    {isLoading ?
                        <Button color="primary" size="md" type="button">
                            <Spinner
                                as="span"
                                variant="white"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                animation="grow"
                            />
                        </Button>
                        :
                        <Button color="primary" size="md" onClick={handleSubmit}>
                            Gravar
                        </Button>
                    }{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}
export default ModalEditUser;