import React, { useEffect, useState } from "react";
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
import { getUser } from "../../../../service/auth";

const ModalCreate = ({ modal, toggle, refetchData }) => {
    const user = getUser();
    const inputInitialState = {
        requester: { id: Number(user.id), name: user.name, recruits: [] },
        godson: null,
        request_type: false,
        products: [
            {
                type: 'sabao_verde',
                quantity: '0',
            },
            {
                type: 'sabao_branco',
                quantity: '0',
            },
            {
                type: 'turbo',
                quantity: '0',
            },
            {
                type: 'cha_fluxo',
                quantity: '0',
            },
            {
                type: 'cha_colicas',
                quantity: '0',
            }
        ],
        description: '',
    };

    const [inputs, setInputs] = useState(inputInitialState);
    const [isLoading, setIsLoading] = useState(false);
    const [godsons, setGodsons] = useState([]);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        setIsLoading(true);
        // console.log('request', inputs)
        try {
            // console.log('User', inputs)
            const response = await API.post('request', inputs);
            const iconHtml = renderToString(<FaCheckCircle color="#4CAF50" size={70} style={{ border: "none" }} />);
         //   console.log("response", response);
            if (response.data.products.length !== 0) {
                refetchData();
                toggle();
                Swal.fire({
                    title: "Solicitção feita com sucessso!",
                    iconHtml: iconHtml
                });
                setInputs(inputInitialState);
            }
        } catch (error) {
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

    const handleGodSonChange = (e) => {
        const godson_id = e.target.value;
        const godson = godsons.find(item => item.id == godson_id);
        setInputs({ ...inputs, godson: godson });
    }

    const handleProductChange = (index, quantity) => {
        const newInputs = { ...inputs };
        newInputs.products[index].quantity = quantity;
        setInputs(newInputs);
    }

    const handleTypeChange = (value) => {
        const result = value === "true" ? true : false;
        setInputs({ ...inputs, request_type: result })
    }

    useEffect(() => {
        const loadGodsons = async () => {
            setIsLoading(true);
            try {
                const response = await API.get(`users/${user.id}/godsons`);
           //     console.log('response', response.data)
                if (Array.isArray(response.data)) {
                    setGodsons(response.data);
                }
            } catch (error) {
                if (error.code === 'ERR_NETWORK') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Network Error',
                        text: 'Houve um problema ao conectar ao servidor. Por favor, verifique sua conexão com a internet.'
                    });
                }
            } finally {
                setIsLoading(false);
            }
        }
        loadGodsons();
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" style={{ color: "var(--insignio-primary-text)" }} centered>
            <ModalHeader toggle={toggle} className={'border-bottom text-center pb-3'}>Requisitar Produtos</ModalHeader>
            <ModalBody>
                {godsons.length != 0 &&
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="tipoRequisicao">Tipo de Requisição</Label>
                            <Input type="select" id="tipoRequisicao" value={inputs.request_type} onChange={(e) => handleTypeChange(e.target.value)}>
                                <option value={false}>Pra mim</option>
                                <option value={true}>Recruta</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={8}>
                        <FormGroup>
                            <Label for="godsons">
                                Recruta
                            </Label>
                            <Input
                                id="godsons"
                                name="godsons"
                                type="select"
                                required
                                disabled={!inputs.request_type}
                                value={inputs.godson?.id}
                                onChange={handleGodSonChange}
                            >
                                <option value="">Selecione...</option>
                                {godsons.map((item, index) => <option value={item.id} key={index}>{item.name}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>}
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="sabaoVerde">Sabão Verde</Label>
                            <Input type="number" id="sabaoVerde" value={inputs.products[0].quantity} onChange={(e) => handleProductChange(0, e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="sabaoBranco">Sabão Branco</Label>
                            <Input type="number" id="sabaoBranco" value={inputs.products[1].quantity} onChange={(e) => handleProductChange(1, e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="chaFluxo">Chá de Fluxo</Label>
                            <Input type="number" id="chaFluxo" value={inputs.products[3].quantity} onChange={(e) => handleProductChange(3, e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="chaColicas">Chá de Cólicas</Label>
                            <Input type="number" id="chaColicas" value={inputs.products[4].quantity} onChange={(e) => handleProductChange(4, e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="turbo">Turbo</Label>
                            <Input type="number" id="turbo" value={inputs.products[2].quantity} onChange={(e) => handleProductChange(2, e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="description">Descrição</Label>
                            <Input type="textarea" id="description" value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className="border-0 mb-3">
                <Button type="reset" color="danger" size="md" onClick={toggle} outline>
                    Limpar
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
export default ModalCreate;