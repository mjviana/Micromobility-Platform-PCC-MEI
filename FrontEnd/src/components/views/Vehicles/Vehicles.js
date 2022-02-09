import './index.css';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/index';
import gateway from '../../../connections';


const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);

    const getVehicles = async() => {

        await gateway.get("/vehicles").then(resp => setVehicles(resp.data));

    }

    const columns = [
        {
            id: "id",
            value: "ID"
        },
        {
            id: "model",
            value: "Modelo"
        },
        {
            id: "status",
            value: "Status"
        },
        {
            id: "active",
            value: "Ativo"
        },
        {
            id: "latitude",
            value: "Latitude"
        },
        {
            id: "longitude",
            value: "Longitude"
        },
        {
            id: "pricePerMinute",
            value: "Preço p/minuto"
        },
    ]

    useEffect(() => {

        getVehicles();

    }, []); 


return (
       <div className="main-home-container">
       <Navbar />
       <table className="table">
            <thead>
                <tr>
                    {
                        columns.map(c => {
                           return <th scope="col" key={c.id}>{c.value}</th>
                        })
                    }              
                </tr>
            </thead>
            <tbody>
                {
                    vehicles.map(v => {                    
                        return(
                        <tr key={v.id}>
                            <td width='20px'>{v.id}</td>
                            <td width='20px'>{v.model}</td>
                            <td width='20px'>{v.status}</td>
                            <td width='20px'>{v.active === true ? 'true' : 'false'}</td>
                            <td width='20px'>{v.latitude ? v.latitude : 'NULL'}</td>
                            <td width='20px'>{v.longitude ? v.longitude : 'NULL'}</td>
                            <td width='20px'>{v.pricePerMinute.toFixed(2)}€</td>
                        </tr>
                        )                  
                        //console.log(v.id)
                    })
                }
                
            </tbody>
        </table>
    </div>
); 
};
export default Vehicles;
