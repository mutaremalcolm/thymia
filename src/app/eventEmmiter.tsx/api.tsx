import EventEmitter from 'events';

// Define the type for API response payload
export interface APIResponsePayload {
  success: boolean;
  message: string;
}

class GameEventEmitter extends EventEmitter {}

const gameEventEmitter = new GameEventEmitter();

export { gameEventEmitter, };
