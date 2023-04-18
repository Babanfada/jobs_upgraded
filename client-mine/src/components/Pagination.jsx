import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/alljobs/allJobsSlice";

export default function PaginationControlled() {
  const { totalJobs, numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    event.preventDefault();
    console.log("change");
    dispatch(changePage(value));
  };

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        showFirstButton
        color="primary"
        variant="outlined"
        shape="rounded"
        count={numOfPages}
        onChange={handleChange}
      />
    </Stack>
  );
}
