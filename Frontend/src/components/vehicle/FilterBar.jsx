const FilterBar = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* SEARCH */}
                <input
                    type="text"
                    name="search"
                    placeholder="Search vehicles"
                    value={filters.search}
                    onChange={handleChange}
                    className="border border-[#D6EFE3] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#B0E4CC]"
                />
                {/* TYPE */}
                <select
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="border border-[#D6EFE3] p-3 rounded-xl outline-none"
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
                    className="border border-[#D6EFE3] p-3 rounded-xl outline-none"
                >
                    <option value="">
                        Fuel Type
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
                {/* TRANSMISSION */}
                <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleChange}
                    className="border border-[#D6EFE3] p-3 rounded-xl outline-none"
                >
                    <option value="">
                        Transmission
                    </option>
                    <option value="manual">
                        Manual
                    </option>

                    <option value="automatic">
                        Automatic
                    </option>
                </select>
                {/* PRICE */}
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    className="border border-[#D6EFE3] p-3 rounded-xl outline-none"
                />
                {/* SORT */}
                <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleChange}
                    className="border border-[#D6EFE3] p-3 rounded-xl outline-none"
                >
                    <option value="">
                        Sort By
                    </option>
                    <option value="lowToHigh">
                        Price: Low to High
                    </option>
                    <option value="highToLow">
                        Price: High to Low
                    </option>
                </select>

            </div>
        </>
    );
};

export default FilterBar;