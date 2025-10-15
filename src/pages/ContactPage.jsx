import React, { useState, useEffect } from 'react';
import publicService from '../services/publicService';

function ContactPage() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    publicService.getSettings().then(res => setSettings(res.data));
  }, []);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {settings.contact_title || 'Hubungi Kami'}
        </h1>
        <p className="text-gray-600 mt-2 mb-10 max-w-2xl mx-auto">
          {settings.contact_tagline || 'Kami siap membantu Anda.'}
        </p>
        <div className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md space-y-4 text-left">
          <p><strong>Alamat:</strong> {settings.contact_address}</p>
          <p><strong>Email:</strong> {settings.contact_email}</p>
          <p><strong>Telepon:</strong> {settings.contact_phone}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;