import React, { Fragment, useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Table,
    InputGroup,
    InputGroupText,
} from "reactstrap";
import { Pagination } from "../../../components/Pagination";
import { IsLoading } from "../../../components/IsLoading";
import { API } from "../../../service/api";
import { MdOutlineSearch } from "react-icons/md";
import ModalRemove from "./Modals/Remove";
import Swal from "sweetalert2";
import ModalEditUser from "./Modals/Edit";
import ModalCreateUser from "./Modals/Create";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../service/auth";

const Users = () => {
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [refresh, setRefresh] = useState(false);
    const refetchData = () => setRefresh(!refresh);
    const navigate = useNavigate();
    const user = getUser();

    const handleItemsPerPageChange = (e) => {
        const selectedItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(selectedItemsPerPage);
        setCurrentPage(0);
    };

    const handleSearch = () => {
        load({ name });
    }

    const load = async ({ name }) => {
        setIsLoading(true);
        try {
            const response = await API.get('/users', {
                params: {
                    paginate: true,
                    page: Number(currentPage) + 1,
                    per_page: itemsPerPage,
                    name: name,
                },
            });
            console.log("Response Users", response.data);
            setData(response.data)
            // if (Array.isArray(response.data.data)) {
            //     setData(response.data.data);
            //     setTotal(response.data.total);
            //     setFrom(response.data.from);
            //     setTo(response.data.to);
            // }
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                Swal.fire({
                    icon: 'error',
                    title: 'Network Error',
                    text: 'There was a problem connecting to the server. Please check your internet connection.'
                });
            } else if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("We are having connection problems!");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!(["user", "admin"].includes(user.role?.toLowerCase()))) {
            navigate('/requests');
        }
    }, []);

    useEffect(() => {
        load({});
    }, [currentPage, itemsPerPage, refresh]);

    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                <h4 className="mb-0 text-dark fw-semibold">Usuários</h4>
                <Button className="btn btn-primary py-2 px-3 d-flex align-items-center gap-2" onClick={() => toggle()}>
                    <FaPlus />
                    <span>Novo Usuário</span>
                </Button>
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
                        onClick={handleSearch}
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
                        <th className="py-3 text-end"></th>
                    </tr>
                </thead>
                {isLoading ?
                    <tbody>
                        <tr>
                            <td colSpan={4} className="px-0 pt-3 pb-0">
                                <IsLoading />
                            </td>
                        </tr>
                    </tbody>
                    :
                    <>
                        {data.length === 0 ?
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-center text-danger py-3">Users not found</td>
                                </tr>
                            </tbody>
                            :
                            <>
                                <tbody>
                                    {data.map((item, index) => {
                                        return (
                                            <tr key={index} className="border-start-0 border-end-0" style={{ borderColor: '#F22E8A' }}>
                                                <td className="text-dark">{item.name}</td>
                                                <td className="text-dark">{item.contact}</td>
                                                <td className="text-dark">{item.gender}</td>
                                                <td>
                                                    <div className="d-flex justify-content-end gap-3">
                                                        <ModalEditUser data={item} refetchData={refetchData} key={'ModalEdit'} />
                                                        <ModalRemove data={item} refetchData={refetchData} key={'ModalRemove'} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot style={{ borderBottomColor: '#F22E8A' }}>
                                    <tr>
                                        <td colSpan={4} className="px-0 py-3">
                                            <div className='border-0 d-flex justify-content-between align-items-center'>
                                                <div className="pagination-info">
                                                    <label className='text-normal' style={{ color: "#000000" }}>Showing {from} - {to} of {total} Results</label>
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
                    </>
                }
            </Table>
            <ModalCreateUser modal={modal} toggle={toggle} refetchData={refetchData} key={'ModalCreate'} />
        </Fragment>
    );
}

export default Users;