import './index.css';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/index';
import gateway from '../../../connections';


const Trips = () => {

    const [trips, setTrips] = useState([]);

    const getTrips = async() => {

        await gateway.get("/trips").then(resp => setTrips(resp.data));

    }

    const columns = [
        {
            id: "tripId",
            value: "Id Viagem"
        },
        {
            id: "userId",
            value: "Id Utilizador"
        },
        {
            id: "vehicleId",
            value: "Id Veículo"
        },
        {
            id: "startLatitude",
            value: "Latitude I."
        },
        {
            id: "startLongitude",
            value: "Longitude I."
        },
        {
            id: "endLatitude",
            value: "Latitute F."
        },
        {
            id: "endLongitude",
            value: "Longitude F."
        },
        {
            id: "startedAt",
            value: "Começou a"
        },
        {
            id: "finishedAt",
            value: "Acabou a"
        },
        {
            id: "cost",
            value: "Custo"
        },
        {
            id: "feedback",
            value: "Feedback"
        },
    ]

    useEffect(() => {

        getTrips();

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
                    trips.map(v => {                    
                        return(
                        <tr key={v.id}>
                            <td width='20px'>{v.tripId}</td>
                            <td width='20px'>{v.userId}</td>
                            <td width='20px'>{v.vehicleId}</td>
                            <td width='20px'>{v.startLatitude}</td>
                            <td width='20px'>{v.startLongitude}</td>
                            <td width='20px'>{v.endLatitude}</td>
                            <td width='20px'>{v.endLongitude}</td>
                            <td width='20px'>{v.startedAt}</td>
                            <td width='20px'>{v.finishedAt}</td>
                            <td width='20px'>{v.cost}€</td>
                            <td width='20px'>{v.feedback ? v.feedback : 'NULL'}</td>
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
export default Trips;
