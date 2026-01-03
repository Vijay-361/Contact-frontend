export default function ContactList({ contacts, fetchContacts }) {

  const deleteContact = async (id) => {
    try {
      await fetch(`https://contacts-1p2f.onrender.com/api/contacts/${id}`, {
        method: "DELETE"
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete contact");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {contacts.map(c => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>
              <button onClick={() => deleteContact(c._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
