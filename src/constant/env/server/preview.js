const static_server = 'https://playeroneworld.s3.ap-southeast-1.amazonaws.com';

module.exports = {
  server: 'https://api.playerone.world',
  static_server,
  editor_static_server: `${static_server}/editor_static`,
  preview_static_server: `${static_server}/preview_static`,
  role_player_server: `${static_server}/role_player`,
  video_server: 'https://res.playerone.world'
};
