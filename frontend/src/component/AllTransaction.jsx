import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { SHOW_TRANSACTIONS } from "../service/service";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionData = await SHOW_TRANSACTIONS();
        setTransactions(transactionData);
      } catch (error) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const sortedTransactions = transactions.sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  if (loading) {
    return (
      <Typography variant="body2" color="textSecondary">
        Loading transaction details...
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(182, 0, 182, 0.212)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Button variant="contained" sx={{ m: 2, backgroundColor: "black" }}>
          <Link to="/Admin" style={{ color: "white", textDecoration: "none" }}>
            Back{" "}
          </Link>
        </Button>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Transaction Details
        </Typography>

        <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
          <InputLabel>Sort By Date</InputLabel>
          <Select value={sortOrder} onChange={handleSortOrderChange} label="Sort By Date">
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        {currentTransactions.length > 0 ? (
          <Grid container spacing={3}>
            {currentTransactions.map((transaction) => (
              <Grid item xs={12} sm={6} md={4} key={transaction.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Transaction ID: {transaction.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Full Name: {transaction.fullname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Address: {transaction.deliveryAddress}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount: {transaction.amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {transaction.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Currency: {transaction.currency}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created At: {new Date(transaction.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      User ID: {transaction._id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No transaction details available.
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Pagination
          count={Math.ceil(transactions.length / transactionsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 4 }}
        />
      </Box>
    </>
  );
};

export default AllTransactions;
