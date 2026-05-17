import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublicVehicles } from "../api/vehicleAPI";
import { setVehicles } from "../rtk/slices/vehicleSlice";
import VehicleCard from "../components/vehicle/VehicleCard";
import FilterBar from "../components/vehicle/FilterBar";

const Explore = () => {
    const dispatch = useDispatch();
    const { vehicles } = useSelector((state) => state.vehicle);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        type: "",
        fuelType: "",
        transmission: "",
        maxPrice: "",
        sortBy: "",
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
        let updatedVehicles = [...vehicles];
        updatedVehicles = updatedVehicles.filter((vehicle) => {
            const matchSearch =
                filters.search === "" ||
                vehicle.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                vehicle.brand?.toLowerCase().includes(filters.search.toLowerCase());
            const matchType =
                filters.type === "" ||
                vehicle.type === filters.type;
            const matchFuel =
                filters.fuelType === "" ||
                vehicle.fuelType?.toLowerCase() ===
                filters.fuelType.toLowerCase();
            const matchTransmission =
                filters.transmission === "" ||
                vehicle.transmission?.toLowerCase() ===
                filters.transmission.toLowerCase();
            const matchPrice =
                filters.maxPrice === "" ||
                vehicle.pricePerDay <= Number(filters.maxPrice);
            return (
                matchSearch &&
                matchType &&
                matchFuel &&
                matchTransmission &&
                matchPrice
            );
        });
        // SORTING
        if (filters.sortBy === "lowToHigh") {
            updatedVehicles.sort(
                (a, b) => a.pricePerDay - b.pricePerDay
            );
        }
        if (filters.sortBy === "highToLow") {
            updatedVehicles.sort(
                (a, b) => b.pricePerDay - a.pricePerDay
            );
        }
        return updatedVehicles;
    }, [vehicles, filters]);

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* HEADER SECTION */}
                <div className="bg-[#091413] text-white rounded-3xl px-8 py-14 mb-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                            Explore Premium Rental Vehicles
                        </h1>
                        <p className="text-gray-300 text-lg leading-8">
                            Discover cars, bikes, and SUVs from trusted owners
                            at affordable daily rental prices.
                        </p>
                    </div>
                </div>
                {/* FILTER SECTION */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#D6EFE3] p-5 mb-10">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-[#091413]">
                            Find Your Perfect Ride
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Filter vehicles based on your preferences
                        </p>
                    </div>
                    <FilterBar
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
                {/* VEHICLE SECTION */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#091413]">
                            Available Vehicles
                        </h2>
                        <p className="text-[#285A48] font-medium">
                            {filteredVehicles.length} Vehicles Found
                        </p>
                    </div>
                    {
                        loading ? (
                            <div className="flex items-center justify-center py-24">
                                <h2 className="text-2xl font-semibold text-[#091413]">
                                    Loading Vehicles...
                                </h2>
                            </div>
                        ) : filteredVehicles.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-[#D6EFE3] py-24 text-center">
                                <h2 className="text-3xl font-bold text-[#091413] mb-3">
                                    No Vehicles Found
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    Try changing your filters to explore more vehicles.
                                </p>
                                <button
                                    onClick={() =>
                                        setFilters({
                                            search: "",
                                            type: "",
                                            fuelType: "",
                                            transmission: "",
                                            maxPrice: "",
                                            sortBy: "",
                                        })
                                    }
                                    className="bg-[#091413] hover:bg-[#285A48] text-white px-6 py-3 rounded-xl transition cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            </div>
        </>
    );
};

export default Explore;