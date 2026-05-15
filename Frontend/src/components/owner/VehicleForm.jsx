const VehicleForm = ({
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
    loading,
    buttonText,
}) => {

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="border rounded-3xl p-6 shadow space-y-2 bg-white"
            >

                {/* VEHICLE NAME */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Vehicle Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Vehicle Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    />
                </div>

                {/* BRAND */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Brand
                    </label>

                    <input
                        type="text"
                        name="brand"
                        placeholder="Enter Brand Name"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    />
                </div>

                {/* MODEL */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Model
                    </label>

                    <input
                        type="text"
                        name="model"
                        placeholder="Enter Vehicle Model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    />
                </div>

                {/* TYPE */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Vehicle Type
                    </label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    >
                        <option value="">
                            Select Type
                        </option>

                        <option value="2W">
                            2 Wheeler
                        </option>

                        <option value="4W">
                            4 Wheeler
                        </option>
                    </select>
                </div>

                {/* FUEL TYPE */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Fuel Type
                    </label>

                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    >
                        <option value="">
                            Select Fuel Type
                        </option>

                        <option value="petrol">
                            Petrol
                        </option>

                        <option value="diesel">
                            Diesel
                        </option>

                        <option value="electric">
                            Electric
                        </option>

                        <option value="cng">
                            CNG
                        </option>
                    </select>
                </div>

                {/* TRANSMISSION */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Transmission
                    </label>

                    <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                    >
                        <option value="">
                            Select Transmission
                        </option>

                        <option value="manual">
                            Manual
                        </option>

                        <option value="automatic">
                            Automatic
                        </option>
                    </select>
                </div>

                {/* PRICE */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Price Per Day
                    </label>

                    <input
                        type="number"
                        name="pricePerDay"
                        placeholder="Enter Price"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    />
                </div>

                {/* IMAGE */}
                <div>
                    <label className="block mb-2 font-semibold">
                        Vehicle Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-3 rounded-xl outline-none"
                        required
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 mt-3 rounded-2xl text-lg font-semibold
                        ${loading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800 cursor-pointer"
                        }`}
                >
                    {
                        loading
                            ? "Processing..."
                            : buttonText
                    }
                </button>

            </form>
        </>
    );
};

export default VehicleForm;
