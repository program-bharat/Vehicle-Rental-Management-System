const FilterBar = ({ filters, setFilters, }) => {
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <div className="bg-white p-5 rounded-2xl shadow-md border mb-8">
                <h2 className="text-2xl font-bold mb-5">Filter Vehicles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* TYPE */}
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                        className="border p-3 rounded-xl outline-none"
                    >
                        <option value="">
                            All Types
                        </option>

                        <option value="2W">
                            2 Wheeler
                        </option>

                        <option value="4W">
                            4 Wheeler
                        </option>
                    </select>
                    {/* FUEL TYPE */}
                    <select
                        name="fuelType"
                        value={filters.fuelType}
                        onChange={handleChange}
                        className="border p-3 rounded-xl outline-none"
                    >
                        <option value="">All Fuel Types</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="cng">CNG</option>
                    </select>
                    {/* PRICE */}
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        className="border p-3 rounded-xl outline-none"
                    />
                </div>
            </div>
        </>
    );
};

export default FilterBar;