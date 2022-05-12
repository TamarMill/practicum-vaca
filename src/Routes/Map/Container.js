import { useLoadScript } from "@react-google-maps/api";
import { Map } from '../../components/Map/GoogleMap'
function Container() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBpaXi8t7eb9B4sIqt1CVDTXIP1xZXwHlM',
        libraries: ["places"],
    })
    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (

        <Map />
    )
}
export { Container };