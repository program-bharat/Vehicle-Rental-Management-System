import { useEffect, useState } from "react"
import { getPublicVehicles } from "../api/vehicleAPI"
import { useDispatch, useSelector } from "react-redux";
import { setVehicles } from "../rtk/slices/vehicleSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { vehicles } = useSelector((state) => state.vehicle);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPublicVehicles();
                console.log(res);
                dispatch(setVehicles(res.data.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);
    return (
        <>
            <h1 className='text-4xl font-bold text-gray-900 mb-4 text-center'>Home Page</h1>
            {
                vehicles.map((i) => (
                    <p key={i._id}>{i.name}</p>
                ))
            }
        </>
    )
}

export default Home
