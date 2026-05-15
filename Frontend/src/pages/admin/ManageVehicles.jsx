import { useEffect, useState } from "react";
import { getPendingVehicles, approveVehicle, } from "../../api/adminAPI";
import VehicleApprovalCard from "../../components/admin/VehicleApprovalCard";

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicles = async () => {
        try {
            const res = await getPendingVehicles();
            setVehicles(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveVehicle(id);
            setVehicles((prev) =>
                prev.filter((vehicle) => vehicle._id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };
    if (loading) {
        return (
            <h1 className="text-3xl font-bold text-center">
                Loading Vehicles...
            </h1>
        );
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {
                    vehicles.map((vehicle) => (
                        <VehicleApprovalCard
                            key={vehicle._id}
                            vehicle={vehicle}
                            handleApprove={handleApprove}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default ManageVehicles;