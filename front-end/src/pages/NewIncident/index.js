import React, { useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import './styles.css'
import logoImg from '../../assets/logo.svg';

const Register = () => {
    const { register, getValues } = useForm()
    const { addToast } = useToasts()
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('ongId')) {
            history.push('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault() // used to don't reload the page

        try {
            await api.post('incidents', getValues(), {
                headers: {
                    Authorization: localStorage.getItem('ongId')
                }
            });
            addToast(`Incidente cadastrado`, {
                appearance: 'success',
                autoDismiss: true,
            })
            history.push('/profile')
        } catch (e) {
            addToast(`Erro no cadastro do incidente: ${e}`, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input placeholder="Título do caso" name="title" ref={register} />
                    <textarea placeholder="Descrição" name="description" ref={register} />
                    <input placeholder="Valor em reais" name="value" ref={register} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
};

export default Register;
