import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, Text, Loader } from "@mantine/core";
import LoaderModal from "../components/LoaderModal";
import api from "../services/axiosInstance";

const fetchResource = async (id: string) => {
    const res = await api.get(`/people/${id}`);
    return res.data;
  };
  const fetchAdditionalData = async (url: string) => {
  const res = await  api.get(url);
  return res.data;
};

const ResourceDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["resource", id],
    queryFn: () => fetchResource(id as string),
    enabled:false
  });

  const { data: homeworld, isLoading: homeworldLoading } = useQuery({
    queryKey: ["homeworld", data?.homeworld],
    queryFn: () => fetchAdditionalData(data.homeworld),
    enabled: !!data?.homeworld,
  });

  if (isLoading || homeworldLoading) return <LoaderModal opened={true} />;
  return (
    <Card shadow="sm" padding="lg">
      <Text size="xl">{data.name}</Text>
      <Text>Height: {data.height}cm</Text>
      <Text>Mass: {data.mass}kg</Text>
      <Text>Homeworld: {homeworld?.name}</Text>
    </Card>
  );
};

export default ResourceDetail;
