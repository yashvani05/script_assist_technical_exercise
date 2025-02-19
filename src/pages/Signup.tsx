import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { TextInput, Button, Container, Paper, Title, Notification, Group, Anchor } from '@mantine/core';
import useAuthStore from '../store/app.store';
import { useState } from 'react';
import PasswordInputPage from '../components/PasswordInput';

const Signup = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state: any) => state.signup);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Name must be at least 3 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      mobile: (value) => (/^\d{10}$/.test(value) ? null : 'Invalid mobile number (10 digits required)'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSignup = () => {
    if (!form.validate().hasErrors) {
      const success = signup(
        { name: form.values.name, email: form.values.email, mobile: form.values.mobile },
        form.values.password
      );
      if (success) {
        navigate('/login');
      } else {
        setError('User already exists! Please log in.');
      }
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Create an Account</Title>
      {error && <Notification color="red" mt="md">{error}</Notification>}
      <Paper withBorder shadow="md" p={30} mt={20} radius="md">
        <form onSubmit={form.onSubmit(handleSignup)}>
          <TextInput label="Full Name" {...form.getInputProps('name')} required />
          <TextInput label="Email" {...form.getInputProps('email')} required mt="md" />
          <TextInput label="Mobile Number" {...form.getInputProps('mobile')} required mt="md" />
          <PasswordInputPage 
            label="Password"
            value={form.values.password} 
            onChange={(value) => form.setFieldValue('password', value)} 
            error={form.errors.password ? form.errors.password : undefined}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </form>
        <Group position="center" mt="md">
          <Anchor component="button" size="sm" onClick={() => navigate('/login')}>
            Already have an account? Log in
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
};

export default Signup;
