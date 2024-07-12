import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IsLoading } from "../../../../components/IsLoading";
import MPESA from "../../../../assets/img/mpesa.png";
import EMOLA from "../../../../assets/img/emola.png";
import { API } from "../../../../service/api";
import BIM from "../../../../assets/img/bim.png";
import { Button, CardHeader, Table } from "reactstrap";
import Swal from "sweetalert2";
import { formatCurrency, getFormatedDate } from "../../../../util";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const RquestDetails = () => {
    const { id } = useParams();
    const [request, setRquest] = useState(null);
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const refetchData = () => setRefresh(!refresh);
    const [isLoading, setIsLoading] = useState(false);
    const totalPrice = products?.reduce((sum, product) => sum + product.totalPrice, 0);
    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await API.get(`/request/${id}`);
           //     console.log('Request', response.data);
                setRquest(response.data);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error', error)
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
    }, [refresh]);

    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                <h4 className="mb-0 text-dark fw-semibold">{`Req-${request?.id}`}</h4>
                <div className='d-flex gap-2'>
                    <Button size={'sm'} color={'primary'} className={'px-3'}>
                        <FaCheck size={10} />
                    </Button>
                    <Button size={'sm'} color={'danger'} className={'px-3'} outline>
                        <MdClose size={16} />
                    </Button>
                </div>
            </div>
            <hr className='mb-0' />
            {isLoading ?
                <IsLoading />
                :
                <>
                    {request === null ? <p className="text-center text-danger py-3">Requisição não encontrada</p>
                        :
                        <>
                            <div className="border rounded-0 rounded-top mt-4">
                                <CardHeader className="bg-white">
                                    <h6 className="">{request.requester.name}</h6>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>
                                            Data: {getFormatedDate(request.createOn)}
                                        </span>
                                        <span>
                                            Status: {request.status}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>
                                            Valor Total: {formatCurrency(totalPrice)}MT
                                        </span>
                                        <span>
                                            Contacto: {request.requester.contact}
                                        </span>
                                    </div>
                                    <p className="mb-0">
                                        Descrição: {request.description}
                                    </p>
                                </CardHeader>
                            </div>
                            <div className="my-4">
                                <Table responsive hover className='mb-0'>
                                    <thead style={{ border: "2px solid #F294C0", backgroundColor: "#F294C0" }}>
                                        <tr style={{ color: "var(--insignio-secondary-text)" }}>
                                            <th className="py-3">Produto</th>
                                            <th className="py-3">Quantidade</th>
                                            <th className="py-3">Preço</th>
                                            <th className="py-3">Total</th>
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
                                            {products.length === 0 ?
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={7} className="text-center text-danger py-3">Produtos não ecnontrados!</td>
                                                    </tr>
                                                </tbody>
                                                :
                                                <>
                                                    <tbody>
                                                        {products.map((item, index) => {
                                                            const totalPrice = item.products?.reduce((sum, product) => sum + product.totalPrice, 0);
                                                            return (
                                                                <tr key={index} className="border-start-0 border-end-0" style={{ border: "2px solid #D9D9D9", color: "var(--insignio-primary-text)" }}>
                                                                    <td className='text-nowrap'>{item.name}</td>
                                                                    <td className='text-nowrap'>{item.quantity}</td>
                                                                    <td className='text-nowrap'>{formatCurrency(item.unitPrice)}MT</td>
                                                                    <td className='text-nowrap'>{formatCurrency(item.totalPrice)}MT</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </>
                                            }
                                        </>}
                                </Table>
                                <p className='my-4 fw-semibold text-center text-dark pt-4'>Para finalizar a sua requisição, faça o pagamento por meio de um dos seguintes canais</p>
                                <div className='d-flex justify-content-between gap-2 py-2'>
                                    <div className='text-center d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <img src={BIM} a className='img-fluid rounded' alt="BIM" width={"50%"} style={{maxWidth: 200}} />
                                        <span className="fw-semibold text-dark">3104170</span>
                                    </div>
                                    <div className='text-center d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <img src={MPESA} className='img-fluid rounded' alt="M-Pesa" width={"50%"} style={{maxWidth: 200}} />
                                        <span className="fw-semibold text-dark">843104170</span>
                                    </div>
                                    <div className='text-center d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <img src={EMOLA} className='img-fluid rounded' alt="E-Mola" width={"50%"} style={{maxWidth: 200}} />
                                        <span className="fw-semibold text-dark">873104170</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </Fragment>
    );
}

export default RquestDetails;