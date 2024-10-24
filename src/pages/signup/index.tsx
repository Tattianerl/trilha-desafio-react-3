import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleSignup, SubtitleSignup, Row, Wrapper } from './styles';
import { IFormDataSignup } from './types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    confirmarSenha: yup.string()
        .oneOf([yup.ref('password'), undefined ], 'As senhas devem coincidir')
        .required('Confirmação de senha é obrigatória'),
}).required();

const Signup = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm<IFormDataSignup>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (formData: IFormDataSignup) => {
        // Verifica se as senhas coincidem (essa parte já é tratada pelo Yup)
        try {
            const response = await api.post('/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {
                alert('Usuário cadastrado com sucesso!');
                navigate('/login');
            } else {
                alert('Erro ao cadastrar o usuário');
            }
        } catch (e) {
            alert('Erro ao cadastrar o usuário');
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>Cadastre-se na plataforma e tenha acesso aos melhores conteúdos e experts em tecnologia.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleSignup>Criar uma conta</TitleSignup>
                        <SubtitleSignup>Preencha os campos abaixo para se cadastrar.</SubtitleSignup>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                placeholder="Nome"
                                leftIcon={<MdPerson />}
                                name="name"
                                control={control}
                                rules={{ required: "Nome é obrigatório" }}
                            />
                            {errors.name && <span>{errors.name.message}</span>}

                            <Input
                                placeholder="E-mail"
                                leftIcon={<MdEmail />}
                                name="email"
                                control={control}
                                rules={{
                                    required: "E-mail é obrigatório",
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "E-mail inválido"
                                    }
                                }}
                            />
                            {errors.email && <span>{errors.email.message}</span>}

                            <Input
                                type="password"
                                placeholder="Senha"
                                leftIcon={<MdLock />}
                                name="password"
                                control={control}
                                rules={{ required: "Senha é obrigatória" }}
                            />
                            {errors.password && <span>{errors.password.message}</span>}

                            <Input
                                type="password"
                                placeholder="Confirme sua Senha"
                                leftIcon={<MdLock />}
                                name="confirmarSenha"
                                control={control}
                                rules={{ required: "Confirmação de senha é obrigatória" }}
                            />
                            {errors.confirmarSenha && <span>{errors.confirmarSenha.message}</span>}

                            <Button title="Cadastrar" variant="primary" type="submit" />
                        </form>
                        <Row>
                            <span>Já possui uma conta?</span>
                            <Button title="Login" variant="link" onClick={() => navigate('/login')} />
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Signup };
