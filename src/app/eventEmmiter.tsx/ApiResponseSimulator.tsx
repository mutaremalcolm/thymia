import React, { useEffect, useState } from 'react';
import { gameEventEmitter, APIResponsePayload } from '../eventEmmiter.tsx/api';

const ApiResponseSimulator: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleApiResponse = (response: APIResponsePayload) => {
      setResponseMessage(response.message);
    };

    // Listen for 'apiResponse' events
    gameEventEmitter.on('apiResponse', handleApiResponse);

    return () => {
      // Clean up the event listener
      gameEventEmitter.off('apiResponse', handleApiResponse);
    };
  }, []);

  return (
    <div className="mt-4 text-center">
      {responseMessage && (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">API Response:</p>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ApiResponseSimulator;
