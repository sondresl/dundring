import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { HStack, Text, Grid, Center } from "@chakra-ui/layout";
import * as React from "react";
import { X } from "react-bootstrap-icons";
import { WorkoutPart } from "../../types";
import { secondsToHoursMinutesAndSeconds } from "../../utils";

interface Props {
  workoutPart: WorkoutPart;
  setWorkoutPart: (workoutPart: WorkoutPart) => void;
  removeWorkoutPart: () => void;
}
export const WorkoutIntervalInput = ({
  workoutPart,
  setWorkoutPart,
  removeWorkoutPart,
}: Props) => {
  const [powerInput, setPowerInput] = React.useState("");
  const [secondsInput, setSecondsInput] = React.useState("");
  const [minutesInput, setMinutesInput] = React.useState("");
  const [hoursInput, setHoursInput] = React.useState("");

  const parseInput = (input: string) => {
    const parsed = parseInt(input);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed;
  };
  const calculateNewDuration = (
    hoursInput: string,
    minutesInput: string,
    secondsInput: string
  ) => {
    const hoursAsSeconds = parseInput(hoursInput) * 3600;
    const minutesAsSeconds = parseInput(minutesInput) * 60;
    const secondsAsSeconds = parseInput(secondsInput);

    const totalSeconds = hoursAsSeconds + minutesAsSeconds + secondsAsSeconds;
    if (totalSeconds < 0) {
      return secondsToHoursMinutesAndSeconds(0);
    }
    return secondsToHoursMinutesAndSeconds(totalSeconds);
  };

  const updateInputs = () => {
    const { hours, minutes, seconds } = calculateNewDuration(
      hoursInput,
      minutesInput,
      secondsInput
    );
    setHoursInput(hours.toString());
    setMinutesInput(minutes.toString());
    setSecondsInput(seconds.toString());
  };
  return (
    <HStack>
      <Grid templateColumns="repeat(3, 5fr) 1fr 5fr" gap="1">
        <InputGroup>
          <Input
            placeholder="hours"
            type="number"
            value={hoursInput}
            onChange={(e) => setHoursInput(e.target.value)}
            onBlur={updateInputs}
          />
          <InputRightAddon children="h" />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="minutes"
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            onBlur={updateInputs}
          />
          <InputRightAddon children="m" />
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="seconds"
            type="number"
            value={secondsInput}
            onChange={(e) => {
              setSecondsInput(e.target.value);
            }}
            onBlur={updateInputs}
          />
          <InputRightAddon children="s" />
        </InputGroup>
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            @
          </Text>
        </Center>
        <InputGroup>
          <Input
            placeholder="power"
            type="number"
            value={powerInput}
            onChange={(e) => setPowerInput(e.target.value)}
          />
          <InputRightAddon children="W" />
        </InputGroup>
      </Grid>
      <Center>
        <IconButton
          aria-label="Remove interval"
          variant="ghost"
          onClick={removeWorkoutPart}
          icon={<Icon as={X} />}
        />
      </Center>
    </HStack>
  );
};
