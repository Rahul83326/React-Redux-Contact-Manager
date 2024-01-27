import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({ contacts, deleteContact }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    Object.values(contact)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [sortBy, setSortBy] = useState({ key: '', order: '' });

  const handleSort = (key) => {
    setSortBy((prevSortBy) => ({
      key,
      order: prevSortBy.key === key && prevSortBy.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedContacts = sortBy.key
    ? [...filteredContacts].sort((a, b) => {
        const fieldA = a[sortBy.key].toLowerCase();
        const fieldB = b[sortBy.key].toLowerCase();

        if (sortBy.order === 'asc') {
          return fieldA.localeCompare(fieldB);
        } else {
          return fieldB.localeCompare(fieldA);
        }
      })
    : filteredContacts;

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="input-group" style={{ width: '28%' }}>
            <div className="input-group-prepend">
              <span className="input-group-text" style={{ padding: '0.99rem', borderRadius:'10px' }}>
                <i className="fas fa-search"></i>
              </span>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ padding: '0.59rem', borderRadius:'5px' }}
            />
          </div>
          <Link to="/add" className="btn btn-outline-dark my-3 ml-auto" style={{ padding: '0.5rem', borderRadius:'10px' }}>
            Add Contact <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
          <thead  className="bg-dark text-white"  >
              <tr>
                <th scope="col" style={{ backgroundColor: 'mediumaquamarine', color: 'white' }}>ID</th>
                <th scope="col" onClick={() => handleSort('name')} style={{ backgroundColor: 'darkslategrey', color: 'white' }} >
                  Name {sortBy.key === 'name' && (sortBy.order === 'asc' ? '↑' : '↓')}
                </th>
                <th scope="col" onClick={() => handleSort('gender')} style={{ backgroundColor: 'mediumaquamarine', color: 'white' }}>
                  Gender {sortBy.key === 'gender' && (sortBy.order === 'asc' ? '↑' : '↓')}
                </th>
                <th scope="col" onClick={() => handleSort('department')} style={{ backgroundColor: 'darkslategrey', color: 'white' }}>
                  Department {sortBy.key === 'department' && (sortBy.order === 'asc' ? '↑' : '↓')}
                </th>
                <th scope="col" onClick={() => handleSort('birthdate')} style={{ backgroundColor: 'mediumaquamarine', color: 'white' }}>
                  Date of Birth {sortBy.key === 'birthdate' && (sortBy.order === 'asc' ? '↑' : '↓')}
                </th>
                <th scope="col" onClick={() => handleSort('contract')} style={{ backgroundColor: 'darkslategrey', color: 'white' }}>
                  Contract {sortBy.key === 'contract' && (sortBy.order === 'asc' ? '↑' : '↓')}
                </th>
                <th scope="col" style={{ backgroundColor: 'mediumaquamarine', color: 'white' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.length > 0 ? (
                sortedContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.name}</td>
                    <td>{contact.gender}</td>
                    <td>{contact.department}</td>
                    <td>{contact.birthdate}</td>
                    <td>{contact.contract}</td>
                    <td className="d-flex">
                      <Link to={`/edit/${contact.id}`} className="btn btn-sm btn-primary mr-2" style={{ backgroundColor: 'mediumaquamarine', color: 'white', marginRight: '10px' }}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th colSpan={7}>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
