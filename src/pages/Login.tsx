import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { TextInput, Button, Container, Paper, Title, Notification, Group, Anchor } from '@mantine/core';
import useAuthStore from '../store/app.store';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state: any) => state.login);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleLogin = () => {
    if (!form.validate().hasErrors) {
      const success = login(form.values.email, form.values.password);
      if (success) {
        navigate('/resources');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Log In</Title>
      {error && <Notification color="red" mt="md">{error}</Notification>}
      <Paper withBorder shadow="md" p={30} mt={20} radius="md">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput label="Email" {...form.getInputProps('email')} required />
          <TextInput label="Password" type="password" {...form.getInputProps('password')} required mt="md" />
          <Button fullWidth mt="xl" type="submit">
            Log In
          </Button>
        </form>
        <Group position="center" mt="md">
          <Anchor component="button" size="sm" onClick={() => navigate('/signup')}>
            Don't have an account? Sign up
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
};

export default Login;
