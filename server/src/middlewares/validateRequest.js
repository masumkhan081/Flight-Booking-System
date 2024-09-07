const validateRequest = (requestBodySchema) => async (req, res, next) => {
  try {

    console.log("bdy  ::    " + JSON.stringify(req.body));

    const validatedData = requestBodySchema.safeParse(req.body);
    console.log("validatedData::    " + JSON.stringify(validatedData));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;
