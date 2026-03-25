// Base URL for the backend API
const API_BASE_URL = 'http://localhost:5066';

/**
 * Reusable fetch wrapper to reduce code duplication (DRY Principle)
 * Handles common fetch boilerplate and error checking
 * 
 * @param {string} endpoint - The API endpoint (e.g., '/games')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - Parsed JSON response
 * @throws {Error} - If response is not ok
 */
const fetchWrapper = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options, // Spread custom options to override defaults if needed
  });

  if (!response.ok) {
    const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  // Only parse JSON if there's a body in the response
  return response.status !== 204 ? response.json() : null;
};

/**
 * Games API Service
 * Provides all CRUD operations for games
 * 
 * CRUD = Create, Read, Update, Delete
 * This is a common pattern for API operations
 */
export const gamesApi = {
  // ========== READ Operations ==========

  /**
   * Fetch all games from the backend
   * GET /games
   * 
   * @returns {Promise<Array>} - Array of game objects
   */
  getAll: async () => {
    return fetchWrapper('/games');
  },

  /**
   * Fetch a single game by ID
   * GET /games/{id}
   * 
   * @param {number} id - The game ID to fetch
   * @returns {Promise<object>} - Game object with details
   */
  getById: async (id) => {
    return fetchWrapper(`/games/${id}`);
  },

  // ========== CREATE Operations ==========

  /**
   * Create a new game
   * POST /games
   * 
   * @param {object} gameData - Game object with name, genreId, price, releaseDate
   * @returns {Promise<object>} - Created game object with assigned ID
   */
  create: async (gameData) => {
    return fetchWrapper('/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  },

  // ========== UPDATE Operations ==========

  /**
   * Update an existing game
   * PUT /games/{id}
   * 
   * @param {number} id - The game ID to update
   * @param {object} gameData - Updated game data
   * @returns {Promise<boolean>} - True if successful (no content returned)
   */
  update: async (id, gameData) => {
    const result = await fetchWrapper(`/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify(gameData),
    });
    return result !== null; // Returns true for 204 No Content responses
  },

  // ========== DELETE Operations ==========

  /**
   * Delete a game by ID
   * DELETE /games/{id}
   * 
   * @param {number} id - The game ID to delete
   * @returns {Promise<boolean>} - True if successful (no content returned)
   */
  delete: async (id) => {
    const result = await fetchWrapper(`/games/${id}`, {
      method: 'DELETE',
    });
    return result !== null; // Returns true for 204 No Content responses
  },
};

/**
 * Usage Examples:
 * 
 * // Get all games
 * const games = await gamesApi.getAll();
 * 
 * // Get a specific game
 * const game = await gamesApi.getById(1);
 * 
 * // Create a new game
 * const newGame = await gamesApi.create({
 *   name: 'Elden Ring',
 *   genreId: 1,
 *   price: 59.99,
 *   releaseDate: '2022-02-25'
 * });
 * 
 * // Update a game
 * await gamesApi.update(1, {
 *   name: 'Updated Name',
 *   genreId: 2,
 *   price: 49.99,
 *   releaseDate: '2022-02-25'
 * });
 * 
 * // Delete a game
 * await gamesApi.delete(1);
 */

/**
 * Genres API Service
 * Provides CRUD operations for game genres
 */
export const genresApi = {
  /**
   * Fetch all available genres
   * GET /genres
   * 
   * @returns {Promise<Array>} - Array of genre objects with id and name
   */
  getAll: async () => {
    return fetchWrapper('/genres');
  },
};
