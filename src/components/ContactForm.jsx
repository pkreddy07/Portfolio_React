import { useState } from 'react';
import './ContactForm.css';

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

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    // No backend yet — this assignment only wires up client-side state/validation.
    setSubmitted(true);
    setValues(initialValues);
    setTouched({});
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
        />
        {touched.message && errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        $ send-message
      </button>
    </form>
  );
}
