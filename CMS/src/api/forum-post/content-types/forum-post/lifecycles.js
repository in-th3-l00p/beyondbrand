const slugify = require('../../../../utils/slugify');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.title) {
      data.slug = slugify(data.title);
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.title) {
      data.slug = slugify(data.title);
    }
  },
};
