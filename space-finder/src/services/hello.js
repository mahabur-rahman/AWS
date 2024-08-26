exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello!, i will read from ${process.env.TABLE_NAME}`),
  };
};
