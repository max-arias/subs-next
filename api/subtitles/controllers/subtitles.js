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

      switch(provider) {
        case 'opensubtitles':
          subs = await strapi.services.opensubtitles.getSubs(imdbId);
          break;
        case 'yts':
          subs = await strapi.services.yts.getSubs(imdbId);
          console.log('yts subs', subs)
          break;
      }

      // Create each sub in the DB
      const subPromises = subs.map(sub => strapi.services.subtitles.create);
      entities = await Promise.all(subPromises);
    }

    // Sanitize / serialize
    const subtitles = entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.subtitles })
    );

    // Sort by score if available
    subtitles.sort((a, b) => b.data.score - a.data.score)

    return subtitles;
  },
};
