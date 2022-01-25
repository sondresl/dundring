import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input';
import { Divider, Stack } from '@chakra-ui/layout';
import * as React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { useActiveWorkout } from '../../context/ActiveWorkoutContext';
import { useUser } from '../../context/UserContext';
import { Workout } from '../../types';
import { parseInputAsInt } from '../../utils';
import { ImportWorkoutModal } from '../Modals/ImportWorkoutModal';
import { WorkoutToEdit } from '../Modals/WorkoutEditorModal';
import { WorkoutListItem } from './WorkoutListItem';

interface Props {
  setActiveWorkout: (workout: Workout, ftp: number) => void;
  setWorkoutToEdit: (workout: WorkoutToEdit) => void;
}
export const WorkoutOverview = ({
  setWorkoutToEdit,
  setActiveWorkout,
}: Props) => {
  const { user, workouts, localWorkouts } = useUser();
  const { activeFtp, setActiveFtp } = useActiveWorkout();
  const [previewFtp, setPreviewFtp] = React.useState('' + activeFtp);
  const previewFtpAsNumber = parseInputAsInt(previewFtp);

  const allWorkouts = [
    ...workouts.map((workout) => ({ workout, locallyStored: false })),
    ...localWorkouts.map((workout) => ({ workout, locallyStored: true })),
  ];

  return (
    <Stack p="5">
      <Button
        fontSize="xl"
        mb="5"
        rightIcon={<Icon as={PencilSquare} />}
        onClick={() =>
          setWorkoutToEdit({
            name: 'New workout',
            parts: [
              {
                duration: 5 * 60,
                targetPower: 70,
              },
            ],
            id: '',
            type: 'new',
            previewFtp: previewFtpAsNumber,
          })
        }
      >
        Create new workout
      </Button>
      <ImportWorkoutModal
        setWorkoutToEdit={setWorkoutToEdit}
        previewFtp={previewFtpAsNumber}
      />
      <Divider />
      <FormControl id="ftp">
        <FormLabel>Based on Ftp</FormLabel>
        <InputGroup>
          <Input
            value={previewFtp}
            onChange={(e) => setPreviewFtp(e.target.value)}
            onBlur={(_) => setActiveFtp(parseInputAsInt(previewFtp))}
          />
          <InputRightAddon children="W" />
        </InputGroup>
        <FormHelperText>
          This value will be used as your FTP for this session. You can change
          your actual Ftp on your profile page
        </FormHelperText>
      </FormControl>

      <Divider />
      {allWorkouts.map(({ workout, locallyStored }, i) => (
        <WorkoutListItem
          key={i}
          username={user.loggedIn ? user.username : null}
          isLocallyStored={locallyStored}
          workout={workout}
          setActiveWorkout={(workout: Workout) =>
            setActiveWorkout(workout, previewFtpAsNumber)
          }
          onClickEdit={() => {
            setWorkoutToEdit({
              ...workout,
              type: locallyStored ? 'local' : 'remote',
              previewFtp: previewFtpAsNumber,
            });
          }}
        />
      ))}
    </Stack>
  );
};
