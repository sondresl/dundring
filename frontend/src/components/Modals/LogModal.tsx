import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useLogs } from '../../context/LogContext';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useLogModal } from '../../context/ModalContext';
import { timestampToFormattedHHMMSS } from '../../utils/time';

export const LogModal = () => {
  const { isOpen, onClose } = useLogModal();
  const { loggedEvents } = useLogs();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Logs</ModalHeader>
        <ModalCloseButton />
        <Table>
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loggedEvents.map(({ timestamp, msg }) => (
              <Tr key={timestamp.getTime()} m={0}>
                <Td paddingY="2">{timestampToFormattedHHMMSS(timestamp)}</Td>
                <Td paddingY="2">{msg}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ModalContent>
    </Modal>
  );
};
