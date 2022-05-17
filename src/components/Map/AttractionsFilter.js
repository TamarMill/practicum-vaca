import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { useEffect } from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function AttractionsFilter({ types, handleTypeSelect, chosenCity, setCoordinates }) {
    const {

        setValue,
        suggestions: { data },

    } = usePlacesAutocomplete({
        requestOptions: {
            types: [types],
            componentRestrictions: { country: "us" }
        },
        cache: 0
    });
    useEffect(() => {
        if (chosenCity) {

            setValue(chosenCity)
        }

    }, [chosenCity, types, setValue])
    useEffect(() => {
        async function processData() {
            const promises = data.map(async (location) => {
                const results = await getGeocode({ address: location.description });
                const locationWithCoordinate = {
                    location,
                    coordinate: await getLatLng(results[0])
                }
                return locationWithCoordinate;



            })

            const processed = await Promise.all(promises)

            setCoordinates(processed)
        }
        if (data.length) {
            processData()
        }

    }, [data, setCoordinates])


    return (

        <FormControl style={{ marginTop: '5%' }}>
            <FormLabel style={{ color: 'black' }} id="demo-radio-buttons-group-label">What would you like to view?</FormLabel>
            <RadioGroup
                style={{}}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleTypeSelect}
            >
                <FormControlLabel value="lodging" control={<Radio />} label="Lodging" />
                <FormControlLabel value="cafe" control={<Radio />} label="Cafe" />
                <FormControlLabel value="museum" control={<Radio />} label="Museum" />
            </RadioGroup>
        </FormControl>
    )

}
export { AttractionsFilter };