import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format (xxx@xxxx.com)";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.includes(" ")) {
      newErrors.username = "Username should not contain spaces";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Must be 8+ chars, 1 Uppercase, 1 Lowercase, 1 Digit, 1 Special Char";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Registration Successful!", formData);
    }
  };

  return (
    <Container
      fluid
      className="py-5 d-flex align-items-center justify-content-center bg-black min-vh-100"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={8} lg={5}>
          <div className="text-center mb-4">
            <h1 style={{ color: "#ff8c00", fontWeight: "bold" }}>
              CREATE ACCOUNT
            </h1>
          </div>

          <div
            className="p-4 shadow-lg"
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.username ? "is-invalid" : ""}`}
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control bg-dark text-white border-secondary ${errors.password ? "is-invalid" : ""}`}
                    value={formData.password}
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
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control bg-dark text-white border-secondary ${errors.confirmPassword ? "is-invalid" : ""}`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold py-2 mb-3"
                style={{ backgroundColor: "#ff8c00", color: "white" }}
              >
                REGISTER
              </button>

              <div className="text-center mt-3">
                <span >Already have an account? </span>
                <Link
                  to="/login"
                  className="fw-bold"
                  style={{ color: "#ff8c00", textDecoration: "none" }}
                >
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
