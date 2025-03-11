'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useFirebase } from '@/context/FirebaseContext';

export default function FinderPage() {
  const [tagId, setTagId] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<{ type: 'error' | 'success' | ''; message: string }>({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const { db } = useFirebase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);
    
    try {
      // Validate the tagId exists (in a real app, you'd check against a database)
      if (!tagId.trim()) {
        throw new Error('Please enter a valid Tag ID');
      }
      
      // Save the message to Firestore
      await addDoc(collection(db, 'messages'), {
        tagId,
        message,
        name,
        contactEmail,
        location,
        timestamp: new Date(),
        read: false,
      });
      
      // Clear the form
      setTagId('');
      setMessage('');
      setName('');
      setContactEmail('');
      setLocation('');
      
      setStatus({
        type: 'success',
        message: 'Your message has been sent to the owner. They will contact you soon.',
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col p-4 md:p-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Found an OmpuTag?</h1>
        <p className="text-lg">
          Fill out this form to contact the owner and help return their item.
        </p>
      </div>
      
      {status.message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}
        >
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="tagId" className="block text-sm font-medium mb-1">
            Tag ID (found on the NFC tag)
          </label>
          <input
            id="tagId"
            type="text"
            value={tagId}
            onChange={(e) => setTagId(e.target.value)}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary-500 focus:ring focus:ring-primary-200"
            placeholder="Enter the tag ID"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message to Owner
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary-500 focus:ring focus:ring-primary-200"
            placeholder="Describe where you found the item, its condition, etc."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary-500 focus:ring focus:ring-primary-200"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
              Your Email
            </label>
            <input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary-500 focus:ring focus:ring-primary-200"
              placeholder="Your email address"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location Found (optional)
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary-500 focus:ring focus:ring-primary-200"
            placeholder="Where did you find the item?"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message to Owner'}
          </button>
        </div>
      </form>
    </div>
  );
} 