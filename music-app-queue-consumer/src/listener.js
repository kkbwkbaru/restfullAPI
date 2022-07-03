class Listener {
  constructor(musicService, mailSender) {
    this._musicService = musicService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlist = await this._musicService.getPlaylist(playlistId);
      const song = await this._musicService.getSong(playlistId);

      const music = {
        playlists: {
          ...playlist,
          song,
        },
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(music)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
