import React, { Fragment, useState } from "react";
import ModalEditOrganization from "../../Modals/Edit";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Label,
    Row
} from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { getFormatedDate } from "../../../../../util";

const TabDetails = ({ data, refetchData }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Card className="shadow-none border mt-2">
                <CardHeader className="bg-white border-bottom py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Detailes</h6>
                        <Button color="primary" size="md" onClick={toggle} outline><BiEdit size={"18px"} color="var(--insignio-primary)" /> Editar</Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="mt-3">
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Last Modified</Label>
                            <p className="titleLable">{getFormatedDate(data.lastModified)}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Status</Label>
                            <p className="titleLable">{data.status}</p>
                        </Col>
                    </Row>
                    <h5 className="py-2 px-3" style={{ backgroundColor: "#F8F9FB", color: "var(--insignio-secondary-text)" }}>
                        General Details
                    </h5>
                    <Row>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Full Name</Label>
                            <p className="titleLable text-capitalize">{data.name}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Date Of Birth</Label>
                            <p className="titleLable">{'data.client.address'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">ID</Label>
                            <p className="titleLable">{'data.client.establishment'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Gender</Label>
                            <p className="titleLable">{'data.client.alvara'}</p>
                        </Col>
                    </Row>
                    <h5 className="py-2 px-3" style={{ backgroundColor: "#F8F9FB", color: "var(--insignio-secondary-text)" }}>
                        Contact Details
                    </h5>
                    <Row>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Contact No.</Label>
                            <p className="titleLable">{'data.client.gestao'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Email</Label>
                            <p className="titleLable">{'data.client.actas'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Address</Label>
                            <p className="titleLable">{'data.client.contact'}</p>
                        </Col>
                    </Row>
                    <h5 className="py-2 px-3" style={{ backgroundColor: "#F8F9FB", color: "var(--insignio-secondary-text)" }}>
                        Banking Details
                    </h5>
                    <Row>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Bank Name</Label>
                            <p className="titleLable">{'data.client.email'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Account No.</Label>
                            <p className="titleLable">{'data.client.email'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">Branch Code</Label>
                            <p className="titleLable">{'data.client.email'}</p>
                        </Col>
                        <Col className="mb-2" md={3}>
                            <Label className="text-muted">NID</Label>
                            <p className="titleLable">{'data.client.email'}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            {<ModalEditOrganization modal={modal} toggle={toggle} refetchData={refetchData} data={data} />}
        </Fragment >
    );
}

export default TabDetails;