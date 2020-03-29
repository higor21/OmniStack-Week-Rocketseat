import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const Profile = () => {
    const [incidents, setIncidents] = useState([])
    const history = useHistory()
    const { addToast } = useToasts()
    const [ong] = useState({
        id: localStorage.getItem('ongId'),
        name: localStorage.getItem('ongName')
    })

    useEffect(() => {
        if (!ong.id) {
            history.push('/')
        }
    }, [])

    useEffect(() => {
        api.get('ong/incidents', {
            headers: {
                Authorization: ong.id
            }
        }).then(response => {
            setIncidents(response.data)
        }).catch(err => {
            alert(err);
        })
    }, [ong.id])

    const handleDelete = async (id) => {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ong.id
                }
            })
            setIncidents(incidents.filter(i => i.id !== id))
            addToast(`Caso removido`, {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (e) {
            addToast(`Erro ao remover caso da ONG: ${e}`, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    const handleLogOut = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ong.name}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar caso novo
                </Link>
                <button onClick={handleLogOut} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDelete(incident.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}

export default Profile
