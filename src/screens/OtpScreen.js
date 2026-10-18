
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import authService from '../services/authService';

function OtpScreen({ route, navigation }) {
    const { mode, mobileNumber, registrationData } = route.params || {};

    const [otp, setOtp] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const phoneNumber =
        mobileNumber || registrationData?.mobileNumber || '';


    const handleVerifyOtp = async () => {
        setError('');
        setMessage('');

        if (!/^\d{6}$/.test(otp)) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        if (attempts >= 2) {
            setError(
                'Maximum verification attempts reached. Please request a new OTP.'
            );
            return;
        }

        try {
            setLoading(true);

            await authService.verifyOtp(phoneNumber, otp);

            // Navigate to Home only after successful API verification.
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (err) {
            const match = err.message?.match(/^API error (\d+):/);
            const status = match ? Number(match[1]) : null;

            if ([400, 401, 422].includes(status)) {
                const nextAttempts = attempts + 1;
                setAttempts(nextAttempts);
                setOtp('');

                if (nextAttempts >= 2) {
                    setError(
                        'Verification failed twice. Please request a new OTP.'
                    );
                } else {
                    setError(
                        'Invalid OTP. You have one more verification attempt.'
                    );
                }
            } else {
                setError(
                    'Unable to connect to the server. Please check your connection and try again.'
                );
            }
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
                <Text style={styles.title}>Verify OTP</Text>

                <Text style={styles.subtitle}>
                    Enter the 6-digit OTP sent to your mobile number.
                </Text>

                <Text style={styles.mobileNumber}>
                    {phoneNumber}
                </Text>

                <AppInput
                    label="One-Time Password"
                    value={otp}
                    onChangeText={value =>
                        setOtp(value.replace(/\D/g, '').slice(0, 6))
                    }
                    placeholder="Enter 6-digit OTP"
                    keyboardType="number-pad"
                />

                <ErrorMessage message={error} />

                {message ? (
                    <Text style={styles.message}>{message}</Text>
                ) : null}

                <View style={styles.buttonContainer}>
                    <AppButton
                        title={loading ? 'Verifying...' : 'Verify OTP'}
                        onPress={handleVerifyOtp}
                        disabled={loading}
                    />
                </View>

                <Text style={styles.note}>
                    Development screen only. Real OTP delivery and verification
                    require the Java backend.
                </Text>
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
        marginBottom: 16,
    },
    mobileNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 24,
    },
    buttonContainer: {
        marginTop: 16,
    },
    message: {
        color: '#15803D',
        marginTop: 8,
    },
    note: {
        color: '#6B7280',
        fontSize: 12,
        marginTop: 24,
        textAlign: 'center',
    },
});

export default OtpScreen;
