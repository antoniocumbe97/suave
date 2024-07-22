import React, { useState } from "react";
import {
    Button,
    Col,
    FormFeedback,
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
import Swal from "sweetalert2";
import { API } from "../../../../service/api";

const ModalCreate = ({ modal, toggle, refetchData }) => {
    const inputInitialState = {
        name: '',
        contact: '',
        gender: '',
        bi: '',
        birthDate: '',
    }
    
    const [inputs, setInputs] = useState(inputInitialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('contact', inputs.contact);
            formData.append('gender', inputs.gender);
            formData.append('bi', inputs.bi);
            formData.append('birthDate', inputs.birthDate);
            formData.append('role', 'cliente');
            
         //   console.log("response", response);

            const response = await API.post('/users', formData);
            const iconHtml = renderToString(<FaCheckCircle color="#4CAF50" size={70} style={{ border: "none" }} />);
         //   console.log("response", response);
            refetchData();
            toggle();
            Swal.fire({
                title: "Cliente Registado Com Sucesso!",
                iconHtml: iconHtml
            });
            setInputs(inputInitialState);
        } catch (error) {
            console.error("Error",error)
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Houve um problema ao conectar ao servidor. Por favor, verifique sua conexão com a internet.'
                });
            } else if (error.response && error.response.status === 403) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "warning",
                });
            } else if (error.response.data.message === 'validation error') {
                setErrors(error.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" style={{ color: "var(--insignio-primary-text)" }} centered>
            <ModalHeader toggle={toggle} className={'border-bottom text-center pb-3'}>Registar Cliente</ModalHeader>
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
                        Save
                    </Button>
                }{' '}
            </ModalFooter>
        </Modal>
    );
}
export default ModalCreate;