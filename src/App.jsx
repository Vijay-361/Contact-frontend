import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Footer from "./components/Footer";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://contacts-1p2f.onrender.com/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Contact Management App</h1>
      </header>

      <ContactForm fetchContacts={fetchContacts} />
      <ContactList contacts={contacts} fetchContacts={fetchContacts} />

      <footer className="footer">
        <p>
          © 2026 Vijayasri R • Built with MERN Stack • Internship Assignment
        </p>
      </footer>
    </div>
  );
}
