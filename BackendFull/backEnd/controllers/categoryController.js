import Category from "../models/categoryModel.js";
import { errorHandler } from "../halpers/dbErrorHandler.js";

export function categoryById(req, res, next, id) {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        err: "Category Does not exists ",
      });
    }
    req.category = category;
    next();
  });
}

export function creatCategory(req, res) {
  const category = new Category(req.body);

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
}

export function readCategory(req, res) {
  return res.json(req.category);
}

export function updateCategory(req, res) {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json(data);
  });
}
export function deleteCategory(req, res) {
  const category = req.Category;

  Category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json({
      message: "Category delted Successfully ",
    });
  });
}
export function listOfCategory(req, res) {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json(data);
  });
}
