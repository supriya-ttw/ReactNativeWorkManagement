
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import authService from '../services/authService';

function LoginScreen({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSendOtp = async () => {
        setError('');

        if (!/^\d{10}$/.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        try {
            setLoading(true);

            await authService.sendLoginOtp(mobileNumber);

            navigation.navigate('OTP', {
                mode: 'login',
                mobileNumber,
            });
        } catch (err) {
            setError(
                err.message || 'Unable to send OTP. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back!</Text>

                <Text style={styles.subtitle}>
                    Enter your mobile number to log in to WorkManagement.
                </Text>

                <AppInput
                    label="Mobile Number"
                    value={mobileNumber}
                    onChangeText={value =>
                        setMobileNumber(value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="Enter 10-digit mobile number"
                />

                <ErrorMessage message={error} />

                <View style={styles.buttonContainer}>
                    <AppButton
                        title={loading ? 'Sending OTP...' : 'Send OTP'}
                        onPress={handleSendOtp}
                        disabled={loading}
                    />
                </View>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Don't have an account?
                    </Text>

                    <Pressable
                        onPress={() => navigation.navigate('Registration')}
                    >
                        <Text style={styles.registerLink}> Register</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 28,
    },
    buttonContainer: {
        marginTop: 16,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    registerText: {
        fontSize: 14,
        color: '#6B7280',
    },
    registerLink: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
});

export default LoginScreen;
