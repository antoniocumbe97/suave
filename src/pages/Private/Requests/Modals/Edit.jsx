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
import { API } from "../../../../service/api";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";


const ModalEditOrganization = ({ modal, toggle, refetchData, data }) => {
    
    const initialState = {
        lastModified: data.lastModified,
        status: data.status,
        name: data.name,
        represent_name: data.represent_name,
        nuit: data.nuit,
        doc_received: data.doc_received,
        industry: data.industry,
        contact: data.contact,
        email: data.email,
        address: data.address,
        bank_name: data.bank_name,
        account: data.account,
        branch_code: data.branch_code,
        nid: data.nid,
    }

    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState(initialState);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // console.log('client',client)
            await API.post('/clients', client);
            const iconHtml = renderToString(<FaCheckCircle color="#4CAF50" size={70} style={{ border: "none" }} />);
            refetchData();
            toggle();
            Swal.fire({
                title: "Client Updated",
                iconHtml: iconHtml
            });
            setClient(initialState);
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'Houve um problema ao conectar ao servidor. Por favor, verifique sua conexão com a internet.'
                });
            }else if (error.response && error.response.status === 403) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "warning",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" style={{ color: "var(--insignio-primary-text)" }}>
            <ModalHeader toggle={toggle} className={'border-bottom text-center pb-3'}>Editar Cliente: Organization</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="lastModified">
                                Last Modified
                            </Label>
                            <Input
                                id="lastModified"
                                name="lastModified"
                                type="date"
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="status">
                                Status
                            </Label>
                            <Input
                                id="status"
                                name="status"
                                type="select"
                                required
                                value={client.status}
                                onChange={(e) => setClient({...client, status: e.target.value})}
                            >
                                <option value=""></option>
                                <option value="Normal">Normal</option>
                                <option value="Potential Fraud Detected">Potential Fraud Detected</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <h6 className="text-center py-2" style={{ backgroundColor: "#F8F9FB" }}>General Details</h6>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder=""
                                required
                                value={client.name}
                                onChange={(e) => setClient({...client, name: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="representative_name">
                                Representative Name
                            </Label>
                            <Input
                                id="representative_name"
                                name="representative_name"
                                type="text"
                                placeholder=""
                                required
                                value={client.representative_name}
                                onChange={(e) => setClient({...client, representative_name: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nuit">
                                NUIT
                            </Label>
                            <Input
                                id="nuit"
                                name="nuit"
                                placeholder=""
                                type="text"
                                required
                                value={client.nuit}
                                onChange={(e) => setClient({...client, nuit: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="documents_received">
                                Documents Received
                            </Label>
                            <Input
                                id="documents_received"
                                name="documents_received"
                                type="select"
                                required
                                value={client.documents_received}
                                onChange={(e) => setClient({...client, documents_received: e.target.value})}
                            >
                                <option value=""></option>
                                <option value="Commercial Certificate">Commercial Certificate</option>
                                <option value="Alvaro">Alvaro</option>
                                <option value="NUIT">NUIT</option>
                                <option value="Representative ID">Representative ID</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="industry">
                                Industry
                            </Label>
                            <Input
                                id="industry"
                                name="industry"
                                placeholder=""
                                type="text"
                                required
                                value={client.industry}
                                onChange={(e) => setClient({...client, industry: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <h6 className="text-center py-2" style={{ backgroundColor: "#F8F9FB" }}>Contact Details</h6>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="contact">
                                Contact No.
                            </Label>
                            <Input
                                id="contact"
                                name="contact"
                                placeholder=""
                                type="text"
                                required
                                value={client.contact}
                                onChange={(e) => setClient({...client, contact: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder=""
                                type="email"
                                required
                                value={client.email}
                                onChange={(e) => setClient({...client, email: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="address">
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder=""
                                type="text"
                                value={client.address}
                                onChange={(e) => setClient({...client, address: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <h6 className="text-center py-2" style={{ backgroundColor: "#F8F9FB" }}>Banking Details</h6>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="bankName">
                                Bank Name
                            </Label>
                            <Input
                                id="bankName"
                                name="bankName"
                                type="text"
                                required
                                value={client.bankName}
                                onChange={(e) => setClient({...client, bankName: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="bankAccount">
                                Account No.
                            </Label>
                            <Input
                                id="bankAccount"
                                name="bankAccount"
                                type="text"
                                required
                                value={client.bankAccount}
                                onChange={(e) => setClient({...client, bankAccount: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="bankBranchCode">
                                Branch Code
                            </Label>
                            <Input
                                id="bankBranchCode"
                                name="bankBranchCode"
                                type="text"
                                required
                                value={client.bankBranchCode}
                                onChange={(e) => setClient({...client, bankBranchCode: e.target.value})}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="bankNID">
                                NID
                            </Label>
                            <Input
                                id="bankNID"
                                name="bankNID"
                                type="text"
                                required
                                value={client.bankNID}
                                onChange={(e) => setClient({...client, bankNID: e.target.value})}
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
export default ModalEditOrganization;