"use strict";

// get unique error messge

const uniqueMessege = (console) => {
  let output;

  try {
    let feildName = error.messege.substring(
      error.meessege.lastIndexOf(".$") + 2,
      error.messege.lastIndexOf("_1")
    );
    output = feildName;
    //  feildName.charAt(0).toUpperCase() + feildName.slice(1) + "already exist ";
  } catch (error) {
    output = "Unique feild already exists ";
  }

  return output;
};

export function errorHandler  (error)  {
  let messege = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        messege = uniqueMessege(error);
        break;

      default:
        messege = "Some thing Went Wrong ";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].meessege)
        messege = error.errorors[errorName].meessege;
    }
  }
  return messege;
};
