import { Modal, Loader } from '@mantine/core';

interface LoaderModalProps {
  opened: boolean;
}

const LoaderModal = ({ opened }: LoaderModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      centered
      withCloseButton={false}
      overlayProps={{ opacity: 0, blur: 0 }} 
      styles={{
        content: { background: 'transparent', boxShadow: 'none' },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <Loader size="lg" />
      </div>
    </Modal>
  );
};

export default LoaderModal;
