import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

export default function BirthDateComponent({
  value = "",
  onChange = () => {},
  label = "",
  required = false,
  error = "",
  disabled = false,
  placeholder = "DD-MM-AAAA",
  imageSource = null,
  imageSize = 20,
}) {
  const [localError, setLocalError] = useState("");

  const handleChange = (text) => {
    // Eliminar cualquier caracter que no sea número
    const cleanedText = text.replace(/[^0-9]/g, '');
    
    // Aplicar formato DD-MM-AAAA automáticamente
    let formattedText = cleanedText;
    
    if (cleanedText.length > 2 && cleanedText.length <= 4) {
      formattedText = `${cleanedText.slice(0, 2)}-${cleanedText.slice(2)}`;
    } else if (cleanedText.length > 4) {
      formattedText = `${cleanedText.slice(0, 2)}-${cleanedText.slice(2, 4)}-${cleanedText.slice(4, 8)}`;
    }
    
    // Limitar a 10 caracteres (DD-MM-AAAA)
    if (formattedText.length > 10) return;
    
    onChange(formattedText); // Esto actualiza el estado en el componente padre

    // Validación completa cuando tenga 10 caracteres
    if (formattedText.length === 10) {
      validateDate(formattedText);
    } else {
      setLocalError("");
    }
  };

  const validateDate = (dateString) => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(dateString)) {
      setLocalError("Formato inválido. Use DD-MM-AAAA");
      return;
    }

    const [day, month, year] = dateString.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validar si la fecha es válida
    if (
      selectedDate.getDate() !== day ||
      selectedDate.getMonth() + 1 !== month ||
      selectedDate.getFullYear() !== year
    ) {
      setLocalError("Fecha no válida");
      return;
    }

    if (month < 1 || month > 12) {
      setLocalError("Mes inválido (1-12)");
      return;
    }
    
    if (day < 1 || day > 31) {
      setLocalError("Día inválido (1-31)");
      return;
    }

    if (selectedDate > today) {
      setLocalError("La fecha no puede ser futura");
      return;
    }

    setLocalError("");
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          {imageSource && (
            <Image 
              source={imageSource} 
              style={[
                styles.image, 
                { width: imageSize, height: imageSize }
              ]} 
            />
          )}
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}>*</Text>}
          </Text>
        </View>
      )}
      
      <TextInput
        style={[
          styles.input,
          (localError || error) && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={10}
        placeholder={placeholder}
        editable={!disabled}
      />
      
      {(localError || error) && (
        <Text style={styles.errorText}>{localError || error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#141414",
    fontWeight: "normal",
  },
  required: {
    color: "red",
  },
  image: {
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    padding: 12,
    color: "#141414",
    backgroundColor: "#e5e7e9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  inputDisabled: {
    opacity: 0.6,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});