import React, { Fragment, useEffect, useState } from "react";
import { FaPlus, FaRegEye } from "react-icons/fa";

import {
    Form,
    FormGroup,
    Label,
    InputGroup,
    InputGroupText,
    Button,
    Input,
    Table,
} from "reactstrap";

import { Pagination } from "../../../../../../components/Pagination";
import { IsLoading } from "../../../../../../components/IsLoading";
import selectIcon from "../../../../../../assets/img/select.svg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ModalRemove from "./Remove";
import Swal from "sweetalert2";
import { SYSTEM_ROUTES } from "../../../../../../navigation";
import { formatCurrency, getFormatedDate } from "../../../../../../util";
import { API } from "../../../../../../service/api";
import { getUser } from "../../../../../../service/auth";

const Requests = ({ setRequests }) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("")
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [request, setRequest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [modalRemove, setModalRemove] = useState(false);
    const toggleRemove = () => setModalRemove(!modalRemove);
    const [localRefresh, setLocalRefresh] = useState(false);
    const localRefetchData = () => setLocalRefresh(!localRefresh);
    const user = getUser();
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
        setRequest(row);
        toggleRemove();
    };

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await API.get(`request/AllUserRequest/${user.id}`);
           //     console.log('response', response.data)
                if (Array.isArray(response.data)) {
                    setData(response.data);
                    setRequests(response.data.length)
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
                }
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [currentPage, itemsPerPage, refresh, localRefresh]);

    return (
        <Fragment>
            <Form className="d-flex align-items-center gap-2">
                <FormGroup>
                    <Label for="supplier">Search</Label>
                    <InputGroup>
                        <InputGroupText><MdOutlineSearch /></InputGroupText>
                        <Input className="border-start-0 ps-0" value={name} onChange={(e) => setName(e.target.value)} />
                    </InputGroup>
                </FormGroup>

                <FormGroup className="d-flex flex-column">
                    <Label className="text-white"></Label>
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
                        <th className="py-3">Código</th>
                        <th className="py-3">Data</th>
                        <th className="py-3">Status</th>
                        <th className="py-3">Valor Total</th>
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
                                    <td colSpan={7} className="text-center text-dark py-3">Requisições não encontradas</td>
                                </tr>
                            </tbody>
                            :
                            <>
                                <tbody>
                                    {data.map((item, index) => {
                                        const totalPrice = item.products?.reduce((sum, product) => sum + product.totalPrice, 0);
                                        return (
                                            <tr key={index} className="border-start-0 border-end-0" style={{ border: "2px solid #D9D9D9", color: "var(--insignio-primary-text)" }}>
                                                <td>{`Req-${item.id}`}</td>
                                                <td>{getFormatedDate(item.createOn)}</td>
                                                <td className="text-capitalize">{item.status}</td>
                                                <td>{formatCurrency(totalPrice)}MT</td>
                                                <td className="d-flex justify-content-end gap-3 border-0">
                                                    <Link
                                                        to={SYSTEM_ROUTES.REQUESTS.show + item.id}
                                                        className="btn btn-sm p-1"
                                                        style={{ border: "2px solid #E3E0E9" }}
                                                    >
                                                        <FaRegEye size={"18px"} color="var(--insignio-primary)" />
                                                    </Link>
                                                    <Button
                                                        className="btn btn-sm p-1 bg-transparent shadow-none"
                                                        style={{ border: "2px solid #E3E0E9" }}
                                                        onClick={() => handlePreDelete(item)}
                                                    >
                                                        <BiEdit size={"18px"} color="var(--insignio-primary)" />
                                                    </Button>
                                                    <Button
                                                        className="btn btn-sm p-1 bg-transparent shadow-none"
                                                        style={{ border: "2px solid #E3E0E9" }}
                                                        onClick={() => handlePreDelete(item)}
                                                    >
                                                        <RiDeleteBin2Line size={"18px"} color="#8A919C" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot style={{ borderBottomColor: '#F22E8A' }}>
                                    <tr>
                                        <td colSpan={7} className="px-0 pt-3 pb-0">
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
            {request && <ModalRemove request={request} modal={modalRemove} toggle={toggleRemove} localRefetchData={localRefetchData} key={'ModalRemove'} />}
        </Fragment>
    );
}

export default Requests;