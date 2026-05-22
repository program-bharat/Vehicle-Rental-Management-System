import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NumberTicker } from "@/components/ui/number-ticker";
import { requestOwnerRole } from "../api/userAPI";
import { getPublicVehicles } from "../api/vehicleAPI";
import { setVehicles } from "../rtk/slices/vehicleSlice";
import VehicleCard from "../components/vehicle/VehicleCard";
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vehicles } = useSelector((state) => state.vehicle);
    const [quickSearch, setQuickSearch] = useState({
        type: "",
        date: "",
    });
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await getPublicVehicles();
                dispatch(setVehicles(res.data.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchVehicles();
    }, [dispatch]);
    const handleQuickSearch = () => {
        navigate("/explore", {
            state: {
                type: quickSearch.type,
                date: quickSearch.date,
            },
        });
    };
    const handleBecomeOwner = async () => {
        try {
            const res = await requestOwnerRole();
            toast.success("Owner request sent successfully");
        } catch (error) {
            toast.warning("You have already requested owner access");
        }
    };
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* HERO SECTION */}
                <section className="bg-[#091413] text-white rounded-3xl px-8 py-16 mb-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* LEFT */}
                        <div>
                            <p className="text-[#B0E4CC] font-semibold mb-4">
                                Premium Vehicle Rental Platform
                            </p>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Rent Your Perfect Ride Anytime
                            </h1>
                            <p className="text-gray-300 text-lg leading-8 mb-8">
                                Explore premium cars, bikes, and SUVs from trusted owners
                                at affordable daily rental prices.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/explore"
                                    className="bg-[#408A71] hover:bg-[#285A48] px-6 py-3 rounded-xl font-semibold transition"
                                >
                                    Explore Vehicles
                                </Link>
                                <button
                                    onClick={handleBecomeOwner}
                                    className="border border-[#408A71] hover:bg-[#285A48] px-6 py-3 rounded-xl font-semibold transition cursor-pointer"
                                >
                                    Become Owner
                                </button>
                            </div>

                        </div>
                        {/* RIGHT */}
                        <div className="overflow-hidden rounded-3xl">
                            <img
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                                // src="https://images.unsplash.com/photo-1603189617530-6d32306f57c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJtd3xlbnwwfHwwfHx8MA%3D%3D"
                                alt="Vehicle"
                                className="rounded-3xl sm:h-[250px] md:h-[370px] lg:h-[450px] w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                    </div>
                </section>
                {/* FEATURED VEHICLES */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-[#091413] mb-2">
                                Featured Vehicles
                            </h2>
                            <p className="text-gray-500">
                                Most popular rental vehicles
                            </p>
                        </div>
                        <Link
                            to="/explore"
                            className="text-[#285A48] font-semibold"
                        >
                            View All Vehicles
                        </Link>
                    </div>
                    {/* VEHICLE CARDS GRID HERE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            [...vehicles]
                                .sort(() => Math.random() - 0.5)
                                .slice(0, 6)
                                .map((vehicle) => (
                                    <VehicleCard
                                        key={vehicle._id}
                                        vehicle={vehicle}
                                    />
                                ))
                        }
                    </div>
                </section>
                {/* WHY CHOOSE US */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#091413] mb-3">
                            Why Choose RentiGo
                        </h2>
                        <p className="text-gray-500">
                            Trusted by thousands of customers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-[#D6EFE3]">
                            <h3 className="text-2xl font-bold mb-3">
                                Easy Booking
                            </h3>
                            <p className="text-gray-500 leading-7">
                                Simple and fast vehicle booking experience.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-[#D6EFE3]">
                            <h3 className="text-2xl font-bold mb-3">
                                Verified Vehicles
                            </h3>
                            <p className="text-gray-500 leading-7">
                                Trusted and verified owners and vehicles.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-[#D6EFE3]">
                            <h3 className="text-2xl font-bold mb-3">
                                Affordable Pricing
                            </h3>
                            <p className="text-gray-500 leading-7">
                                Best pricing for daily and weekly rentals.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-[#D6EFE3]">
                            <h3 className="text-2xl font-bold mb-3">
                                24/7 Support
                            </h3>
                            <p className="text-gray-500 leading-7">
                                Dedicated customer support anytime.
                            </p>
                        </div>
                    </div>
                </section>

                {/* VEHICLE CATEGORIES */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-[#091413] mb-10 text-center">
                        Vehicle Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center font-semibold">
                            Cars
                        </div>
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center font-semibold">
                            Bikes
                        </div>
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center font-semibold">
                            SUVs
                        </div>
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center font-semibold">
                            Sports Bikes
                        </div>
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center font-semibold">
                            Luxury Vehicles
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-center text-[#091413] mb-12">
                        What Customers Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 flex flex-col h-[180px]">
                            <p className="text-gray-600 leading-7 italic">
                                "Amazing rental experience and smooth booking process."
                            </p>
                            <h3 className="font-semibold text-[#285A48] text-right mt-auto">
                                — Rahul
                            </h3>
                        </div>
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 flex flex-col h-[180px]">
                            <p className="text-gray-600 leading-7 italic">
                                "Clean vehicles and affordable pricing."
                            </p>
                            <h3 className="font-semibold text-[#285A48] text-right mt-auto">
                                — Shubham
                            </h3>
                        </div>
                        <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 flex flex-col h-[180px]">
                            <p className="text-gray-600 leading-7 italic">
                                "One of the best rental platforms I have used."
                            </p>
                            <h3 className="font-semibold text-[#285A48] text-right mt-auto">
                                — Shivam
                            </h3>
                        </div>
                    </div>
                </section>

                {/* STATS SECTION */}
                <section className="bg-[#091413] rounded-3xl text-white px-8 py-14 mb-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                        {/* VEHICLES */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex items-center justify-center">
                                <NumberTicker
                                    value={1000}
                                    className="whitespace-pre-wrap text-white"
                                />
                                +
                            </h2>
                            <p className="text-gray-300">
                                Vehicles
                            </p>
                        </div>
                        {/* CUSTOMERS */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex items-center justify-center">
                                <NumberTicker
                                    value={15000}
                                    className="whitespace-pre-wrap text-white"
                                />
                                +
                            </h2>
                            <p className="text-gray-300">
                                Happy Customers
                            </p>
                        </div>
                        {/* CITIES */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex items-center justify-center">
                                <NumberTicker
                                    value={27}
                                    className="whitespace-pre-wrap text-white"
                                />
                                +
                            </h2>
                            <p className="text-gray-300">
                                Cities
                            </p>
                        </div>
                        {/* BOOKINGS */}
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex items-center justify-center">
                                <NumberTicker
                                    value={10000}
                                    className="whitespace-pre-wrap text-white"
                                />
                                +
                            </h2>
                            <p className="text-gray-300">
                                Successful Bookings
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="bg-white border border-[#D6EFE3] rounded-3xl px-8 py-16 text-center">
                    <h2 className="text-5xl font-bold text-[#091413] mb-5">
                        Ready To Book Your Next Ride?
                    </h2>
                    <p className="text-gray-500 text-lg mb-8">
                        Explore premium vehicles and book instantly.
                    </p>
                    <div className="flex items-center justify-center flex-wrap gap-5">
                        <Link
                            to="/explore"
                            className="bg-[#091413] hover:bg-[#285A48] text-white px-7 py-3 rounded-xl transition"
                        >
                            Explore Vehicles
                        </Link>
                        <Link
                            to="/register"
                            className="border border-[#091413] text-[#091413] hover:bg-[#091413] hover:text-white px-7 py-3 rounded-xl transition"
                        >
                            Register Now
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;