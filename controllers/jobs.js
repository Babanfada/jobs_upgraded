const Job = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const moment = require("moment");
const {
  BadRequestError,
  UnauthenticatedError,
  notFoundError,
} = require("../errors");

const allJobs = async (req, res) => {
  const { search, status, jobType, sort, limit, page } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  let result = Job.find(queryObject);

  if (sort === "oldest") {
    result.sort("createdAt");
  }
  if (sort === "latest") {
    result.sort("-createdAt");
  }
  if (sort === "a-z") {
    result.sort("position");
  }
  if (sort === "z-a") {
    result.sort("-position");
  }

  const limits = Number(limit) || 10;
  const pages = Number(page) || 1;
  //  const page = Number(req.query.page) || 1;
  const skip = (pages - 1) * limit;

  result = result.skip(skip).limit(limits);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limits);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const getSingleJob = async (req, res) => {
  console.log(req.user);
  const { id: JobId } = req.params;
  const { id: userId } = req.user;
  const Job = await Job.findById({ _id: JobId, createdBy: userId });
  if (!Job) {
    throw new notFoundError(`The job with the id of ${JobId} can not be found`);
  }
  res.status(StatusCodes.OK).json({ Job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id: JobId } = req.params;
  const { id: userId } = req.user;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError(`Company and Position Fields can not be empty`);
  }
  const updatedJob = await Job.findByIdAndUpdate(
    { _id: JobId, createdBy: userId },
    req.body,
    { new: true, runValidator: true }
  );

  res.status(StatusCodes.OK).json({ updatedJob });
};
const deleteJob = async (req, res) => {
  const { id: JobId } = req.params;
  const { id: userId } = req.user;
  const deletedJob = await Job.findByIdAndRemove({
    _id: JobId,
    createdBy: userId,
  });
  res.status(StatusCodes.OK).send(`${JobId} successfully deleted`);
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  // the above code is literally going to return an array of object
  // [{_id:"pending", count:24}, {_id:"declined", count:"30"}, {_id:"interview", count:39}]

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  // console.log(stats);
  // this codes transform the array of objects returned by the MongoDB aggregation pipeline into a single object with the status values as keys and the counts as values.{pending:30,interview:40,declined:10}
  // NB Yes, acc["title"] and acc.title are equivalent and both expressions access the value of the 'title' property on the acc object.In JavaScript, object properties can be accessed using either dot notation (e.g. object.property) or bracket notation (e.g. object["property"]). The dot notation is more concise and easier to read, while the bracket notation allows for property names to be generated dynamically at runtime, as in the case of acc[title].
  // you can use the dot notation on an array, just like you can use the square bracket notation on an object

  // When accessing an array element using dot notation, the array index is treated as a property name. For example, given an array myArray with elements [10, 20, 30], the expression myArray.0 is equivalent to myArray[0], which retrieves the first element of the array (i.e. 10).However, it is generally not recommended to use dot notation to access array elements, since it can be confusing and misleading, and can lead to unexpected behavior in certain cases. It is better to use the standard square bracket notation to access array elements by index.
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  // console.log(defaultStats);
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    // we are using mongoose.Types here because (req.user.userId) is a string and it needs to be a mongoose object
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  console.log(monthlyApplications);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  console.log(monthlyApplications);
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  allJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
};

// it is better to handle pagination on the server than on the frontend, it makes your app more efficient bc less info are being sent over the wire
