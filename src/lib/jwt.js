module.exports = {
  expire(exp) {
    return exp ? Date.now() < exp : null;
  }
};
