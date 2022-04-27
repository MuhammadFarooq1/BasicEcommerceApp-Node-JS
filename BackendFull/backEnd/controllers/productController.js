import formidable from "formidable";
import _ from "lodash";
import fs from "fs";
import Product from "../models/productModel.js";
import { errorHandler } from "../halpers/dbErrorHandler.js";
import exp from "constants";
import { error } from "console";

export function creatProduct(req, res) {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        err: "Image couled not be uploaded",
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        err: "All fields are reqiured",
        // err: errorHandler(err),
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      // check the size of the photo
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          err: "Image size must be less then 1mb",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
}

export function productById(req, res, next, productId) {
  Product.findById(productId)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          err: "Product Not Find ",
        });
      }
      req.Product = product;
      next();
    });
}

export function readProduct(req, res) {
  req.Product.photo = undefined;
  return res.json(req.Product);
}

export function removeProduct(req, res) {
  let product = req.Product;
  product.remove((err, deleteedProduct) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json({
      // deleteedProduct,
      message: "Product deleted Successfully",
    });
  });
}

export function updateProduct(req, res) {
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        err: "Image couled not be uploaded",
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        err: "All fields are reqiured",
        // err: errorHandler(err),
      });
    }

    let product = req.Product;
    product = _.extend(product, fields);

    if (files.photo) {
      // check the size of the photo
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          err: "Image size must be less then 1mb",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
}

/*
// sell / ARRIVAL
// bysell = /productS?orderBy=sold&order=desc&limit=4
//by arival = /productS?orderBy=ceatedAt&order=desc&limit=4
// if no param sent all products 

*/

export function listOfProducts(req, res) {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .populate(Product.category)
    .select("-photo")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: "Products not found ",
        });
      }
      res.json(products);
    });
}

/*
// listOfRelatedProducts

*   it will find the products based on request product category
*   other products that have the ssame category, wil be return 
*/

export function listOfRelatedProducts(req, res) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({
    _id: { $ne: req.Product },
    category: req.Product.category,
  })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          err: "Related Products not found ",
        });
      }
      res.json(products);
    });
}

export function listOfcategories(req, res) {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        err: "Related Categories not found ",
      });
    }
    res.json(categories);
  });
}

/*
Copy the code below for productsBySearch(), you might need it for next lecture.</h4><p><br></p><pre class="prettyprint linenums">/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

export function productListBySearch(req, res) {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          err: " Products not found ",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
}

// fetchPhoto from db

export function fetchPhoto(req, res, next) {
  if (req.Product.photo.data) {
    res.set("Content-Type", req.Product.photo.contentType);
    return res.send(req.Product.photo.data);
  }
  next();
}

export function listOfSearchedProduct(req, res) {
  // create query object to hold search and category value
  const query = {};

  // assign search value to query .name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
}
