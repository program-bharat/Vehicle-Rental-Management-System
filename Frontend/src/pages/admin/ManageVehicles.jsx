// import { useEffect, useState } from "react";
// import { getPendingVehicles, approveVehicle, } from "../../api/adminAPI";
// import VehicleApprovalCard from "../../components/admin/VehicleApprovalCard";

// const ManageVehicles = () => {
//     const [vehicles, setVehicles] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchVehicles = async () => {
//         try {
//             const res = await getPendingVehicles();
//             setVehicles(res.data.data);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchVehicles();
//     }, []);

//     const handleApprove = async (id) => {
//         try {
//             await approveVehicle(id);
//             setVehicles((prev) =>
//                 prev.filter((vehicle) => vehicle._id !== id)
//             );
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     if (loading) {
//         return (
//             <h1 className="text-3xl font-bold text-center">
//                 Loading Vehicles...
//             </h1>
//         );
//     }
//     return (
//         <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
//                 {
//                     vehicles.map((vehicle) => (
//                         <VehicleApprovalCard
//                             key={vehicle._id}
//                             vehicle={vehicle}
//                             handleApprove={handleApprove}
//                         />
//                     ))
//                 }
//             </div>
//         </>
//     );
// };

// export default ManageVehicles;

import { useEffect, useState } from "react";

import {
    CarFront,
    BadgeCheck,
    CircleCheckBig,
    Clock3,
} from "lucide-react";

import {
    getPendingVehicles,
    approveVehicle,
} from "../../api/adminAPI";

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

    const approvedVehicles = vehicles.filter(
        (vehicle) => vehicle.isApproved
    ).length;

    const pendingVehicles = vehicles.filter(
        (vehicle) => !vehicle.isApproved
    ).length;

    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-[#285A48]">
                        Loading Vehicles...
                    </h1>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#f6fbf8]">
                {/* VEHICLES GRID */}
                <div className="bg-white rounded-[32px] border border-[#dcefe7] shadow-sm p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#091413] mb-2">
                                Vehicle Approval Management
                            </h2>
                            <p className="text-gray-500">
                                Review and approve vehicles submitted by owners.
                            </p>
                        </div>
                        <div className="bg-[#f6fbf8] border border-[#dcefe7] rounded-2xl px-5 py-3">
                            <span className="text-[#285A48] font-semibold">
                                {vehicles.length} Vehicles Found
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                        {vehicles.map((vehicle) => (
                            <VehicleApprovalCard
                                key={vehicle._id}
                                vehicle={vehicle}
                                handleApprove={handleApprove}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageVehicles;