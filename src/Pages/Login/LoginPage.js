import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let isPathValid = true;
    let newErrors = { email: "", password: "" };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required!";
      isPathValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format (xxx@xxxx.com)";
      isPathValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required!";
      isPathValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isPathValid = false;
    }

    setErrors(newErrors);
    return isPathValid;
  };

  const handleInputChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form is valid! Data:", { email, password });
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-black"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <div className="text-center mb-4">
            <h1 style={{ color: "#ff8c00", fontWeight: "bold" }}>FILM HUB</h1>
          </div>

          <div
            className="p-4 shadow-lg"
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <h3 className="mb-4 text-center">Sign In</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.email ? "is-invalid" : ""}`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control bg-dark text-white border-secondary ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <button
                    className="btn btn-outline-secondary border-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlash color="#ff8c00" />
                    ) : (
                      <Eye color="#ff8c00" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn w-100 fw-bold py-2"
                style={{ backgroundColor: "#ff8c00", color: "white" }}
              >
                LOGIN
              </button>
              <div className="text-center mt-3">

              <span >Don't have an account? </span>
              <Link
                to="/register"
                className="fw-bold"
                style={{ color: "#ff8c00", textDecoration: "none" }}
              >
                Register here
              </Link>
            </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
