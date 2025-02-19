import { Group, Text, Button, Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/app.store';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
console.log("user--",user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  if (!user) return null;
  return (
    <Container fluid>
      <Group position="apart" py="md" px="lg" style={{ backgroundColor: '#f8f9fa' }}>
        <Text weight={700} size="lg">
          MyApp
        </Text>
        {user ? (
          <Group>
            <Text>
              <strong title={user?.email}>{user?.name}</strong> 
            </Text>
            <Button onClick={handleLogout} color="red">
              Logout
            </Button>
          </Group>
        ) : null}
      </Group>
    </Container>
  );
};

export default Navbar;
