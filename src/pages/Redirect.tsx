
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { trackClickAndRedirect } from '@/utils/urlShortener';

const Redirect = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortCode) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const url = await trackClickAndRedirect(shortCode);
        
        if (url) {
          setRedirectUrl(url);
          // Redirect after a short delay to ensure tracking is completed
          setTimeout(() => {
            window.location.href = url;
          }, 100);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Redirect error:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Weiterleitung...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Sie werden weitergeleitet...</p>
        {redirectUrl && (
          <p className="text-sm text-gray-500 mt-2">
            Falls die Weiterleitung nicht funktioniert, <a href={redirectUrl} className="text-blue-600 underline">klicken Sie hier</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Redirect;
