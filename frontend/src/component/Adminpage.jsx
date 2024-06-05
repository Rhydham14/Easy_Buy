import React, { useState, useEffect } from "react";
import {
  Container,Grid,Paper,Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Typography,Button,MenuItem,Select,InputLabel,
  FormControl,Modal,Box,TextField,} from "@mui/material";
import { useSelector } from "react-redux";
import {ADD_PRODUCT,FETCH_DATA,UPDATE_PRODUCT} from "../service/service"

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const styles = {
    truncatedDescription: {
        display: '-webkit-box',
        WebkitLineClamp: 3, /* Limit to 3 lines */
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal' /* Allow wrapping */
    }
};

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
    formData.append('title', newProduct.title);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('image', newProduct.image);

    try {
      const response = await ADD_PRODUCT(formData); 
      const { message } = response.data;
      if (message) {
        setProducts((prev) => [...prev, newProduct]);
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
      } catch (error) {
        setError(error.message); 
      }
    };

    fetchData();
  }, []);

  const handleEditProduct = async () => {
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('image', newProduct.image);
    console.log("title", newProduct.title);
    try {
      const productId = products[currentProductIndex]._id;
      await UPDATE_PRODUCT(productId, formData); 

      const updatedProducts = products.map((product, index) =>
        index === currentProductIndex ? newProduct : product
      );
      setProducts(updatedProducts);
      handleClose(); 

    } catch (error) {
      console.error("An error occurred. Please try again.", error);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "rgba(182, 0, 182, 0.212)", minHeight: "100vh", py: 4 }}
    >
      <Typography variant="h1" align="center" color="white" gutterBottom>
        Welcome Admin
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3">Your Profile</Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell style={styles.truncatedDescription}>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.images ? <img src={product.images} alt="No image" height={80} /> : "No image"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditOpen(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setProducts((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              <MenuItem value="Home-Kitchen">Home  Kitchen</MenuItem>
              <MenuItem value="TV Screen">TV & Screen</MenuItem>
              <MenuItem value="Smart Technology">Smart Technology</MenuItem>
              <MenuItem value="Laptops & Accessories">Laptops & Accessories</MenuItem>
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
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
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
    </Container>
  );
};

export default Admin;
