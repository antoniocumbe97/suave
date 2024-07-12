import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Spinner } from "reactstrap";
import { renderToString } from "react-dom/server";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { API } from "../../../../service/api";

const ModalRemove = ({ modal, toggle, user, localRefetchData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleRemove = async () => {
        if (user) {
            setIsLoading(true);
            try {
                await API.delete(`/users/${user.id}`);
                const iconHtml = renderToString(<FaCheckCircle color="#4CAF50" size={70} style={{ border: "none" }} />);
                localRefetchData();
                toggle();
                Swal.fire({
                    title: "Deletar Usuário",
                    iconHtml: iconHtml
                });
            }  catch (error) {
            
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
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} style={{ color: "var(--insignio-primary-text)" }}>
            <div className="">
                <div className="text-end">
                    <Button
                        onClick={toggle}
                        color="transparent"
                        style={{ marginBottom: -10 }}
                        className="text-dark shadow-none border-0 mt-3"
                    >
                        <MdClose size={21} />
                    </Button>
                </div>
                <div className="text-center">
                    <div className="d-flex justify-content-center align-items-center mx-auto rounded-circle" style={{ backgroundColor: "#F8DDDD", width: 50, height: 50 }}>
                        <RiDeleteBin2Line size={25} color="#C10F0C" />
                    </div>
                    <span className="d-block mt-2 mb-0 fw-bold" style={{ fontSize: 16 }}>Deletar Usuário</span>
                </div>
            </div>
            <ModalBody className="text-center">
                <p className="mb-1">Tem certeza de que deseja excluir:</p>
                <p className=" mb-4 fw-bold">Usuário: {user.name}</p>
                <p className="mb-0">Esta ação não pode ser desfeita, todos os dados serão removidos.</p>
            </ModalBody>
            <ModalFooter className="border-0 mb-3">
                <Button color="dark" size="md" onClick={toggle} outline>
                    Cancelar
                </Button>
                {isLoading ?
                    <Button color="danger" size="md" onClick={handleRemove}>
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
                    <Button color="danger" size="md" onClick={handleRemove}>
                        Deletar
                    </Button>
                }{' '}
            </ModalFooter>
        </Modal>
    );
}
export default ModalRemove;