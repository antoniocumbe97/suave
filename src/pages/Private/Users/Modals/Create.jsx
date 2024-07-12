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
    Spinner,
} from "reactstrap";
import { renderToString } from "react-dom/server";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { API } from "../../../../service/api";

const inputInitialState = {
    name: '',
    contact: '',
    gender: '',
    bi: '',
    birthDate: '',
    role: 'user',
}

const ModalCreateUser = ({ modal, toggle, refetchData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState(inputInitialState);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await API.post('/users/create/user', inputs);
            console.log("Response",response.data);
            const iconHtml = renderToString(<FaCheckCircle color="#4CAF50" size={70} style={{ border: "none" }} />);
            refetchData();
            toggle();
            Swal.fire({
                title: "User Created",
                iconHtml: iconHtml
            });
            // setInputs(inputInitialState);
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
            } else if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" style={{ color: "var(--insignio-primary-text)" }}>
            <ModalHeader toggle={toggle} className={'border-bottom text-center pb-3'}>Novo Usuário</ModalHeader>
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
                                value={inputs.name}
                                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
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
                                value={inputs.contact}
                                onChange={(e) => setInputs({ ...inputs, contact: e.target.value })}
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
                                value={inputs.gender}
                                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
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
                                value={inputs.bi}
                                onChange={(e) => setInputs({ ...inputs, bi: e.target.value })}
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
                                value={inputs.birthDate}
                                onChange={(e) => setInputs({ ...inputs, birthDate: e.target.value })}
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
                    <Button color="primary" size="md" onClick={handleSubmit}>
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
                        Enviar
                    </Button>
                }{' '}
            </ModalFooter>
        </Modal>
    );
}
export default ModalCreateUser;
