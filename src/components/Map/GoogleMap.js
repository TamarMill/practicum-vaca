import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";

function Map() {
    return (
        <div style={{ height: 1000, width: 1000 }}>
            <GoogleMap mapContainerClassName='map-container' zoom={10} center={{ lat: 43.45, lng: -80.49 }} />
        </div>
    )
}
export { Map }