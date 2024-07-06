import React, { useEffect, useState } from "react";
import { add_data, get_country, get_state, get_city, } from "./api/api";
import { validateDOB } from "./utils/helper";
import { useNavigate } from "react-router-dom";

function Add() {
    const navigate = useNavigate();
    const [listData, setListData] = useState({
        country: [],
        state: [],
        city: []
    });
    const [requestData, setRequestData] = useState({
        first_name: '',
        last_name: '',
        e_mail: '',
        dob: '',
        age: '',
        country_id: '',
        state_id: '',
        city_id: '',
        gender: ''
    });

    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        e_mail: '',
        gender: ''
    });

    useEffect(() => {
        async function fetchCountry() {
            const countryData = await get_country();
            setListData(prevListData => ({
                ...prevListData,
                country: countryData?.data
            }));
        }
        fetchCountry();
    }, []);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;
        if (name === 'dob') {
            calculateAge(newValue);
        }

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateEmail = (email) => {
        // Basic email validation regex pattern
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        return regex.test(email);
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setRequestData({
            ...requestData,
            age: age.toString()
        });
    };

    const handleCountryChange = async (e) => {
        const countryId = e.target.value;
        const state = await get_state(countryId);
        setListData({
            ...requestData,
            state: state?.data,
            city_id: ''
        });
    };

    const handleStateChange = (e) => {
        const stateId = e.target.value;
        const city = get_city(stateId);
        setListData({
            ...requestData,
            city: city?.data
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsFound = false;
        const updatedErrors = {
            first_name: '',
            last_name: '',
            e_mail: '',
            gender: ''
        };
        if (!requestData.first_name.trim()) {
            updatedErrors.first_name = 'First name is required';
            errorsFound = true;
        }

        if (!requestData.last_name.trim()) {
            updatedErrors.last_name = 'Last name is required';
            errorsFound = true;
        }

        if (!requestData.e_mail.trim()) {
            updatedErrors.e_mail = 'Email is required';
            errorsFound = true;
        } else if (!validateEmail(requestData.e_mail)) {
            updatedErrors.e_mail = 'Invalid email format';
            errorsFound = true;
        }

        if (!requestData.gender) {
            updatedErrors.gender = 'Gender is required';
            errorsFound = true;
        }

        if (errorsFound) {
            setErrors(updatedErrors);
        }

        if (!requestData.country_id || !requestData.state_id || !requestData.city_id) {
            alert('Please select Country, State, and City.');
            return;
        }
        if (!validateDOB(requestData.dob)) {
            alert('Date of birth must be between 14 and 99 years old.');
            return;
        }
        console.log(requestData);
        const res = await add_data(requestData);
        if (res?.status == true) {
            navigate('/list');
        }
    };

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <br />
                <br />
                <div class="row">
                    <div class="col-lg-6">
                        <input type="text" class="form-control" placeholder="Enter first name" name="first_name" onChange={(e) => (setRequestData({ ...requestData, first_name: e.target.value }, handleChange))} />
                        {errors.first_name && <p className="text-danger">{errors.first_name}</p>}
                    </div>
                    <div class="col-lg-6">
                        <input type="text" class="form-control" placeholder="Enter last name" name="last_name" onChange={(e) => (setRequestData({ ...requestData, last_name: e.target.value }, handleChange))} />
                        {errors.last_name && <p className="text-danger">{errors.last_name}</p>}
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-6">
                        <input type="email" class="form-control" placeholder="Enter e-mail" name="e_mail" onChange={(e) => (setRequestData({ ...requestData, e_mail: e.target.value }, handleChange))} />
                        {errors.e_mail && <p className="text-danger">{errors.e_mail}</p>}
                    </div>
                    <div class="col-lg-6">
                        <select className="form-select form-control" name="country_id"
                            onChange={(e) => handleCountryChange(e)}
                        // value={requestData.country_id}
                        >
                            <option value="">Choose Country</option>
                            {
                                listData?.country && listData.country.map((elem) => (
                                    <option key={elem.id} value={elem.id}>{elem.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-6">
                        <select className="form-select form-control" name="state_id" onChange={(e) => handleStateChange(e)} value={requestData.state_id}>
                            <option value="">Choose State</option>
                            {
                                listData?.state && listData.state.map((elem) => (
                                    <option key={elem.id} value={elem.id}>{elem.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div class="col-lg-6">
                        <select className="form-select form-control" name="city_id" onChange={(e) => setRequestData({ ...requestData, city_id: e.target.value })} value={requestData.city_id}>
                            <option value="">Choose City</option>
                            {
                                listData?.city && listData.city.map((elem) => (
                                    <option key={elem.id} value={elem.id}>{elem.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-6">
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="male" value="male" onChange={(e) => (setRequestData({ ...requestData, gender: e.target.value },handleChange))} />
                        <br />
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="female" value="female" onChange={(e) => (setRequestData({ ...requestData, gender: e.target.value },handleChange))} />
                        <br />
                        <label for="other">Other</label>
                        <input type="radio" name="gender" id="other" value="other" onChange={(e) => (setRequestData({ ...requestData, gender: e.target.value },handleChange))} />
                        {errors.gender && <p className="text-danger">{errors.gender}</p>}
                    </div>
                    <div class="col-lg-6">
                        <input type="date" class="form-control" placeholder="Enter dob" name="dob" onChange={(e) => (setRequestData({ ...requestData, dob: e.target.value }, handleChange))} />
                        {!validateDOB(requestData.dob) && <small className="text-danger">Age must be between 14 and 99 years.</small>}
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-6">
                        <input type="text" class="form-control" placeholder="Age" name="age" readOnly value={requestData.age} />
                    </div>
                    <br />
                    <br />
                    <div class="col-lg-8">
                        <input type="submit" className="btn btn-success" value="Save" />
                    </div>
                </div>
            </form>
        </>
    );
}

export default Add;
