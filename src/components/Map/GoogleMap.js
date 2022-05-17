import {
    GoogleMap,
    Marker,

} from "@react-google-maps/api";
import TextField from '@mui/material/TextField';
import './Map.css'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { useRef, useState } from 'react';
import { AttractionsFilter } from "./AttractionsFilter";
import { InfoWindow } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
const center = { lat: 37.1, lng: -95.7 }
function Map() {
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(4);
    const [chosenCity, setChosenCity] = useState('');
    const [type, setType] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [locationInfo, setLocationInfo] = useState('');
    const [locationInfoCoordinate, setLocationInfoCoordinate] = useState(null);
    const map = useRef()
    const {

        value,
        setValue,
        suggestions: { data },

    } = usePlacesAutocomplete({
        requestOptions: {
            types: ['locality'],

            componentRestrictions: { country: "us" }
        }
    });

    async function handleSelect(value) {
        const results = await getGeocode({ address: value });
        const { lat, lng } = await getLatLng(results[0]);
        map.current.panTo({ lat, lng })
        setZoom(10);
        setChosenCity(value);
    }


    function renderCityOptions(city) {
        return (
            <div onClick={() => handleSelect(city.description)}>
                {city.description}
            </div>
        )
    }
    const filterCities = data.filter(city => city.types.includes('locality'))
    function handleRadioChange(e) {
        setType(e.target.value);

    }
    function handleMarkerClick(locationInfo, coordinate) {
        setLocationInfo(locationInfo)
        setLocationInfoCoordinate(coordinate)
    }
    function handleInfoWindowClose() {
        setLocationInfo('')
        setLocationInfoCoordinate(null)
    }
    function renderMarker(coordinate) {
        return (
            <div>
                <Marker onClick={() => handleMarkerClick(coordinate.location.description, coordinate.coordinate)} title={coordinate.location.description} position={coordinate.coordinate} />


            </div >
        )
    }
    return (
        <div>
            <TextField value={value} onChange={e => setValue(e.target.value)} />
            {filterCities.map(renderCityOptions)}
            <div style={{ height: 500, width: 500 }}>
                <GoogleMap
                    onLoad={googleMap => map.current = googleMap}
                    mapContainerClassName='map-container'
                    zoom={zoom}
                    center={center}>
                    {coordinates.map(renderMarker)}
                    {locationInfoCoordinate && <InfoWindow onCloseClick={handleInfoWindowClose} position={locationInfoCoordinate}>
                        <div>
                            <p>{locationInfo}</p>
                            <button onClick={() => navigate('/notes')}>Add Note</button>
                        </div>
                    </InfoWindow>}
                </GoogleMap>

            </div>
            <AttractionsFilter
                setCoordinates={setCoordinates}
                handleTypeSelect={handleRadioChange}
                types={type}
                chosenCity={chosenCity}
            />
        </div>
    )
}

export { Map }