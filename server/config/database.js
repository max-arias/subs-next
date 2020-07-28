module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'db'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'subtitles'),
        username: env('DATABASE_USERNAME', 'sub_user'),
        password: env('DATABASE_PASSWORD', 'sub_password'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
