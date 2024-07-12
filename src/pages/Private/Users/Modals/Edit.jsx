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
import Swal from "sweetalert2";
import { API } from "../../../../service/api";

const initialState = {
    contact: "",
    password: "",
}

const ModalEditUser = ({ modal, toggle, data, refetchData }) => {

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
        <Modal isOpen={modal} toggle={toggle} size="lg" style={{ color: "var(--insignio-primary-text)" }}>
            <ModalHeader toggle={toggle} className={'border-bottom text-center pb-3'}>Editar Usuário</ModalHeader>
            <ModalBody>
                <Row>
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
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password" className="required">Password</Label>
                            <Input
                                id="password"
                                type="text"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                        Generate Report
                    </Button>
                }{' '}
            </ModalFooter>
        </Modal>
    );
}
export default ModalEditUser;