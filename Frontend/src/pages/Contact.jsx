import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto space-y-20">

                    {/* CONTACT BANNER */}
                    <section className="bg-[#091413] text-white rounded-3xl px-8 py-16">
                        <div className="max-w-4xl">
                            <p className="text-[#B0E4CC] font-semibold mb-4">
                                Contact RentiGo
                            </p>

                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                We’re Here To Help You
                            </h1>

                            <p className="text-lg text-gray-300 leading-8">
                                Have questions regarding bookings, payments,
                                or vehicle listings? Our support team is ready
                                to assist you anytime.
                            </p>
                        </div>
                    </section>

                    {/* CONTACT SECTION */}
                    <section>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* CONTACT INFO */}
                            <div className="space-y-6">

                                <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold text-[#091413] mb-4">
                                        Support Email
                                    </h3>

                                    <p className="text-gray-600">
                                        support@rentigo.com
                                    </p>
                                </div>

                                <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold text-[#091413] mb-4">
                                        Phone Number
                                    </h3>

                                    <p className="text-gray-600">
                                        +91 9876543210
                                    </p>
                                </div>

                                <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold text-[#091413] mb-4">
                                        Office Address
                                    </h3>

                                    <p className="text-gray-600 leading-7">
                                        RentiGo Headquarters,
                                        Sector 62, Noida,
                                        Uttar Pradesh, India
                                    </p>
                                </div>

                                <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                    <h3 className="text-2xl font-bold text-[#091413] mb-4">
                                        Working Hours
                                    </h3>

                                    <p className="text-gray-600">
                                        Monday - Saturday
                                    </p>

                                    <p className="text-gray-600">
                                        9:00 AM - 8:00 PM
                                    </p>
                                </div>

                            </div>

                            {/* FORM */}
                            <div className="bg-white border border-[#D6EFE3] rounded-3xl p-8">
                                <h2 className="text-3xl font-bold text-[#091413] mb-6">
                                    Send Us A Message
                                </h2>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-[#D6EFE3] p-4 rounded-xl outline-none focus:border-[#408A71]"
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-[#D6EFE3] p-4 rounded-xl outline-none focus:border-[#408A71]"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Enter Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full border border-[#D6EFE3] p-4 rounded-xl outline-none focus:border-[#408A71]"
                                        required
                                    />

                                    <textarea
                                        name="message"
                                        placeholder="Write Your Message"
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full border border-[#D6EFE3] p-4 rounded-xl outline-none resize-none focus:border-[#408A71]"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="bg-[#091413] hover:bg-[#285A48] text-white px-7 py-3 rounded-xl transition cursor-pointer w-full mt-5"
                                    >
                                        Send Message
                                    </button>

                                </form>
                            </div>

                        </div>
                    </section>
                    {/* FAQ SECTION */}
                    <section className="mb-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#091413] mb-3">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-500">
                                Quick answers to common questions
                            </p>
                        </div>
                        <div className="space-y-5">

                            <details className="group bg-white border border-[#D6EFE3] rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-lg text-[#091413] list-none">
                                    Do I need a driving license to rent a vehicle?
                                    <span className="transition group-open:rotate-180">
                                        <IoIosArrowDropdownCircle />
                                    </span>
                                </summary>
                                <div className="px-6 pb-5 text-gray-600 leading-7">
                                    Yes, a valid driving license is mandatory for renting any vehicle on RentiGo.
                                </div>
                            </details>

                            <details className="group bg-white border border-[#D6EFE3] rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-lg text-[#091413] list-none">
                                    What documents are required for booking?
                                    <span className="transition group-open:rotate-180">
                                        <IoIosArrowDropdownCircle />
                                    </span>
                                </summary>
                                <div className="px-6 pb-5 text-gray-600 leading-7">
                                    You need a valid driving license, ID proof, and contact number for verification.
                                </div>
                            </details>

                            <details className="group bg-white border border-[#D6EFE3] rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-lg text-[#091413] list-none">
                                    Is fuel included in the rental price?
                                    <span className="transition group-open:rotate-180">
                                        <IoIosArrowDropdownCircle />
                                    </span>
                                </summary>
                                <div className="px-6 pb-5 text-gray-600 leading-7">
                                    Fuel policy depends on the vehicle owner and booking type.
                                </div>
                            </details>

                            <details className="group bg-white border border-[#D6EFE3] rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-lg text-[#091413] list-none">
                                    Do you provide pickup and drop services?
                                    <span className="transition group-open:rotate-180">
                                        <IoIosArrowDropdownCircle />
                                    </span>
                                </summary>
                                <div className="px-6 pb-5 text-gray-600 leading-7">
                                    Some vehicle owners provide pickup and drop facilities based on location.
                                </div>
                            </details>

                            <details className="group bg-white border border-[#D6EFE3] rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-lg text-[#091413] list-none">
                                    What happens if I return the vehicle late?
                                    <span className="transition group-open:rotate-180">
                                        <IoIosArrowDropdownCircle />
                                    </span>
                                </summary>
                                <div className="px-6 pb-5 text-gray-600 leading-7">
                                    Additional late charges may apply depending on booking duration and owner policy.
                                </div>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Contact;