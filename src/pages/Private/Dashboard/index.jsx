import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, Row } from 'reactstrap';
import welcome from '../../../assets/img/welcome.png';
import { formatCurrency } from '../../../util';
import { API } from '../../../service/api';
import Swal from "sweetalert2";
import './style.css';
import { getUser } from '../../../service/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        if (!(["user", "admin"].includes(user.role?.toLowerCase()))) {
            navigate('/requests');
        }
    }, []);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await API.get('request/dashbordproduts/prices');
                const response2 = await API.get('request/dashbordproduts/quantity');
                console.log('Response', response.data);
                console.log('Response 2', response2.data);
                const d = [
                    { x: "Sabão", y: response.data.Total_Sabão },
                    { x: "Chá de Cólicas", y: response.data.Total_Chá_de_colicas },
                    { x: "Chá de Fluxo", y: response.data.Total_Chá_de_fluxo },
                    { x: "Turbo", y: response.data.Total_Turbo },
                ];
                const d2 = [
                    { x: 'Sabão Aprovado', y: response2.data.Sabão_Aprovado },
                    { x: 'Sabão Pendente', y: response2.data.Sabão_Aprovado },
                    { x: 'Chá de Fluxo Aprovado', y: response2.data.Chá_de_Fluxo_Aprovado },
                    { x: 'Chá de Fluxo Pendente', y: response2.data.Chá_de_Fluxo_Pendente },
                    { x: 'Chá de Cólicas Aprovado', y: response2.data.Chá_de_Cólicas_Aprovado },
                    { x: 'Chá de Cólicas Pendente', y: response2.data.Chá_de_Cólicas_Pendente },
                    { x: 'Turbo Aprovado', y: response2.data.Turbo_Aprovado },
                    { x: 'Turbo Pendente', y: response2.data.Turbo_Pendente },
                ];
                setTotal(response.data.Todos);
                setPieData(d);
                setBarData(d2);
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
    }, []);

    return (
        <div className="">
            <img src={welcome} height={250} width={'100%'} style={{ objectFit: 'cover' }} alt="WELCOME" className='' />
            <Card className='border shadow-none mt-3'>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <h5 className='fw-bold' style={{ color: "#2D2C2E", marginLeft: 30 }}>Valor Ganho (MZN)</h5>
                            <ReactApexChart
                                options={{
                                    labels: [pieData[0]?.x, pieData[1]?.x, pieData[2]?.x, pieData[3]?.x],
                                    dataLabels: {
                                        enabled: false
                                    },
                                    plotOptions: {
                                        pie: {
                                            colors: ["#15D911", "#11910E", "#ECC704", "#AF9407", "#3873AF"],
                                            allowPointSelect: true,
                                            cursor: "pointer",
                                            showInLegend: true,
                                            dataLabels: {
                                                enabled: false,
                                                distance: -20,
                                            },
                                            animation: {
                                                duration: 1000,
                                            },
                                            enableMouseTracking: true,
                                        },
                                    },
                                    legend: {
                                        formatter: function (seriesName, opts) {
                                            const n = opts.w.globals.series.reduce((sum, currentValue) => sum + currentValue, 0);
                                            const xi = opts.w.globals.series[opts.seriesIndex];
                                            return `<strong>${seriesName} : ${xi}</strong> ${((xi / n) * 100).toFixed(2)}%`;
                                        }
                                    }
                                }}
                                series={[pieData[0]?.y, pieData[1]?.y, pieData[2]?.y, pieData[3]?.y]} type="donut" width="400" />
                        </Col>
                        <Col md={6}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <h5 className='fw-bold my-3' style={{ color: "#2D2C2E", gridColumn: '1 / -1' }}>Estatísticas</h5>
                                <div style={{ color: '#8E8E93', gridColumn: '1 / 2' }}>
                                    <p className='mb-0'>Clientes</p>
                                    <p className='fw-bold' style={{ color: 'rgb(140, 32, 122)' }}>000</p>
                                </div>
                                <div style={{ color: '#8E8E93', gridColumn: '2 / 3' }}>
                                    <p className='mb-0'>Vendas Aprovadas</p>
                                    <p className='fw-bold' style={{ color: 'rgb(140, 32, 122)' }}>000</p>
                                </div>
                                <div style={{ color: '#8E8E93', gridColumn: '1 / 2' }}>
                                    <p className='mb-0'>Vendas Pendentes</p>
                                    <p className='fw-bold' style={{ color: 'rgb(140, 32, 122)' }}>000</p>
                                </div>
                                <div style={{ color: '#8E8E93', gridColumn: '2 / 3' }}>
                                    <p className='mb-0'>Valor Ganho (MZN)</p>
                                    <p className='fw-bold' style={{ color: 'rgb(140, 32, 122)' }}>{formatCurrency(total)}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card className='border shadow-none mt-3'>
                <CardBody>
                    <ReactApexChart
                        options={{
                            chart: {
                                type: 'bar',
                                height: 480,
                                toolbar: {
                                    show: false
                                },
                            },
                            xaxis: {
                                type: 'category',
                                labels: {
                                    style: {
                                        colors: '#000000'
                                    }
                                }
                            },
                            yaxis: {
                                labels: {
                                    style: {
                                        colors: '#000000'
                                    }
                                }
                            },
                            title: {
                                text: 'Product Types',
                            },
                            plotOptions: {
                                bar: {
                                    borderRadius: 12,
                                    borderRadiusApplication: 'end',
                                    columnWidth: 25,
                                }
                            },
                            dataLabels: {
                                enabled: false
                            },
                            colors: '#f294c0',
                            grid: {
                                show: true,
                                borderColor: '#3e5c3d7d',
                                strokeDashArray: 2,
                                position: 'back',
                                xaxis: {
                                    lines: {
                                        show: false
                                    }
                                },
                                yaxis: {
                                    lines: {
                                        show: true
                                    }
                                },
                            },
                        }}
                        series={[{
                            name: "sales",
                            data: barData
                        }]}
                        type="bar"
                        height={300}
                    />
                </CardBody>
            </Card>

        </div>
    );

}

export default Dashboard;
