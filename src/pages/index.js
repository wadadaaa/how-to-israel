import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function CitiesList() {
  const city_name_he_key = 'שם_ישוב';
  const city_name_en_key = 'שם_ישוב_לועזי';

  const [cities, setCities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    // Fetch the initial set of cards
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {
      resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
      limit: 2000,
    };
    const response = await fetch(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=${params.resource_id}&limit=${params.limit}`
    );
    const res = await response.json();

    // Update the state with the fetched cards
    setCities([...cities, ...res.result.records]);

    // Update the state to indicate whether there are more cards to fetch
    setHasMore(res.length > 0);
  };

  useEffect(() => {
    // Filter cities based on the search term
    setFilteredCities(
      cities.filter((city) =>
        city[city_name_en_key].toLowerCase().includes(searchTerm.toLowerCase()) || city[city_name_he_key].toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [cities, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <InfiniteScroll
      dataLength={cities.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="container md:container md:mx-auto">
        <header className="p-6 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">How to in Israel</h1>
            <p className="text-lg font-light">Cities rating</p>
            <div className="filter">
              <input
                type="text"
                className="border border-gray-500 p-2"
                placeholder="Search for a city"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-5 gap-4">
          {filteredCities.map((city) =>
            city[city_name_en_key].trim().length !== 0 && (
            <div key={city._id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1500990702037-7620ccb6a60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80/500x300"
                  alt={city[city_name_en_key]}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">
                    {city[city_name_en_key]}
                  </div>
                  <p className="text-gray-700 text-base text-center">
                    <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                      <span className="relative text-white">{city[city_name_he_key]}</span>
                    </span>
                    </p>
              </div>
              <div className="px-6 py-4">
              </div>
            </div>
          ))}
      </div>
      </div>
    </InfiniteScroll>
  );
}

export default CitiesList;
