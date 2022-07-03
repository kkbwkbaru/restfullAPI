const { Pool } = require('pg');

class MusicService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query1 = {
      text: `SELECT playlists.id, playlists.name FROM playlists WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query1);

    return result.rows[0];
  }
  async getSong(playlistId) {
    const query2 = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
      JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query2);

    return result.rows;
  }
}

module.exports = MusicService;
