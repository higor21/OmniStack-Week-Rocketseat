import React from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault() // used to don't reload the page

        try {
            const response = await api.post('ongs', getValues());
            addToast(`Seu ID de acesso: ${response.data.id}`, {
                appearance: 'success',
                autoDismiss: true,
            })
            history.push('/')
        } catch (e) {
            addToast(`Erro no cadastro da ONG: ${e}`, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na platafama e ajudas pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Volte ao início
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input placeholder="Nome da ONG" name="name" ref={register} />
                    <input type="email" placeholder="E-mail" name="email" ref={register} />
                    <input placeholder="WhatsApp" name="whatsapp" ref={register} />

                    <div className="input-group">
                        <input placeholder="Cidade" name="city" ref={register} />
                        <input placeholder="UF" style={{ width: 80 }} name="uf" ref={register} />
                    </div>

                    <button className="button" type="submit">Cadastro</button>
                </form>
            </div>
        </div>
    )
};

export default Register;
