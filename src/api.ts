// src/api.ts
import type { RedirectData } from './types';

// IMPORTANT: Replace this with the Invoke URL from your API Gateway deployment.
const API_ENDPOINT = 'https://5wi9wpujda.execute-api.us-east-2.amazonaws.com/prod/redirects';

/**
 * Saves a new redirect entry to the backend via AWS API Gateway and Lambda.
 * @param redirectData The redirect data to save.
 */
export async function saveRedirectToBackend(redirectData: RedirectData): Promise<void> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(redirectData),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`API request failed with status ${response.status}: ${errorBody.message}`);
    }

    console.log('Successfully saved redirect to backend:', await response.json());
  } catch (error) {
    console.error('Error saving redirect to backend:', error);
    // You could add user-facing error notifications here if desired.
    // For now, the error is logged to the console, and the app continues to function locally.
    throw error; // Re-throw the error to be caught by the caller
  }
}