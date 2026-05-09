import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPublicVehicles } from "../api/vehicleAPI";
import { setVehicles } from "../rtk/slices/vehicleSlice";

import VehicleCard from "../components/vehicle/VehicleCard";
import FilterBar from "../components/vehicle/FilterBar";

const Home = () => {
    const dispatch = useDispatch();
    const { vehicles } = useSelector((state) => state.vehicle);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: "",
        fuelType: "",
        maxPrice: "",
    });

    // FETCH VEHICLES
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const res = await getPublicVehicles();
                dispatch(setVehicles(res.data.data));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [dispatch]);

    // FILTER VEHICLES
    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            const matchType =
                filters.type === "" ||
                vehicle.type === filters.type;
            const matchFuel =
                filters.fuelType === "" ||
                vehicle.fuelType?.toLowerCase() === filters.fuelType.toLowerCase();
            const matchPrice =
                filters.maxPrice === "" ||
                vehicle.pricePerDay <= Number(filters.maxPrice);
            return matchType && matchFuel && matchPrice;
        });
    }, [vehicles, filters]);

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* HERO SECTION */}
                <div className="bg-black text-white rounded-3xl p-10 mb-10">
                    <h1 className="text-5xl font-bold mb-4">
                        Rent Premium Vehicles Easily
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl">
                        Explore cars, bikes, and SUVs from trusted owners at affordable prices.
                    </p>
                </div>

                {/* FILTER BAR */}
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* VEHICLE GRID */}
                {
                    loading ? (
                        <div className="text-center text-2xl font-semibold py-20">
                            Loading Vehicles...
                        </div>
                    ) : filteredVehicles.length === 0 ? (
                        <div className="text-center text-2xl font-semibold py-20">
                            No Vehicles Found
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {
                                filteredVehicles.map((vehicle) => (
                                    <VehicleCard
                                        key={vehicle._id}
                                        vehicle={vehicle}
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

export default Home;