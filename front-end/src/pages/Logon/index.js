import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import './styles.css'

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

const Logon = () => {
    const [ongId, setOngId] = useState(null);
    const { addToast } = useToasts()
    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('login', { id: ongId })

            localStorage.setItem('ongId', ongId)
            localStorage.setItem('ongName', response.data.ong.name)

            addToast(`ONG logada com sucesso`, {
                appearance: 'success',
                autoDismiss: true,
            })
            history.push('/profile')
        } catch (e) {
            addToast(`Erro no login da ONG: ${e}`, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID" 
                        value={ongId}
                        onChange={e => setOngId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}

export default Logon
