import { useCallback, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type setLatLng = {
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLong: React.Dispatch<React.SetStateAction<number>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

const SearchLocation = ({ setLat, setLong, location, setLocation }: setLatLng) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [suggestions, setSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);

  const handleSubmit = useCallback(async () => {
    if (!location) return;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setLat(parseFloat(lat));
      setLong(parseFloat(lon));
    } else {
      alert("Location not found!");
    }
    setLocation("");
    setSuggestions([]);
    setShowSearchBox(false);
  }, [location, setLat, setLong]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1`);
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (suggestions: { display_name: string; lat: string; lon: string }) => {
    setLat(parseFloat(suggestions.lat));
    setLong(parseFloat(suggestions.lon));
    setSuggestions([]);
    setLocation("");
    setShowSearchBox(false);
  };
  return (
    <div className="fixed top-20 left-2 z-[9999] w-full">
      <FaMagnifyingGlass
        size={30}
        color="#232323"
        className="transition-all cursor-pointer absolute z-[99999] opacity-80 top-3 left-2"
        onClick={() => {
          setShowSearchBox((prev) => !prev);
        }}
      />
      {showSearchBox && (
        <>
          <div
            className="flex items-center justify-start gap-5 w-full  
        transition-all animate-enterBox"
          >
            <input
              type="text"
              className="pl-12 font-semibold text-black py-4 rounded-sm lg:w-[30%] md:w-[80%] w-full border-none ring-1
           focus:outline-none focus:ring-2 ring-blue-950 opacity-90 transition-all "
              placeholder="Enter city, country, street..."
              value={location}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <button
              className="py-4 px-7 rounded-sm outline-none bg-blue-700 text-white opacity-90 cursor-pointer
          ring-1 hover:ring-2 ring-blue-950 transition-all"
              onClick={handleSubmit}
            >
              Confrim
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul
              className="list-none bg-gray-50 lg:w-[30%] md:w-[80%] w-full mt-2
            overflow-y-auto max-h-[40vh]"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  onClick={() => handleSuggestionClick(suggestion)}
                  key={index}
                  className=" cursor-pointer hover:bg-gray-200 pt-3 px-3 transition-all"
                >
                  <span className=" w-full">{suggestion.display_name}</span>
                  <hr className="mt-3" />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SearchLocation;
