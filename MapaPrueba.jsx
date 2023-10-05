import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDatesPoliline } from '../../store/dates/thunks';
import { fillBlueOptions, isInCircle, limeOptions, verificarcontinuidad } from '../../logica/logicaMapa';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, useMapEvents, Circle } from 'react-leaflet';
import { CircleIcon } from './react-leaflet-icon';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';

const ClickHandler = ({ handleMapClick }) => {
    const map = useMapEvents({
    click: (e) => {
        handleMapClick(e);
    },
    });
    return null;
};

export const MapPrueba = () => {
    const dispatch = useDispatch();
    const [polyline, setPolyline] = useState([[-74.81881293849844,11.037822926297334]])
    const [polyCircle,setPolyCirlce] = useState([])
    const [circleOpen, setCircleOpen] = useState(false);
    const [clickedPosition, setClickedPosition] = useState(null);

    useEffect(() => {
        var inicialcompleto= '2023-09-14T12:00:01';
        var finalcompleto = '2023-10-04T23:05:00'
        dispatch(searchDatesPoliline(inicialcompleto,finalcompleto))
        
    }, [])

    const {policonsultas} = useSelector(state => state.dates)

    useEffect(()=>{
        
        if(policonsultas.length>0){
            var newPoli= verificarcontinuidad(policonsultas)
            setPolyline(newPoli)
        }
    },[policonsultas.length])

    const handleMapClick = (e) => {
        const clickedCoordinates = e.latlng;
        setClickedPosition(clickedCoordinates);
        const newPolip = isInCircle(policonsultas,clickedCoordinates)
        setPolyCirlce(newPolip)
        setCircleOpen(true);
    };
    return (
        <MapContainer center={['11.037822926297334','-74.81881293849844']} zoom={6} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ClickHandler handleMapClick={handleMapClick} />
                {
                    circleOpen
                    ?<Circle center={clickedPosition} pathOptions={fillBlueOptions} radius={200} />
                    :null
                }
                {polyline.length>=2
                    ?<>
                        <Polyline pathOptions={limeOptions} positions={polyline} />
                    </>
                    : null
                }
                {
                    polyCircle.length>0
                    ?<>{
                        polyCircle.map(punto =>{
                                return (
                                        <Marker position={[punto[0].toString(),punto[1].toString()]} icon={CircleIcon}>
                                        </Marker>
                                )
                            })
                            }
                    
                    </>
                    :null
                }
                {/* <Polyline pathOptions={redOptions} positions={multiPolyline} /> */}
            </MapContainer>
        )
}