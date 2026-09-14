import { useState } from 'react';
import './ContactForm.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = { name: '', email: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerError(null);
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form.');
      }

      setSubmitted(true);
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setServerError(err.message || 'An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <p>$ message sent — thanks, I&apos;ll get back to you soon.</p>
        <button type="button" className="btn btn-secondary" onClick={() => setSubmitted(false)}>
          send another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="form-server-error" role="alert">
          <span>⚠ {serverError}</span>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">--name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.name && errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">--email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.email && errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">--message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="say something"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.message && errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isValid || isSubmitting}>
        {isSubmitting ? '$ sending...' : '$ send-message'}
      </button>
    </form>
  );
}
