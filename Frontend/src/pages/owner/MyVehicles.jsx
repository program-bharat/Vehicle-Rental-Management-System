import OwnerVehicleCard from "../../components/owner/OwnerVehicleCard";
import { getOwnerVehicles, deleteVehicle, toggleAvailability } from "../../api/vehicleAPI";
import { useEffect, useState } from "react";

const MyVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const res = await getOwnerVehicles();
                setVehicles(res.data.data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);
    // DELETE VEHICLE
    const handleDelete = async (id) => {
        try {
            await deleteVehicle(id);
            setVehicles((prev) =>
                prev.filter((vehicle) => vehicle._id !== id)
            );

        } catch (error) {
            console.log(error);
        }
    };

    // TOGGLE AVAILABILITY
    const handleToggleAvailability = async (id) => {
        try {
            await toggleAvailability(id);
            setVehicles((prev) =>
                prev.map((vehicle) =>
                    vehicle._id === id
                        ? {
                            ...vehicle,
                            availability: !vehicle.availability,
                        }
                        : vehicle
                )
            );
        } catch (error) {
            console.log(error);

        }
    };

    if (loading) {
        return (
            <>
                <div className="text-center text-2xl font-bold py-20">
                    Loading Vehicles...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="text-center text-red-500 text-2xl font-bold py-20">
                    {error}
                </div>
            </>
        );
    }

    return (
        <>
            <div>

                {
                    vehicles.length === 0 ? (
                        <h2 className="text-2xl font-semibold">
                            No Vehicles Found
                        </h2>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {
                                vehicles.map((vehicle) => (

                                    <OwnerVehicleCard
                                        key={vehicle._id}
                                        vehicle={vehicle}
                                        handleDelete={handleDelete}
                                        handleToggleAvailability={handleToggleAvailability}
                                    />

                                ))
                            }

                        </div>
                    )
                }

            </div>
        </>
    );
};

export default MyVehicles;