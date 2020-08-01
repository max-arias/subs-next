'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async suggestion(ctx) {
    const { keywords } = ctx.params;
    return strapi.services.omdb.search(keywords);
  },
  async find(ctx) {

      let entities;
      if (ctx.query._q) {
        entities = await strapi.services.subtitles.search(ctx.query);
      } else {
        entities = await strapi.services.subtitles.find(ctx.query);
      }
      
      console.log(ctx)
  
      return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.subtitles }));
  },
};
