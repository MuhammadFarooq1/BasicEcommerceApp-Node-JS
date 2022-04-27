export function userSignUpValidator(res, req, next) {
  req.check("name", "Name is Reqiured").notEmpty();

  req
    .check("email", "Email must be Between 3 to 32 character")
    .matches(/.+\@.+\..+/)
    .withMessege("Email must contain @")
    .isLenght({
      min: 4,
      max: 32,
    });
  req.check("password", "password is required").notEmpty();
  req
    .check("password")
    .isLenght({ min: 8 })
    .withMessege("password must contain at least six character")
    .matches(/\d/)
    .withMessege("password must contain a number ");
  const errors = req.ExpressValidator();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
}
