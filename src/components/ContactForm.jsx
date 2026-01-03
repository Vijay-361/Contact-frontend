import { useState } from "react";
import axios from "axios";

export default function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (!form.name || !form.phone) return false;
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) return false;
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setError("Please enter valid details");
      return;
    }

    try {
      await axios.post("https://contacts-1p2f.onrender.com/api/contacts", form);
      setForm({ name: "", email: "", phone: "", message: "" });
      setError("");
      fetchContacts();
    } catch (err) {
      console.error(err);
      setError("Failed to add contact. Try again!");
    }
  };

  return (
    <form className="glass-card" onSubmit={submitHandler}>
      <h2>Add Contact</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Message (optional)"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />

      {error && <p className="error">{error}</p>}

      <button disabled={!validate()} className="submit-btn">
        Add Contact
      </button>
    </form>
  );
}
