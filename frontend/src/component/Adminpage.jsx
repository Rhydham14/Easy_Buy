import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Box,
  TextField,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import StoreIcon from "@mui/icons-material/Store";
import Navbar from "react-bootstrap/Navbar";
import Pagination from "@mui/material/Pagination";
import Spinner from "react-bootstrap/Spinner"; // Import Bootstrap Spinner
import {
  ADD_PRODUCT,
  FETCH_DATA,
  UPDATE_PRODUCT,
  SHOW_TRANSACTIONS,
  REMOVE_PRODUCT_DATA, // Import REMOVE_PRODUCT_DATA
} from "../service/service";
import "../css/Loader.css"; // Import loader CSS
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Confirmation dialog state
  const [productToRemove, setProductToRemove] = useState(null); // Product to be removed
  const [transactions, setTransaction] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const itemsPerPage = 8;

  const handleOpen = () => {
    setEditMode(false);
    setNewProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      image: null,
    });
    setOpen(true);
  };

  const handleEditOpen = (index) => {
    setCurrentProductIndex(index);
    setNewProduct(products[index]);
    setEditMode(true);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleConfirmationClose = () => setConfirmationOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image);

    try {
      const response = await ADD_PRODUCT(formData);
      console.log("Response data:", response.message);
      // const { message } = response.data;
      if (response && response.message) {
        // Successful product addition
        setProducts((prev) => [...prev, newProduct]);
        setSnackbarOpen(true); // Display success snackbar
        handleClose();
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("An error occurred. Please try again.", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FETCH_DATA();
        setProducts(data);
        const transaction = await SHOW_TRANSACTIONS();
        setTransaction(transaction);
      } catch (error) {
        setError("An error occurred while fetching the data."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchData();
  }, []);

  const handleEditProduct = async () => {
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image);

    try {
      const productId = products[currentProductIndex]._id;
      await UPDATE_PRODUCT(productId, formData);
      const updatedProducts = products.map((product, index) =>
        index === currentProductIndex ? { ...product, ...newProduct } : product
      );
      setProducts(updatedProducts);
      handleClose();
    } catch (error) {
      console.error("An error occurred. Please try again.", error);
      setError(
        "An error occurred while updating the product. Please try again."
      ); 
    }
  };

  const confirmRemoveProduct = (index) => {
    setProductToRemove(index);
    setConfirmationOpen(true);
  };

  const handleRemoveProduct = async () => {
    try {
      const productId = products[productToRemove]._id; 
      await REMOVE_PRODUCT_DATA(productId);
      setProducts((prev) => prev.filter((_, i) => i !== productToRemove));
      setProductToRemove(null);
      setConfirmationOpen(false);
    } catch (error) {
      console.error("Failed to remove product", error);
      setError(
        "An error occurred while removing the product. Please try again."
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "rgba(182, 0, 182, 0.212)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Navbar.Brand href="/" style={{ fontSize: 30, color: "purple" }}>
          <StoreIcon style={{ fontSize: 40, color: "purple" }} />
          easyBuy
          <Typography variant="h3" align="center" color="black" gutterBottom>
            Welcome Admin
          </Typography>
        </Navbar.Brand>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3">Your Profile</Typography>
            <Paper sx={{ maxHeight: 400, overflow: "auto" }}>
              <Card>
                <CardHeader title={user.fullname} />
                <CardContent>
                  <Typography>Email: {user.email}</Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3">Product Details</Typography>
            <Button
              variant="contained"
              sx={{ mb: 2, backgroundColor: "purple", color: "white" }}
              onClick={handleOpen}
            >
              Add Product
            </Button>
            <Grid container spacing={2}>
              {currentItems.map((product, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardHeader
                      title={product.title}
                      sx={{ overflow: "hidden", height: 100, width: "100%" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        component="img"
                        sx={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                          mb: 2,
                          overflow: "hidden", // Add overflow hidden here
                        }}
                        src={product.images}
                        alt={product.title} // Add alt attribute here
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography>Price: ${product.price}</Typography>
                      <Typography>Category: {product.category}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleEditOpen(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => confirmRemoveProduct(index)}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {error && (
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => paginate(value)}
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="h3" sx={{ mt: 2 }}>
          Transaction Details
        </Typography>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            {transactions.length > 0 ? (
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 400, overflow: "auto" }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Currency</TableCell>
                      <TableCell align="right">Created At</TableCell>
                      <TableCell align="right">User ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell component="th" scope="row">
                          {transaction.id}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.amount}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.status}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.currency}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.createdAt}
                        </TableCell>
                        <TableCell align="right">{transaction._id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No transaction details available.
              </Typography>
            )}
          </CardContent>
        </Card>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 4,
              width: 400,
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {editMode ? "Edit Product" : "Add New Product"}
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={newProduct.description}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
              >
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Home-Kitchen">Home Kitchen</MenuItem>
                <MenuItem value="TV Screen">TV & Screen</MenuItem>
                <MenuItem value="Smart Technology">Smart Technology</MenuItem>
                {/* <MenuItem value="Laptops & Accessories">
                  Laptops & Accessories
                </MenuItem> */}
                <MenuItem value="Music Instruments">Music Instruments</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={editMode ? handleEditProduct : handleAddProduct}
            >
              {editMode ? "Save Changes" : "Add Product"}
            </Button>
          </Box>
        </Modal>

        {/* Snackbar for product added confirmation */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Product added successfully!"
        />

        {/* Dialog for product remove confirmation */}
        <Dialog
          open={confirmationOpen}
          onClose={handleConfirmationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRemoveProduct} color="error" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Admin;
