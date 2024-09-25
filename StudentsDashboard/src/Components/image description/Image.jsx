import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const Imagedesc = () => {
    const { id } = useParams();
    const [imagedata, setImagedata] = useState({});

    const getData = async () => {
        const ref = doc(firestore, "Events", id);
        const gData = await getDoc(ref);
        setImagedata(gData.data());
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    className="w-full h-96 object-cover object-center transition-transform duration-500 hover:scale-105"
                    src={imagedata.picture}
                    alt={imagedata.eventName}
                />
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">{imagedata.eventName}</h2>
                    <p className="text-gray-600 mb-4">{imagedata.eventDescription}</p>
                    <div className="mt-4">
                        <span className="block text-gray-700 font-semibold">Location:</span>
                        <p className="text-gray-600 italic">{imagedata.eventLocation}</p>
                    </div>
                    <div className="mt-2">
                        <span className="block text-gray-700 font-semibold">Date:</span>
                        <p className="text-gray-600 italic">{imagedata.eventDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Imagedesc;
