import OwnerVehicleCard from "../../components/owner/OwnerVehicleCard";
import { getOwnerVehicles, deleteVehicle, toggleAvailability } from "../../api/vehicleAPI";
import { useEffect, useState } from "react";

const MyVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);

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
    const openDeletePopup = (id) => {
        setSelectedVehicleId(id);
        setShowDeleteConfirm(true);
    };
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
                                        handleDelete={openDeletePopup}
                                        handleToggleAvailability={handleToggleAvailability}
                                    />

                                ))
                            }

                        </div>
                    )
                }
                {/* Pop-up Delete Confirmation */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                            <h2 className="text-3xl font-bold text-[#091413] mb-3">
                                Confirm Delete
                            </h2>
                            <p className="text-gray-500 mb-8">
                                Are you sure you want to delete this vehicle?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-5 py-3 border border-[#dcefe7] rounded-2xl hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        await handleDelete(selectedVehicleId);
                                        setShowDeleteConfirm(false);
                                        setSelectedVehicleId(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyVehicles;