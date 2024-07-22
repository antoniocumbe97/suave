import React, { Fragment, useEffect, useState } from "react";
import { NavTabsDetails } from "../../../../components/NabTabs";
import { API } from "../../../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { CardHeader } from "reactstrap";
import Swal from "sweetalert2";
import Requests from "./Tabs/Requests";
import { getUser } from "../../../../service/auth";

const GodsonDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [recruits, setRecruits] = useState([]);
    const [requests, setRequests] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const refetchData = () => setRefresh(!refresh);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const user = getUser();

    const [tab, setTab] = useState(0);
    const tabs = [
        { id: "requests", title: "Requisições", content: <Requests /> },
    ];

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await API.get(`/users/${id}`);
           //     console.log('Godson', response.data);
                const responseData = response.data;
                setClient({
                    id: responseData.id,
                    name: responseData.name,
                    gender: responseData.gender,
                    bi: responseData.bi,
                    nuit: responseData.nuit,
                    bithDate: responseData.bithDate,
                    contact: responseData.contact,
                    godfather: responseData.godfather?.name,
                });
                setRecruits(responseData.requests);
                setRequests(responseData.recruits);
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

    useEffect(() => {
        if (!(["user", "admin", "cliente"].includes(user.role?.toLowerCase()))) {
            navigate('/requests');
        }
    }, []);

    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
                <h4 className="mb-0 text-dark fw-semibold">{client?.name}</h4>
            </div>
            <div className="border rounded-0 rounded-top mt-4">
                <CardHeader className="bg-white">
                    <div className="py-2">
                        <h6 className=""></h6>
                        <div className="d-flex gap-5">
                            <span>
                                Sexo: {client?.gender}
                            </span>
                            <span>
                                Contacto: {client?.contact}
                            </span>
                            <span>
                                Requisições: {requests.length}
                            </span>
                            <span>
                                Padrinho: {client?.godfather}
                            </span>
                            <span>
                                BI: {client?.bi}
                            </span>
                            <span>
                                Data de Nascimento: {client?.bithDate}
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </div>
            <NavTabsDetails tabs={tabs} tab={tab} setTab={setTab} />
        </Fragment>
    );
}

export default GodsonDetails;