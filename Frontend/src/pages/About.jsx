import { Link } from "react-router-dom";

const About = () => {
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-20">
                    {/* ABOUT BANNER */}
                    <section className="bg-[#091413] text-white rounded-3xl px-8 py-16">
                        <div className="max-w-4xl">
                            <p className="text-[#B0E4CC] font-semibold mb-4">
                                About RentiGo
                            </p>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Redefining Vehicle Rentals Across Cities
                            </h1>
                            <p className="text-lg text-gray-300 leading-8">
                                RentiGo is a modern vehicle rental platform
                                designed to make renting cars and bikes simple,
                                affordable, and accessible for everyone.
                            </p>
                        </div>
                    </section>
                    {/* COMPANY STORY */}
                    <section>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-14 items-center">
                            <div>
                                <img
                                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
                                    alt="About"
                                    className="rounded-3xl h-[450px] w-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-[#408A71] font-semibold mb-3">
                                    Our Story
                                </p>
                                <h2 className="text-4xl font-bold text-[#091413] mb-6">
                                    Why RentiGo Was Created
                                </h2>
                                <p className="text-gray-600 leading-8 mb-5">
                                    RentiGo started with a simple idea —
                                    making premium vehicle rentals easier,
                                    safer, and more transparent.
                                </p>
                                <p className="text-gray-600 leading-8 mb-5">
                                    Traditional rental systems were often
                                    expensive, difficult to access, and lacked
                                    trust between owners and customers.
                                </p>
                                <p className="text-gray-600 leading-8">
                                    Our platform connects verified vehicle
                                    owners with customers through a seamless
                                    booking experience.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* MISSION & VISION */}
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#091413] mb-3">
                                Mission & Vision
                            </h2>
                            <p className="text-gray-500">
                                Building the future of smart rentals
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-10">
                                <h3 className="text-3xl font-bold text-[#091413] mb-5">
                                    Our Mission
                                </h3>
                                <p className="text-gray-600 leading-8">
                                    To simplify vehicle rentals by providing
                                    secure, affordable, and reliable booking
                                    experiences for customers everywhere.
                                </p>
                            </div>
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-10">
                                <h3 className="text-3xl font-bold text-[#091413] mb-5">
                                    Our Vision
                                </h3>
                                <p className="text-gray-600 leading-8">
                                    To become the most trusted and accessible
                                    vehicle rental ecosystem across India.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* WHY CHOOSE US */}
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#091413] mb-3">
                                Why Choose Us
                            </h2>
                            <p className="text-gray-500">
                                Trusted platform for modern rentals
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    Trusted Rentals
                                </h3>
                                <p className="text-gray-600 leading-7">
                                    Reliable vehicles from verified owners.
                                </p>
                            </div>
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    Verified Owners
                                </h3>
                                <p className="text-gray-600 leading-7">
                                    Every owner and vehicle is verified.
                                </p>
                            </div>
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    Secure Booking
                                </h3>
                                <p className="text-gray-600 leading-7">
                                    Safe and transparent booking process.
                                </p>
                            </div>
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-4">
                                    Affordable Pricing
                                </h3>
                                <p className="text-gray-600 leading-7">
                                    Competitive pricing for all vehicle types.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* STATS */}
                    <section className="bg-[#091413] rounded-3xl text-white px-8 py-14">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                            <div>
                                <h2 className="text-5xl font-bold mb-3">
                                    500+
                                </h2>
                                <p className="text-gray-300">
                                    Vehicles
                                </p>
                            </div>
                            <div>
                                <h2 className="text-5xl font-bold mb-3">
                                    10K+
                                </h2>
                                <p className="text-gray-300">
                                    Users
                                </p>
                            </div>
                            <div>
                                <h2 className="text-5xl font-bold mb-3">
                                    25+
                                </h2>
                                <p className="text-gray-300">
                                    Cities
                                </p>
                            </div>
                            <div>
                                <h2 className="text-5xl font-bold mb-3">
                                    15K+
                                </h2>
                                <p className="text-gray-300">
                                    Bookings
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* TEAM */}
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#091413] mb-3">
                                Meet Our Team
                            </h2>
                            <p className="text-gray-500">
                                Passionate people behind RentiGo
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center">
                                <h3 className="text-2xl font-bold mb-2">
                                    Bharat
                                </h3>
                                <p className="text-[#408A71] font-medium mb-4">
                                    Founder
                                </p>
                                <p className="text-gray-600 leading-7">
                                    Leading product vision and platform growth.
                                </p>
                            </div>
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center">
                                <h3 className="text-2xl font-bold mb-2">
                                    Operations Team
                                </h3>
                                <p className="text-[#408A71] font-medium mb-4">
                                    Operations
                                </p>
                                <p className="text-gray-600 leading-7">
                                    Managing vehicle onboarding and rentals.
                                </p>
                            </div>
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8 text-center">
                                <h3 className="text-2xl font-bold mb-2">
                                    Support Team
                                </h3>
                                <p className="text-[#408A71] font-medium mb-4">
                                    Customer Support
                                </p>
                                <p className="text-gray-600 leading-7">
                                    Helping customers with smooth experiences.
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* CTA */}
                    <section className="bg-white border border-[#D6EFE3] rounded-3xl px-8 py-16 text-center">

                        <h2 className="text-5xl font-bold text-[#091413] mb-5">
                            Start Your Journey Today
                        </h2>
                        <p className="text-gray-500 text-lg mb-8">
                            Explore premium vehicles and book instantly.
                        </p>
                        <Link
                            to="/explore"
                            className="bg-[#091413] hover:bg-[#285A48] text-white px-8 py-3 rounded-xl transition"
                        >
                            Explore Vehicles
                        </Link>
                    </section>
                </div>
            </div>
        </>
    );
};

export default About;