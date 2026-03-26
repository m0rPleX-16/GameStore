import { useState, useEffect } from 'react'
import { gamesApi } from './services/api'
import { genresApi } from './services/api'
import './App.css'

function App() {
  // ========== Game List State ==========
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  // ========== Form State ==========
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    genreId: 1,
    price: '',
    releaseDate: '',
  })

  // ========== Load Games and Genres on Component Mount ==========
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchAllGames(), fetchAllGenres()])
    }
    loadData()
  }, [])

  /**
   * Fetch all games from the backend
   */
  const fetchAllGames = async () => {
    try {
      setLoading(true)
      const data = await gamesApi.getAll()
      setGames(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch games:', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Fetch all genres from the backend
   */
  const fetchAllGenres = async () => {
    try {
      const data = await genresApi.getAll()
      setGenres(data)
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, genreId: data[0].id }))
      }
    } catch (err) {
      console.error('Failed to fetch genres:', err)
    }
  }

  /**
   * Handle form changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'genreId' ? Number(value) : value,
    }))
  }

  /**
   * Handle form submission (CREATE or UPDATE)
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // UPDATE existing game
        await gamesApi.update(editingId, formData)
        setMessage('✅ Game updated successfully!')
      } else {
        // CREATE new game
        await gamesApi.create(formData)
        setMessage('✅ Game created successfully!')
      }
      resetForm()
      await fetchAllGames()
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setError(err.message)
      console.error('Failed to save game:', err)
    }
  }

  /**
   * Open edit form with game data (fetches details to get genreId)
   */
  const handleEdit = async (game) => {
    try {
      const details = await gamesApi.getById(game.id)
      setEditingId(details.id)
      setFormData({
        name: details.name,
        genreId: details.genreId,
        price: details.price,
        releaseDate: details.releaseDate.split('T')[0],
      })
      setShowForm(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message)
      console.error('Failed to load game details:', err)
    }
  }

  /**
   * Delete a game
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await gamesApi.delete(id)
        setMessage('✅ Game deleted successfully!')
        await fetchAllGames()
        setTimeout(() => setMessage(null), 3000)
      } catch (err) {
        setError(err.message)
        console.error('Failed to delete game:', err)
      }
    }
  }

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      name: '',
      genreId: genres.length > 0 ? genres[0].id : 1,
      price: '',
      releaseDate: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  /**
   * Get genre name by ID
   */
  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId)
    return genre ? genre.name : 'Unknown'
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 GameStore</h1>
        <p className="subtitle">Manage your gaming collection</p>
      </header>

      <div className="app-container">
        {/* Status Messages */}
        {error && (
          <div className="alert alert-error">
            ❌ {error}
            <button onClick={() => setError(null)} className="alert-close">×</button>
          </div>
        )}
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {/* Create New Game Button */}
        <div className="form-toggle">
          <button
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className={`btn btn-primary ${showForm ? 'active' : ''}`}
          >
            {showForm ? '✕ Cancel' : '+ Add New Game'}
          </button>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="form-container">
            <h2>{editingId ? '✏️ Edit Game' : '➕ Create New Game'}</h2>
            <form onSubmit={handleSubmit} className="game-form">
              <div className="form-group">
                <label htmlFor="name">Game Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter game name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="genreId">Genre *</label>
                  <select
                    id="genreId"
                    name="genreId"
                    value={formData.genreId}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price ($) *</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="releaseDate">Release Date *</label>
                <input
                  id="releaseDate"
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingId ? '💾 Update Game' : '✓ Create Game'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Games Grid */}
        <div className="games-section">
          <h2>Games Library ({games.length})</h2>
          {loading ? (
            <div className="loading">
              <p>⏳ Loading games...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="empty-state">
              <p>📭 No games found</p>
              <p>Click "Add New Game" to get started!</p>
            </div>
          ) : (
            <div className="games-grid">
              {games.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="game-header">
                    <h3>{game.name}</h3>
                    <span className="game-id">#{game.id}</span>
                  </div>

                  <div className="game-info">
                    <div className="info-row">
                      <span className="label">Genre:</span>
                      <span className="value genre-badge">{game.genre}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Price:</span>
                      <span className="value price">${game.price.toFixed(2)}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Released:</span>
                      <span className="value">{new Date(game.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="game-actions">
                    <button
                      onClick={() => handleEdit(game)}
                      className="btn btn-edit"
                      title="Edit game"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="btn btn-delete"
                      title="Delete game"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
