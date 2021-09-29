const sortHelper = {
    'recent': arr => arr.sort((a, b) => b.iat - a.iat),
    'oldest': arr => arr.sort((a, b) => a.iat - b.iat),
    'most-liked': arr => arr.sort((a, b) => b.likes.length - a.likes.length),
    'least-liked': arr => arr.sort((a, b) => a.likes.length - b.likes.length),
    'most-commented': arr => arr.sort((a, b) => b.comments.length - a.comments.length)
};

export default sortHelper;