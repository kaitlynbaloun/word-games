import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

export enum Status {
  Correct = 'Correct',
  Misplaced = 'Misplaced',
  Incorrect = 'Incorrect',
  Ungraded = 'Ungraded'
}

export interface IWordBoxProps {
  letter: string;
  boxStatus: Status;
}

const determineBackgroundColor = (status: Status): string => {
  switch (status) {
    case Status.Correct:
      return '#ADEBB3';
    case Status.Misplaced:
      return '#ffa500';
    case Status.Incorrect:
      return '#A9A9A9';
    default:
      return '#00000000';
  }
};

export default function WordBox({ letter, boxStatus }: IWordBoxProps) {
  const { width } = useWindowDimensions();
  const scaleFactor = width / 390;

  const backgroundColor = determineBackgroundColor(boxStatus);

  const boxSize = Math.min(40 * scaleFactor, 48);
  const fontSize = Math.min(24 * scaleFactor, 22);

  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor,
          width: boxSize,
          height: boxSize,
        },
      ]}
    >
      <Text style={[styles.boxText, { fontSize }]}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#00000F',
    borderWidth: 2,
    marginHorizontal: 4,
  },
  boxText: {
    fontWeight: 'bold',
  },
});
