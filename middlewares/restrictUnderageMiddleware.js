
const restrictForUnderage = (req, res, next) => {
    const user = req.user; 
    if (user.age < 18) req.query.rating = { $ne: "R" };
    next();
  };

module.exports = restrictForUnderage;
