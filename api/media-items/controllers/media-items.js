'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    const { imdbId } = ctx.query;

    let entities;

    if (ctx.query._q) {
      entities = await strapi.services['media-items'].search(ctx.query);
    } else {
      entities = await strapi.services['media-items'].find(ctx.query);
    }

    if (!entities.length && imdbId) {
      const mediaData = await strapi.services.themoviedb.findByIMDB(imdbId).then(data => {

        return Object.keys(data).map(key => {
          return data[key].map(item => ({...item, type: key.replace('_results', '') }))
        }).flat().filter(Boolean)[0]
      })

      let extraInfo = {}
      if (mediaData) {
        switch(mediaData.type) {
          case 'movie':
            extraInfo = await strapi.services.themoviedb.getDetailsById(mediaData.id, 'movie');
          break;
          case 'tv':
            extraInfo = await strapi.services.themoviedb.getDetailsById(mediaData.id, 'tv');
          break;
        }

        const dataToInsert = {
          imdbId,
          title: extraInfo.original_title,
          data: { ...mediaData, ...extraInfo },
          type: mediaData.type,
          movieDbId: extraInfo.id,
        }

        const newMediaItem = await strapi.services['media-items'].create(dataToInsert);
        entities = [newMediaItem];
      }
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['media-items'] }));
  },
};
