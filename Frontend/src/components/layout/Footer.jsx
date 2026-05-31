import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="bg-[#091413] text-white mt-16">
                <div className="max-w-7xl mx-auto px-5 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-10">
                        {/* BRAND */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">
                                RentWheel
                            </h2>
                            <p className="text-gray-300 leading-7 text-sm">
                                Premium vehicle rental platform for seamless
                                booking experience across bikes and cars.
                            </p>
                        </div>
                        {/* QUICK LINKS */}
                        <div>
                            <h3 className="text:sm font-semibold mb-5">
                                Quick Links
                            </h3>
                            <div className="flex flex-col gap-3 text-gray-300 text-sm">
                                <Link
                                    to="/"
                                    className="hover:text-[#B0E4CC] transition"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/explore"
                                    className="hover:text-[#B0E4CC] transition"
                                >
                                    Explore
                                </Link>
                                <Link
                                    to="/about"
                                    className="hover:text-[#B0E4CC] transition"
                                >
                                    About
                                </Link>
                                <Link
                                    to="/contact"
                                    className="hover:text-[#B0E4CC] transition"
                                >
                                    Contact
                                </Link>

                            </div>
                        </div>
                        {/* SERVICES */}
                        <div>
                            <h3 className="text:sm font-semibold mb-5">
                                Services
                            </h3>
                            <div className="flex flex-col gap-3 text-gray-300 text-sm">
                                <p>Car Rentals</p>
                                <p>Bike Rentals</p>
                                <p>Daily Booking</p>
                                <p>Owner Dashboard</p>
                            </div>
                        </div>
                        {/* SOCIALS */}
                        <div>
                            <h3 className="text:sm font-semibold mb-5">
                                Connect
                            </h3>
                            <div className="flex items-center gap-4 mb-5">
                                <button className="bg-[#285A48] hover:bg-[#408A71] transition p-3 rounded-full cursor-pointer">
                                    <FaFacebookF />
                                </button>
                                <button className="bg-[#285A48] hover:bg-[#408A71] transition p-3 rounded-full cursor-pointer">
                                    <FaInstagram />
                                </button>
                                <button className="bg-[#285A48] hover:bg-[#408A71] transition p-3 rounded-full cursor-pointer">
                                    <FaTwitter />
                                </button>
                                <button className="bg-[#285A48] hover:bg-[#408A71] transition p-3 rounded-full cursor-pointer">
                                    <FaLinkedinIn />
                                </button>
                            </div>
                            <p className="text-gray-300 text-sm">
                                support@rentwheel.com
                            </p>
                        </div>

                    </div>
                    {/* BOTTOM */}
                    <div className="border-t border-[#285A48] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-300 text-sm">
                        <p>
                            © 2026 RentWheel. All rights reserved.
                        </p>
                        <div className="flex items-center gap-5">
                            <Link
                                to="/"
                                className="hover:text-[#B0E4CC] transition"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/"
                                className="hover:text-[#B0E4CC] transition"
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;