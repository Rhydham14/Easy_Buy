  import React, { useState, useEffect } from "react";
  import "../css/BuyNow.css";
  import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
  import { useParams, useNavigate } from "react-router-dom";
  import { PAYMENT, PAYMENT_DETAILS } from "../service/service";
  import { useSelector, useDispatch } from "react-redux";
  import { buyProduct } from "../slice/cartSlice";
  import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';

  const BuyNow = () => {
    const { totalPrice } = useParams();
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchClientSecret = async (totalPrice) => {
        try {
          const response = await PAYMENT(totalPrice);
          setClientSecret(response.clientSecret);
        } catch (error) {
          console.error("Error fetching client secret:", error.message);
          setError("Failed to fetch client secret");
        }
      };

      if (totalPrice) {
        fetchClientSecret(totalPrice);
      }
    }, [totalPrice]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        try {
          await PAYMENT_DETAILS(paymentIntent);
          dispatch(buyProduct(paymentIntent.status));
          navigate("/PaymentSuccess");
        } catch (error) {
          console.error("Failed to load payment", error);
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <Container fluid  id="body">
        <Row className="justify-content-center">
          <Col md={6} className="align-items-center justify-content-center mt-4 h-50">
            <Card  id="card" className="h-100">
              <Card.Body>
                <h1 className="mb-4 ">Checkout</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <h6>Card Details</h6>
                    <div className="p-2 border rounded ">
                      <CardElement />
                    </div>
                  </Form.Group>
                  <Button type="submit" style={{backgroundColor:'purple', color:'white', borderColor:'purple'}} disabled={!stripe || !elements || loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Pay"}
                  </Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  export default BuyNow;
