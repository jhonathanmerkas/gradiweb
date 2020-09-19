import React, {useState, useEffect, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    Container,
    Row,
    Col,
    Button 
} from 'reactstrap';

import banner from '../assets/img/banner.jpg'
import paris from '../assets/img/paris.jpg'
import barranquilla from '../assets/img/barranquilla.jpg'
import medellin from '../assets/img/medellin.jpg'
import avatar1 from '../assets/img/avatar1.jpg'
import avatar2 from '../assets/img/avatar2.jpg'
import avatar3 from '../assets/img/avatar3.jpg'

function Home (){
    const [loading, setLoading] = useState(true)
    const [apikey, setApikey] = useState('d56394cdd131bdc1cb95a8b302c4f7a2')
    const [bogotaHoy, setBogotaHoy] = useState()
    const [bogotaManana, setBogotaManana] = useState()
    const [bogotaPasado, setBogotaPasado] = useState()
    const [parisHoy, setParisHoy] = useState()
    const [bogotaTrasPasado, setBogotaTrasPasado] = useState()
    const [kelvin, setKelvin] = useState(273.15)
    const [fecham, setFecham] = useState()
    const [fechap, setFechap] = useState()
    const [fechapm, setFechapm] = useState()
    const dias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    useEffect(()=>{
        setLoading(true)
        dataBogota()
        dataParis()
    },[])

    const dataBogota = async () =>{
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            const data = JSON.parse(xhr.response)
            const fecham = new Date();
            const fechap = new Date();
            const fechapm = new Date();
            const fm = fecham.getDate() + 1
            const fp = fechap.getDate() + 2
            const fpm = fechapm.getDate() + 3
            fecham.setDate(fecham.getDate() + 1)
            fechap.setDate(fechap.getDate() + 2)
            fechapm.setDate(fechapm.getDate() + 3)
            setFecham(fecham.getDay())
            setFechap(fechap.getDay())
            setFechapm(fechapm.getDay())

            data.daily.forEach(element => {
                const f = new Date(element.dt * 1000);
                if(fm === f.getDate()){
                    setBogotaManana(element)
                } else if(fp === f.getDate()){
                    setBogotaPasado(element)
                } else if(fpm === f.getDate()){
                    setBogotaTrasPasado(element)
                }
            });
            setBogotaHoy(JSON.parse(xhr.response).current)
        })
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=4.6482837&lon=-74.2478956&exclude=minutely,hourly&appid=${apikey}`)
        xhr.send()
    }

    const dataParis = () =>{
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            console.log('paris')
            const data = JSON.parse(xhr.response)
            setParisHoy(JSON.parse(xhr.response))
            setLoading(false)
        })
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?id=5603240&appid=${apikey}`)
        xhr.send()
    }

    console.log(parisHoy)
    

    return(
        <Container>
            { loading ?
                <div className="preloader"></div>
                :
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="caja shadow-lg">
                            <div className="banner">
                                <div className="contaner-clima-banner ">
                                    <div className="clima-banner shadow">
                                        <div className="clima-banner-icono">
                                            {(() => {
                                                switch (bogotaHoy ? bogotaHoy.weather[0].main : null) {
                                                    case "Thunderstorm":   return (
                                                        <>
                                                            <FontAwesomeIcon icon="cloud-showers-heavy" />
                                                            <p>{bogotaHoy ? bogotaHoy.weather[0].main : 'sin definir'}</p>
                                                        </>
                                                    );
                                                    case "Drizzle": return(
                                                        <>
                                                            <FontAwesomeIcon icon="cloud-rain" />
                                                            <p>{bogotaHoy ? bogotaHoy.weather[0].main : 'sin definir'}</p>
                                                        </>
                                                    ); 
                                                    case "Rain":  return(
                                                        <>
                                                            <FontAwesomeIcon icon="cloud-sun-rain" />
                                                            <p>{bogotaHoy ? bogotaHoy.weather[0].main : 'sin definir'}</p>
                                                        </>
                                                    );  
                                                    case "Clear":  return(
                                                        <>
                                                            <FontAwesomeIcon icon="sun" />
                                                            <p>{bogotaHoy ? bogotaHoy.weather[0].main : 'sin definir'}</p>
                                                        </>
                                                    );  
                                                    case "Clouds":  return(
                                                        <>
                                                            <FontAwesomeIcon icon="cloud" />
                                                            <p>{bogotaHoy ? bogotaHoy.weather[0].main : 'sin definir'}</p>
                                                        </>
                                                    );  
                                                    default: return(
                                                        <>
                                                            <FontAwesomeIcon icon="cloud-sun-rain" />
                                                            <p>{bogotaHoy ? bogotaHoy.weather[0].main : 'sin definir'}</p>
                                                        </>
                                                    );  
                                                }
                                            })()}
                                        </div>
                                        <div className="clima-banner-info">
                                            <h3>{`${parseInt(bogotaHoy ? bogotaHoy.temp - kelvin : 0)}˚`}</h3>
                                        </div>
                                    </div>
                                    <div className="clima-banner-ciudad">
                                        <FontAwesomeIcon icon="map-marker-alt"/>
                                        <h3>Bogotá</h3>
                                    </div>
                                </div>
                                <img src={banner} />
                            </div>
                            <div className="caja-body">
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={8}>
                                        <Row>
                                            <Col xs={12} sm={12} md={4} lg={4}>
                                                <h2 className="titulo-seccion"><b>3 Days</b> Forecast</h2>
                                                <div className="caja-pq shadow-sm">
                                                    <div className="caja-pq-icon">
                                                        {(() => {
                                                            switch (bogotaManana ? bogotaManana.weather[0].main : null) {
                                                                case "Thunderstorm":   return (
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-showers-heavy" />
                                                                    </>
                                                                );
                                                                case "Drizzle": return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-rain" />
                                                                    </>
                                                                ); 
                                                                case "Rain":  return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                                    </>
                                                                );  
                                                                case "Clear":  return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="sun" />
                                                                    </>
                                                                );  
                                                                case "Clouds":  return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud" />
                                                                    </>
                                                                );  
                                                                default: return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                                    </>
                                                                );  
                                                            }
                                                        })()}
                                                    </div>
                                                    <div className="caja-pq-info">
                                                        <h5>{dias[fecham]}</h5>
                                                        <p>{bogotaManana ? bogotaManana.weather[0].main : 'sin definir'}</p>
                                                    </div>
                                                    <div className="caja-pq-grados">
                                                        <p>{parseInt(bogotaManana ? bogotaManana.temp.max - kelvin : 0)}˚/{parseInt(bogotaManana ? bogotaManana.temp.min - kelvin : 0)}˚</p>
                                                    </div>
                                                </div>
                                                <div className="caja-pq shadow-sm">
                                                    <div className="caja-pq-icon">
                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                    </div>
                                                    <div className="caja-pq-info">
                                                        <h5>{dias[fechap]}</h5>
                                                        <p>{bogotaPasado ? bogotaPasado.weather[0].main : 'sin definir'}</p>
                                                    </div>
                                                    <div className="caja-pq-grados">
                                                        <p>{parseInt(bogotaPasado ? bogotaPasado.temp.max - kelvin : 0)}˚/{parseInt(bogotaPasado ? bogotaPasado.temp.min - kelvin : 0)}˚</p>
                                                    </div>
                                                </div>
                                                <div className="caja-pq shadow-sm">
                                                    <div className="caja-pq-icon">
                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                    </div>
                                                    <div className="caja-pq-info">
                                                        <h5>{dias[fechapm]}</h5>
                                                        <p>{bogotaTrasPasado ? bogotaTrasPasado.weather[0].main : 'sin definir'}</p>
                                                    </div>
                                                    <div className="caja-pq-grados">
                                                        <p>{parseInt(bogotaTrasPasado ? bogotaTrasPasado.temp.max - kelvin : 0)}˚/{parseInt(bogotaTrasPasado ? bogotaTrasPasado.temp.min - kelvin : 0)}˚</p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} md={4} lg={4}>
                                                <h2 className="titulo-seccion"><b>Place to</b> Visit</h2>
                                                <div className="caja-paris shadow-sm">
                                                    <div className="caja-paris-ciudad">
                                                        <FontAwesomeIcon icon="map-marker-alt"/>
                                                        <h3>Paris, Fracia</h3>
                                                    </div>
                                                    <img src={paris} />
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} md={4} lg={4}>
                                                <div className="content-user">
                                                    <FontAwesomeIcon icon="plus"/>
                                                    <p>Top Review</p>
                                                    <ul>
                                                        <li>
                                                            <img src={avatar1} />
                                                        </li>
                                                        <li>
                                                            <img src={avatar2} />
                                                        </li>
                                                        <li>
                                                            <img src={avatar3} />
                                                        </li>
                                                        <li>
                                                            <p>9+</p>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="caja-paris caja-medellin shadow-sm">
                                                    <div className="caja-paris-ciudad"> 
                                                        <FontAwesomeIcon icon="map-marker-alt"/>
                                                        <h3>Medellin, Colombia</h3>
                                                    </div>
                                                    <img src={medellin} />
                                                </div>

                                                <div className="caja-paris caja-barranquilla shadow-sm">
                                                    <div className="caja-paris-ciudad">
                                                        <FontAwesomeIcon icon="map-marker-alt"/>
                                                        <h3>Barranquilla, Colombia</h3>
                                                    </div>
                                                    <img src={barranquilla} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={4}>
                                        <div className="contenedor-izquierdo">
                                        <div className="caja-mediana shadow">
                                                <div className="caja-mediana-body">
                                                    <div className="caja-mediana-icono">

                                                    {(() => {
                                                            switch (parisHoy ? parisHoy.weather[0].main : null) {
                                                                case "Thunderstorm":   return (
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-showers-heavy" />
                                                                    </>
                                                                );
                                                                case "Drizzle": return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-rain" />
                                                                    </>
                                                                ); 
                                                                case "Rain":  return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                                    </>
                                                                );  
                                                                case "Clear":  return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="sun" />
                                                                    </>
                                                                );  
                                                                case "Clouds":  return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud" />
                                                                    </>
                                                                );  
                                                                default: return(
                                                                    <>
                                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                                    </>
                                                                );  
                                                            }
                                                        })()}
                                                    </div>
                                                    <div className="caja-mediana-info">
                                                        <h2>{parseInt(parisHoy ? parisHoy.main.temp - kelvin : 0)}˚</h2>
                                                        <div className="divisor" />
                                                        <h4>{parisHoy ? parisHoy.name : 'Paris'} <small>francia</small></h4>
                                                    </div>
                                                </div>
                                                <div className="caja-mediana-footer">
                                                    <p>humecty {parisHoy ? parisHoy.main.humidity : 0}%</p>
                                                    <p>west</p>
                                                    <p>8.2km</p>
                                                </div>
                                            </div>
                                            <div className="caja-mediana shadow">
                                                <div className="caja-mediana-body">
                                                    <div className="caja-mediana-icono">
                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                    </div>
                                                    <div className="caja-mediana-info">
                                                        <h2>29˚</h2>
                                                        <div className="divisor" />
                                                        <h4>Lyon <small>francia</small></h4>
                                                    </div>
                                                </div>
                                                <div className="caja-mediana-footer">
                                                    <p>humecty 48%</p>
                                                    <p>west</p>
                                                    <p>8.2km</p>
                                                </div>
                                            </div>
                                            <div className="caja-mediana shadow">
                                                <div className="caja-mediana-body">
                                                    <div className="caja-mediana-icono">
                                                        <FontAwesomeIcon icon="cloud-sun-rain" />
                                                    </div>
                                                    <div className="caja-mediana-info">
                                                        <h2>29˚</h2>
                                                        <div className="divisor" />
                                                        <h4>Lyon <small>francia</small></h4>
                                                    </div>
                                                </div>
                                                <div className="caja-mediana-footer">
                                                    <p>humecty 48%</p>
                                                    <p>west</p>
                                                    <p>8.2km</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>

            }
        </Container>
    )
}

export default Home;