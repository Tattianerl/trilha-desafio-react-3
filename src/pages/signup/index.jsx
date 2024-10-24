import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleSignup, SubtitleSignup, Row, Wrapper } from './styles';

const Signup = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        // Verifica se as senhas coincidem
        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        try {
            const response = await api.post('/users', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
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
                                name="nome"
                                control={control}
                                rules={{ required: "Nome é obrigatório" }}
                            />
                            {errors.nome && <span>{errors.nome.message}</span>}

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
                                name="senha"
                                control={control}
                                rules={{ required: "Senha é obrigatória" }}
                            />
                            {errors.senha && <span>{errors.senha.message}</span>}

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
