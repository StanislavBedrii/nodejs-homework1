const handleError = (error) => {
  console.error(error.message);
  process.exit(1);
};

module.exports = handleError;
