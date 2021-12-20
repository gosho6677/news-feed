const sortHelper = {
    'recent': (ids, entities) => ids.sort((a, b) => entities[b].iat - entities[a].iat),
    'oldest': (ids, entities) => ids.sort((a, b) => entities[a].iat - entities[b].iat),
    'most-liked': (ids, entities) => ids.sort((a, b) => entities[b].likes.length - entities[a].likes.length),
    'least-liked': (ids, entities) => ids.sort((a, b) => entities[a].likes.length - entities[b].likes.length),
    'most-commented': (ids, entities) => ids.sort((a, b) => entities[b].comments.length - entities[a].comments.length)
};

export default sortHelper;