import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/shared/constants';
import { monitoring } from '@/shared/monitoring';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    monitoring.captureError(error, { componentStack: info.componentStack });
  }

  private reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>The app hit an unexpected error.</Text>
          <Pressable style={styles.button} onPress={this.reset}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8 },
  subtitle: { color: colors.muted, marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  buttonText: { color: colors.white, fontWeight: '600' },
});
