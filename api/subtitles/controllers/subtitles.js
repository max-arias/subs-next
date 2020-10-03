'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    const { imdbId, provider } = ctx.query;

    if (!imdbId || !provider) {
      return [];
    }

    let entities;

    // Fetch subtitles by provider and imdbId
    if (ctx.query._q) {
      entities = await strapi.services.subtitles.search(ctx.query);
    } else {
      entities = await strapi.services.subtitles.find(ctx.query);
    }

    // No subs, fetch third party by provider
    if (!entities.length && imdbId) {
      let subs = [];

      const subProviderPromises = provider.map((p) => {
        switch(p) {
          case 'opensubtitles':
            return strapi.services.opensubtitles.getSubs(imdbId);
          case 'yts':
            return strapi.services.yts.getSubs(imdbId);
          default:
            return null
        }
      });

      subs = await Promise.all(subProviderPromises)
      subs = subs.flat();

      // Create each sub in the DB
      const subPromises = subs.map(sub => {
        return strapi.services.subtitles.create(sub);
      });

      entities = await Promise.all(subPromises);
    }

    // Sanitize / serialize
    const subtitles = entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.subtitles })
    );

    // Sort by score if available
    subtitles.sort((a, b) => {
      if (!a.data || !a.data.score || !b.data || !b.data.score) {
        return -1;
      }

      return b.data.score - a.data.score
    });

    return subtitles;
  },
};
