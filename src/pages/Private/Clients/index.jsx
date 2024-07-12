import React, { Fragment, useEffect, useState } from "react";
import { FaChevronDown, FaPlus, FaRegEye } from "react-icons/fa";

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    ButtonGroup,
    Form,
    FormGroup,
    Label,
    InputGroup,
    InputGroupText,
    Button,
    Input,
    Table,
} from "reactstrap";

import { Pagination } from "../../../components/Pagination";
import { IsLoading } from "../../../components/IsLoading";
import selectIcon from "../../../assets/img/select.svg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ModalRemove from "./Remove";
import Swal from "sweetalert2";
import { SYSTEM_ROUTES } from "../../../navigation";
import { getFormatedDate } from "../../../util";
import { API } from "../../../service/api";
import ModalCreate from "./Modals/Create";

const Clients = () => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("")
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [client, setClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [modalRemove, setModalRemove] = useState(false);
    const toggleRemove = () => setModalRemove(!modalRemove);
    const [localRefresh, setLocalRefresh] = useState(false);
    const localRefetchData = () => setLocalRefresh(!localRefresh);

    const [type, setType] = useState("");
    const [refresh, setRefresh] = useState(false);
    const refetchData = () => setRefresh(!refresh);
    const [modalCreate, setModalCreate] = useState(false);
    const toggleCreate = () => setModalCreate(!modalCreate);

    const search = () => {
        localRefetchData();
    };

    const handleItemsPerPageChange = (e) => {
        const selectedItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(selectedItemsPerPage);
        setCurrentPage(0);
    };

    const handlePreDelete = (row) => {
        setClient(row);
        toggleRemove();
    };

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await API.get('/users');
                // console.log('Response', response.data)
                if (Array.isArray(response.data)) {
                    setData(response.data);
                    // setTotal(response.data.total);
                    // setFrom(response.data.from);
                    // setTo(response.data.to);
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
                }
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [currentPage, itemsPerPage, refresh, localRefresh]);

    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                <h4 className="mb-0 text-dark fw-semibold">Clientes</h4>
                <Button className="btn-primary py-2 px-3 d-flex align-items-center gap-2" onClick={() => toggleCreate()}><FaPlus /> <span>Novo Cliente</span></Button>
            </div>
            <hr style={{ backgroundColor: '#1D401C' }} />
            <Form className="d-flex align-items-center gap-2">
                <FormGroup>
                    <Label for="supplier">Pesquisar</Label>
                    <InputGroup>
                        <InputGroupText><MdOutlineSearch /></InputGroupText>
                        <Input className="border-start-0 ps-0" value={name} onChange={(e) => setName(e.target.value)} />
                    </InputGroup>
                </FormGroup>

                <FormGroup className="d-flex flex-column">
                    <Label className="text-white">.</Label>
                    <Button
                        color="primary"
                        outline
                        className="fw-semibold"
                        type='button'
                        style={{ border: "2px solid var(--insignio-secondary)" }}
                        onClick={search}
                    >
                        Pesquisar

                    </Button>
                </FormGroup>
            </Form>
            <div className="d-flex align-items-center justify-content-between mb-3" style={{ color: '#000000' }}>
                <span>{`${total} Total Results`}</span>
                <div className='d-flex align-items-center gap-2'>
                    <label htmlFor="itemsPerPage" className='text-nowrap'>Per page</label>
                    <Input
                        type="select"
                        bsSize="sm"
                        id="itemsPerPage"
                        style={{ width: "50px" }}
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </Input>
                </div>
            </div>
            <Table responsive hover className='mb-0'>
                <thead style={{ border: "2px solid #F294C0", backgroundColor: "#F294C0" }}>
                    <tr style={{ color: "var(--insignio-secondary-text)" }}>
                        <th className="py-3">Nome</th>
                        <th className="py-3">Contacto</th>
                        <th className="py-3">Sexo</th>
                        <th className="py-3">Recrutas</th>
                        <th className="py-3">Requisições</th>
                        <th className="py-3 text-end"></th>
                    </tr>
                </thead>
                {isLoading ?
                    <tbody>
                        <tr>
                            <td colSpan={7} className="px-0 pt-3 pb-0">
                                <IsLoading />
                            </td>
                        </tr>
                    </tbody>
                    :
                    <>
                        {data.length === 0 ?
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="text-center text-dark py-3">Clientes não encontrados</td>
                                </tr>
                            </tbody>
                            :
                            <>
                                <tbody>
                                    {data.map((item, index) => {
                                        return (
                                            <tr key={index} className="border-start-0 border-end-0" style={{ border: "2px solid #D9D9D9", color: "var(--insignio-primary-text)" }}>
                                                <td className="text-capitalize">{item.name}</td>
                                                <td>{item.contact}</td>
                                                <td className="text-capitalize">{item.gender}</td>
                                                <td>{item.recruits.length}</td>
                                                <td>{item.requests?.length}</td>
                                                <td className="d-flex justify-content-end gap-3 border-0">
                                                    <Link to={SYSTEM_ROUTES.CLIENTS.show + item.id}>
                                                        <Button
                                                            type="button"
                                                            className="btn btn-sm p-1 shadow-none"
                                                            style={{ border: "2px solid #8D1576", backgroundColor: "#8D1576" }}
                                                        >
                                                            <FaRegEye size={"18px"} color="#FFFFFF" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        className="btn btn-sm p-1 shadow-none"
                                                        style={{ border: "2px solid #1D401C", backgroundColor: "#1D401C" }}
                                                        onClick={() => handlePreDelete(item)}
                                                    >
                                                        <BiEdit size={"18px"} color="#FFFFFF" />
                                                    </Button>
                                                    <Button
                                                        className="btn btn-sm p-1 shadow-none"
                                                        style={{ border: "2px solid #d1005d", backgroundColor: "#d1005d" }}
                                                        onClick={() => handlePreDelete(item)}
                                                    >
                                                        <RiDeleteBin2Line size={"18px"} color="#FFFFFF" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot style={{ borderBottomColor: '#F22E8A' }}>
                                    <tr>
                                        <td colSpan={7} className="px-0 py-3">
                                            <div className='border-0 d-flex justify-content-between align-items-center'>
                                                <div className="pagination-info">
                                                    <label className='text-normal' style={{ color: "var(--insignio-primary-text)" }}>Showing {from} - {to} of {total} Results</label>
                                                </div>
                                                <Pagination
                                                    extraClass={`justify-content-center`}
                                                    totalRows={total}
                                                    setCurrentPage={setCurrentPage}
                                                    currentPage={currentPage}
                                                    perPage={10}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </>}
                    </>}
            </Table>
            {client && <ModalRemove client={client} modal={modalRemove} toggle={toggleRemove} localRefetchData={localRefetchData} key={'ModalRemove'} />}
            <ModalCreate modal={modalCreate} toggle={toggleCreate} refetchData={refetchData} key={'ModalCreate'} />
        </Fragment>
    );
}

export default Clients;
