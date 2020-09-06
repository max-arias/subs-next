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
      entities = await strapi.services.subtitles.search(ctx.query);
    } else {
      entities = await strapi.services.subtitles.find(ctx.query);
    }

    if (!entities.length && imdbId) {
      const subs = await strapi.services.opensubtitles.getSubs(imdbId);

      const subPromises = subs.map(sub =>
        strapi.services.subtitles.create({
          ...sub,
          provider: 'opensubtitles',
        })
      );

      entities = await Promise.all(subPromises);
    }

    const subtitles = entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.subtitles })
    );

    subtitles.sort((a, b) => b.data.score - a.data.score)

    console.log('subtitles', JSON.stringify(subtitles, null, 2))

    return subtitles;
  },
};
