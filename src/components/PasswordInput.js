import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const eyeOpen = require('../../assets/icons/show.png');
const eyeClosed = require('../../assets/icons/dontShow.png');

const PasswordInput = ({
  value = "",
  onChangeText = () => {},
  label = null,
  required = false,
  error = "",
  placeholder = "",
  disabled = false,
  containerStyle = {},
  inputStyle = {},
  labelStyle = {},
  imageSource = null,
  imageStyle = {}
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          {imageSource && <Image source={imageSource} style={[styles.image, imageStyle]} />}
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : {},
            disabled ? styles.inputDisabled : {},
            inputStyle
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          editable={!disabled}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleButton}
          activeOpacity={0.7}
          accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <Image
            source={showPassword ? eyeOpen : eyeClosed}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#141414',
    fontWeight: 'normal',
  },
  required: {
    color: 'red',
  },
  image: {
    marginRight: 8,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 12,
    paddingRight: 40, // Espacio para el botón
    color: '#141414',
    backgroundColor: '#e5e7e9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  inputDisabled: {
    opacity: 0.6,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }], // Mitad del tamaño del icono
    padding: 4,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  imageSource: PropTypes.any,
  imageStyle: PropTypes.object,
};

export default PasswordInput;
