import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/Firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getData = async () => {
    const reference = collection(firestore, 'Events');
    const dataGet = await getDocs(reference);
    const actualData = dataGet.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(actualData);
  };

  useEffect(() => {
    getData();
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
   
    <div className="p-6 ml-11 mt-11  mr-11 -mb-10  min-h-screen overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((event) => (
          <div key={event.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg w-full h-48 object-cover" src={event.picture} alt={event.eventName} />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.eventName}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 h-16 overflow-hidden text-ellipsis whitespace-nowrap">
                {event.eventDescription}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Location: {event.location}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: {event.eventDate}</p>
              <Link to={`/image/${event.id}`}>
                <button className="inline-flex items-center mt-3 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-6 ">
        <span className="text-md text-white dark:text-gray-400">
          Showing <span className="font-semibold text-white dark:text-white">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-white dark:text-white">
            {Math.min(startIndex + itemsPerPage, events.length)}
          </span>{' '}
          of <span className="font-semibold text-white dark:text-white">{events.length}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'
            } rounded-s`}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white ${
              currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'
            } rounded-e`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    
    );
};

export default Gallery;
