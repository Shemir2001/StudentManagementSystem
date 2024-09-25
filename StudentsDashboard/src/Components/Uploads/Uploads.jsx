import React, { useState } from 'react';
import {app} from '../../firebase/Firebase'
import { firestore, storage } from '../../firebase/Firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const EventForm = () => {
  const [formState, setFormState] = useState({
    eventName: '',
    eventDate: '',
    eventDescription: '',
    location: '',
    picture: '',
  });
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const addData = async () => {
    try {
      if (image) {
        const imageRef = ref(storage, `profilePictures/${image.name}`);
        await uploadBytes(imageRef, image);

        const profilePictureUrl = await getDownloadURL(imageRef);

      
        await addDoc(collection(firestore, 'Events'), {
          eventName: formState.eventName,
          eventDate: formState.eventDate,
          eventDescription: formState.eventDescription,
          location: formState.location,
          picture: profilePictureUrl, 
        });

    
        setFormState({
          eventName: '',
          eventDate: '',
          eventDescription: '',
          location: '',
          picture: '',
        });
      
        setSuccessMessage('Event Added Successfully');
        setTimeout(() => {
          setSuccessMessage('');
        
        }, 2000);
      } else {
        console.error('Image is missing');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={formState.eventName}
              onChange={handleChange}
              id="eventName"
              placeholder="Enter event name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              value={formState.eventDate}
              onChange={handleChange}
              id="eventDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
              Event Description
            </label>
            <textarea
              name="eventDescription"
              value={formState.eventDescription}
              onChange={handleChange}
              id="eventDescription"
              rows="3"
              placeholder="Enter event description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleChange}
              id="location"
              placeholder="Enter location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
              Picture
            </label>
            <input
              type="file"
              name="picture"
              onChange={handleImageChange}
              id="picture"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <div className="text-green-500 text-center">{successMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
