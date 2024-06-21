import { useState } from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../firebase/config';

const schema = yup.object().shape({
  FirstName: yup.string().matches(/^[A-Za-z]+$/, 'Invalid First Name').required('Your First Name is required to submit the form'),
  LastName: yup.string().matches(/^[A-Za-z]+$/, 'Invalid Last Name').required('Your Last Name is required to submit the form'),
  email: yup.string().email('Invalid Email').required('Email is required to submit the form'),
  PhoneNumber: yup.string().matches(/^[0-9]+$/, 'Phone Number invalid').required('Your Phone Number has to be added to the phone form'),
  DOB: yup.string().required('Your date of birth is necessary'),
  Gender: yup.string().required('You must have to select an option'),
  Address: yup.string().required('Your address is missing')
})

export const RegisterForm = () => {
  const {register, handleSubmit, formState:{errors}} = useForm({
  resolver: yupResolver(schema)
});

  const [showSuccessAlert,setShowSuccessAlert] = useState(false);

const onSubmit = (data) =>{
  console.log(data);
  setShowSuccessAlert(true);

  signInAnonymously(auth, data.email, data.FirstName, data.LastName)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.error(errorMessage);
  })

  
}

  return (
<> 
<h1>Medical Request</h1>
<br></br>

<form onSubmit={handleSubmit(onSubmit)} className="row g-3">
<div className="row">
   <div className="col">
     <input type="text" className="form-control" placeholder="First name" aria-label="First name"{...register('FirstName')}/>

     {errors.FirstName && <p>{errors.FirstName.message}</p>}
   </div>

   <div className="col">
     <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"{...register('LastName')}/>
     {errors.LastName && <p>{errors.LastName.message}</p>}
   </div>
</div>

  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4"{...register('email')}/>
    {errors.email && <p>{errors.email.message}</p>}
  </div>

  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Phone Number</label>
    <input type="tel" className="form-control" id="inputPassword4"{...register('PhoneNumber')}/>
    {errors.PhoneNumber && <p>{errors.PhoneNumber.message}</p>}
  </div>

  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">Date of Birth</label>
    <input type="text" className="form-control" id="inputCity"{...register('DOB')}/>
    {errors.DOB && <p>{errors.DOB.message}</p>}
  </div>

  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">Gender</label>
    <select id="inputState" className="form-select" {...register('Gender')}>
      <option>Choose...</option>
      <option>Female</option>
      <option>Male</option>
      <option>Other</option>
    </select>
    {errors.Gender && <p>{errors.Gender.message}</p>}
  </div>

  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"{...register('Address')}/>
    {errors.Address && <p>{errors.Address.message}</p>}
  </div>

  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">Zip Code</label>
    <input type="text" className="form-control" id="inputZip"{...register('ZipCode')}/>
  </div>

<h1>Medical History</h1>
<div className="d-flex justify-content-between">
  <div className="d-flex flex-column me-3">
    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="validationFormCheck1"{...register('Allergies')}/>
      <label className="form-check-label" htmlFor="validationFormCheck1">Allergies</label>
    </div>

    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="validationFormCheck2"{...register('Illnesses')}/>
      <label className="form-check-label" htmlFor="validationFormCheck2">Chronic Illnesses</label>
    </div>

    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="validationFormCheck3"{...register('Surgeries')}/>
      <label className="form-check-label" htmlFor="validationFormCheck3">Previous Surgeries</label>
    </div>
  </div>

  <div className="d-flex flex-column ms-3">
    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="validationFormCheck4"{...register('Medication')}/>
      <label className="form-check-label" htmlFor="validationFormCheck4">Medication currently taking</label>
    </div>

    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="validationFormCheck5"{...register('MedicalHistory')}/>
      <label className="form-check-label" htmlFor="validationFormCheck5">Family Medical History</label>
    </div>

    <div className="form-check mb-3">
      <input type="checkbox" className="form-check-input" id="validationFormCheck6"{...register('other')}/>
      <label className="form-check-label" htmlFor="validationFormCheck6">Other Medical conditions</label>
    </div>
  </div>
</div>

<h1>Reason to visit</h1>

   <div className="form-floating">
      <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" {...register('Description')}></textarea>
      <label htmlFor="floatingTextarea2">Describe your symptoms or reason of visit</label>
    </div>

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
<br></br>
{showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Well done!</h4>
          <p>You have successfully scheduled your appointment. Please be sure to arrive on time and bring any relevant documentation, such as previous test results or medications you are currently taking.</p>
          <hr/>
          <p className="mb-0">If you need to cancel or reschedule your appointment, please contact us at least 24 hours in advance.</p>
        </div>
)}
  </>
  );
};