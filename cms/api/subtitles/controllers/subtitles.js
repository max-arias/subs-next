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
    const { imdbId } = ctx.query;

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
    }

    console.log('mediaData', mediaData)
    console.log('extraInfo', extraInfo)

    return {
      status: mediaData ? 'success' : 'error',
      data: mediaData ? { ...mediaData, ...extraInfo } : null
    }

    // TODO: Store movie/tv data in DB


    // let entities;
    // if (ctx.query._q) {
    //   entities = await strapi.services.subtitles.search(ctx.query);
    // } else {
    //   entities = await strapi.services.subtitles.find(ctx.query);
    // }

    // return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.subtitles }));
  },
};
