'use strict';

/**
 * forum-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::forum-post.forum-post');
