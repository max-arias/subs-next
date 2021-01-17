'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

//TODO: Clean all this up...

module.exports = {
  async find(ctx) {
    const { imdbId, tvId, seasonNum } = ctx.query;

    let entities = [];

    if (tvId && seasonNum && imdbId) {
      entities = await strapi.services['media-items'].find({ tvId, seasonNum });

      if (!entities.length) {
        const tvSeries = await strapi.services['media-items'].find({ imdbId });

        const mediaData = await strapi.services.themoviedb.getSeasonEpisodes(
          tvId,
          seasonNum
        );

        if (mediaData.episodes.length) {
          const episodePromises = mediaData.episodes.map(async item => {
            const dataToInsert = {
              title: item.name,
              data: item,
              type: 'tv',
              tvId: tvSeries[0].tvId,
              seasonNum,
              episodeNum: item.episode_number,
            };

            return await strapi.services['media-items'].create(dataToInsert);
          });

          entities = await Promise.all(episodePromises);
        }
      }
    } else if (imdbId) {
      entities = await strapi.services['media-items'].find({ imdbId });

      if (!entities.length) {
        // Find media by IMDB ID
        const mediaData = await strapi.services.themoviedb
          .findByIMDB(imdbId)
          .then(data => {
            return Object.keys(data)
              .map(key => {
                return data[key].map(item => ({
                  ...item,
                  type: key.replace('_results', ''),
                }));
              })
              .flat()
              .filter(Boolean)[0];
          });

        // Fetch extra data the external Id endpoint doesnt return
        let extraInfo = {};
        if (mediaData) {
          switch (mediaData.type) {
            case 'movie':
              extraInfo = await strapi.services.themoviedb.getDetailsById(
                mediaData.id,
                'movie'
              );
              break;
            case 'tv':
              extraInfo = await strapi.services.themoviedb.getDetailsById(
                mediaData.id,
                'tv'
              );
              break;
          }

          const dataToInsert = {
            imdbId,
            title: mediaData.name || extraInfo.original_title,
            data: { ...mediaData, ...extraInfo },
            type: mediaData.type,
            tvId: mediaData.id,
          };

          const newMediaItem = await strapi.services['media-items'].create(
            dataToInsert
          );

          entities = [newMediaItem];
        }
      }
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models['media-items'] })
    );
  },
};
