import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
