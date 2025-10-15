import React, { useState, useEffect } from 'react';
import publicService from '../services/publicService';

function AboutPage() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    publicService.getSettings().then(res => setSettings(res.data));
  }, []);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {settings.about_title || 'Cerita Kami'}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {settings.about_content || 'Konten tentang kami akan muncul di sini.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;