'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    const { keyword } = ctx.query;

    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.suggestions.search(ctx.query);
    } else {
      entities = await strapi.services.suggestions.find(ctx.query);
    }

    if (!entities.length && keyword) {
      const data = await strapi.services.omdb.search(keyword);
      const newSuggestion = await strapi.services.suggestions.create({ keyword, data });
      entities = [newSuggestion];
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.suggestions }));
  }
};
