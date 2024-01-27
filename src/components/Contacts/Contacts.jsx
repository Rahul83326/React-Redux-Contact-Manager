import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactForm = ({ onSubmit, initialValues, isEdit }) => {
  const [submittedData, setSubmittedData] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [contract, setContract] = useState('');

  const [nameError, setNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [contractError, setContractError] = useState('');

  useEffect(() => {
    if (isEdit && initialValues) {
      setName(initialValues.name);
      setGender(initialValues.gender);
      setDepartment(initialValues.department);
      setBirthdate(initialValues.birthdate);
      setContract(initialValues.contract);
    }
  }, [isEdit, initialValues]);

  const validateFields = () => {
    let isValid = true;

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!gender) {
      setGenderError('Gender is required');
      isValid = false;
    } else {
      setGenderError('');
    }

    if (!department) {
      setDepartmentError('Department is required');
      isValid = false;
    } else {
      setDepartmentError('');
    }

    if (!birthdate) {
      setBirthdateError('Birthdate is required');
      isValid = false;
    } else {
      setBirthdateError('');
    }

    if (!contract) {
      setContractError('Contract is required');
      isValid = false;
    } else {
      setContractError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return toast.warning('Please fill in all fields!!');
    }

    const data = {
      id: isEdit ? initialValues?.id : Date.now(),
      name,
      gender,
      department,
      birthdate,
      contract,
    };

    onSubmit(data);
    setSubmittedData(data);
    toast.success(`${isEdit ? 'Contact updated' : 'Contact added'} successfully!!`);
  };

  return (
    <div>
      {submittedData ? (
        <div>
          <h2>Submitted Data</h2>
          <p>Name: {submittedData.name}</p>
          <p>Gender: {submittedData.gender}</p>
          <p>Department: {submittedData.department}</p>
          <p>Birthdate: {submittedData.birthdate}</p>
          <p>Contract: {submittedData.contract}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className={`form-control ${nameError ? 'is-invalid' : ''}`}
              type="text"
              placeholder={`Full name${nameError ? ' - ' + nameError : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              className={`form-control ${genderError ? 'is-invalid' : ''}`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select
              className={`form-control ${departmentError ? 'is-invalid' : ''}`}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="DataAnalyst">Data Analyst</option>
              <option value="Developer">Developer</option>
            </select>
          </div>
          <div className="form-group">
            <label>Birthdate:</label>
            <input
              className={`form-control ${birthdateError ? 'is-invalid' : ''}`}
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contract:</label>
            <select
              className={`form-control ${contractError ? 'is-invalid' : ''}`}
              value={contract}
              onChange={(e) => setContract(e.target.value)}
            >
              <option value="">Select Contract</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <input
              className="btn btn-block btn-dark"
              type="submit"
              value={isEdit ? 'Update Contact' : 'Add Contact'}
            />
          </div>
        </form>
      )}
    </div>
  );
};

const ContactCard = ({ data, onBack }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">Gender: {data.gender}</p>
        <p className="card-text">Department: {data.department}</p>
        <p className="card-text">Birthdate: {data.birthdate}</p>
        <p className="card-text">Contract: {data.contract}</p>
        <button className="btn btn-primary" onClick={onBack}>
          Submit
        </button>
      </div>
    </div>
  );
};

const Contact = ({ contacts, addContact, updateContact }) => {
  const history = useHistory();
  const { id } = useParams();
  const isEdit = !!id;
  const currentContact = isEdit ? contacts.find((contact) => contact.id === parseInt(id || '')) : null;

  const getNextId = () => {
    return contacts.length + 1;
  };

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (data) => {
    if (!data.name || !data.gender || !data.department || !data.birthdate || !data.contract) {
      toast.warning('Please fill in all fields!!');
      return;
    }

    if (isEdit) {
      updateContact(data);
    } else {
      const newData = { ...data, id: getNextId() };
      addContact(newData);
    }

    toast.success(`${isEdit ? 'Contact updated' : 'Contact added'} successfully!!`);
    setSubmittedData(data);
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <div className="col-md-6 mx-auto shadow p-5">
          {submittedData ? (
            <div>
              <h1 className="text-center">Contact Submitted</h1>
              <ContactCard data={submittedData} onBack={() => history.push('/')} />
            </div>
          ) : (
            <div>
              <h1 className="text-center">{isEdit ? 'Edit Contact' : 'Add Contact'}</h1>
              <ContactForm onSubmit={handleSubmit} initialValues={currentContact} isEdit={isEdit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: 'ADD_CONTACT', payload: data });
  },
  updateContact: (data) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
