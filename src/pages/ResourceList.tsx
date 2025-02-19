import { useQuery } from '@tanstack/react-query';
import { Table, TextInput, Button, Container } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderModal from '../components/LoaderModal';
import api from '../services/axiosInstance'; 

const fetchResources = async () => {
  const res = await api.get('/people');
  return res.data;
};

const ResourceList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ['resources'], queryFn: fetchResources });
  const [search, setSearch] = useState('');

  if (isLoading) return <LoaderModal opened={true} />;

  const filteredResults = data.results.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid>
      <TextInput placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} mb="md" mt="lg" />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <Button onClick={() => navigate(`/resources/${index + 1}`)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResourceList;
