import React, { useEffect, useState } from 'react';
import { get_data } from './api/api';

function List() {
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        async function fetch_data() {
            const res = await get_data();
            setDataList(res?.data);
        }
        fetch_data();
    }, []);

    return (
        <>
            <div style={{ color: "black" }}>List</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sr No.#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                        <th scope="col">Dob</th>
                        <th scope="col">Country</th>
                        <th scope="col">State</th>
                        <th scope="col">City</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList && dataList.length > 0 ? (
                            dataList.map((elem, index) => (
                                <tr key={index}>
                                    <th scope={`${index === 0 ? 'row' : ''}`}>{index + 1}</th>
                                    <td>{`${elem?.first_name}  ${elem?.last_name}`}</td>
                                    <td>{elem?.e_mail}</td>
                                    <td>{elem?.gender}</td>
                                    <td>{elem?.age}</td>
                                    <td>{elem?.dob}</td>
                                    <td>{elem?.country}</td>
                                    <td>{elem?.state}</td>
                                    <td>{elem?.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No results found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>

    )
}
export default List;