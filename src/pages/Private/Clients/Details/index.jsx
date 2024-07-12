import React, { Fragment, useEffect, useState } from "react";
import { NavTabsDetails } from "../../../../components/NabTabs";
import { IsLoading } from "../../../../components/IsLoading";
import { API } from "../../../../service/api";
import { useParams } from "react-router-dom";
import { CardHeader } from "reactstrap";
import Swal from "sweetalert2";
import Requests from "./Tabs/Requests";
import Godsons from "./Tabs/Godsans";

const ClientDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [recruits, setRecruits] = useState(0);
    const [requests, setRequests] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const refetchData = () => setRefresh(!refresh);
    const [isLoading, setIsLoading] = useState(false);

    const [tab, setTab] = useState(0);
    const tabs = [
        { id: "requests", title: "Requisições", content: <Requests setRequests={setRequests} /> },
        { id: "recruits", title: "Recrutas", content: <Godsons setRecruits={setRecruits} /> },
    ];

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await API.get(`/users/${id}`);
                // console.log('User', response.data)
                const responseData = response.data;
                setClient({
                    id: responseData.id,
                    name: responseData.name,
                    gender: responseData.gender,
                    bi: responseData.bi,
                    nuit: responseData.nuit,
                    birthDate: responseData.birthDate,
                    contact: responseData.contact,
                });
                setRecruits(responseData.recruits.length);
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
                <h4 className="mb-0 text-dark fw-semibold">Client Name</h4>
            </div>
            <div className="border rounded-0 rounded-top mt-4">
                <CardHeader className="bg-white">
                    <div className="py-2">
                        <h6 className="">{client?.name}</h6>
                        <div className="d-flex gap-5">
                            <span>
                                Contacto: {client?.contact}
                            </span>
                            <span>
                                Sexo: {client?.gender}
                            </span>
                            <span>
                                Requisições: {requests}
                            </span>
                            <span>
                                Recrutas: {recruits}
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </div>
            <NavTabsDetails tabs={tabs} tab={tab} setTab={setTab} />
        </Fragment>
    );
}

export default ClientDetails;