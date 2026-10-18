
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Alert,
} from 'react-native';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import authService from '../services/authService';

function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleRegister = async () => {
        setError('');

        if (!fullName.trim()) {
            setError('Please enter your full name.');
            return;
        }

        if (!/^\d{10}$/.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        const registrationData = {
            fullName: fullName.trim(),
            mobileNumber,
            email: email.trim(),
        };

        try {
            setLoading(true);

            await authService.register(registrationData);

            navigation.navigate('OTP', {
                mode: 'register',
                registrationData,
            });
        } catch (err) {
            setError(
                err.message || 'Registration failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Create Account</Text>

                <Text style={styles.subtitle}>
                    Register for your WorkManagement account.
                </Text>

                <AppInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                />

                <AppInput
                    label="Mobile Number"
                    value={mobileNumber}
                    onChangeText={value =>
                        setMobileNumber(value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="Enter 10-digit mobile number"
                />

                <AppInput
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email address"
                />

                <ErrorMessage message={error} />

                <View style={styles.buttonContainer}>
                    <AppButton
                        title={loading ? 'Registering...' : 'Register & Send OTP'}
                        onPress={handleRegister}
                        disabled={loading}
                    />
                </View>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        Already have an account?
                    </Text>

                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}> Login</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    loginText: {
        fontSize: 14,
        color: '#6B7280',
    },
    loginLink: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
});

export default RegistrationScreen;
