import React, { useState, useEffect } from 'react';
import './App.css';
import Hosts from '../components/Hosts';
import Header from '../componentss/Header';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Popup from 'reactjs-popup';
import HostForm from '../components/HostForm';
import axios from 'axios';
import Alert from '../componentss/Alert'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Home() 
{
    const [hosts, setHosts] = useState([])


    useEffect(() =>
    {
        axios.get('http://localhost:3001/connections/get')
            .then(res =>
            {
                setHosts(res.data)
            })
            .catch(err =>
            {
                console.log(err);
            })
    }, [])


    async function DeleteRequest(requestOptions)
    {
        try
        {
            await fetch(
                'http://localhost:3001/connections/delete', requestOptions)
                .then(response => response.text())
                .then(data =>
                {
                    console.log(data);
                    return data
                })
        } catch (e)
        {
            console.log(e);
        }
    }


    const handleFormSubmit = async (e, hostData) =>
    {
        try
        {
            const requestOptions =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify
                    ({
                        "ip": hostData.ip,
                        "login": hostData.login,
                        "password": hostData.password,
                        "connectionName": hostData.connectionName,
                    })
            }

            let response
            await fetch(
                'http://localhost:3001/connections/insert', requestOptions)
                .then(response => response.text())
                .then(data =>
                {
                    if (data === "Host inserted")
                        alert("Host added successfully")
                    else
                        alert("Error inserting host, plese verify that your new host data is unique.")
                })



        }
        catch (e)
        {
            console.log(e);
        }


    }

    const deleteHost = async (id) =>
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": id })
        };

        let response
        await fetch(
            'http://localhost:3001/connections/delete', requestOptions)
            .then(response => response.text())
            .then(data =>
            {
                console.log(data);
                response = data
            })

        if (response == "Host deleted")
        {

            alert("Host deleted successfully")
            setHosts(hosts.filter((host) =>
                host._id !== id
            ))
        } else
        {
            alert("Error deleting host")
            console.log(response);

        }


    }

    const editHost = (id) =>
    {
        console.log('ola');
    }

    const openHost = (id) =>
    {
        console.log('open');
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Header />
                    <Hosts
                        hosts={hosts}
                        deleteHost={deleteHost}
                        editHost={editHost}
                        openHost={openHost}
                    />
                    <Popup trigger={<div className='addButton'>
                        <Fab
                            onClick={() =>
                            {
                            }}
                            size="large"
                        >
                            <AddIcon
                                fontSize="large"
                                color="black"
                            />
                        </Fab>
                    </div>}
                        position="right center">
                        <HostForm
                            submit={handleFormSubmit} />
                    </Popup>
                </Routes>
            </div>
        </Router>
    );
}

export default Home;