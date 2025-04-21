import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectInputComponent = ({
  options = [],           // Array de opciones: [{ value: "val", label: "Texto" }]
  value = "",             // Valor seleccionado
  onValueChange = () => {}, // Manejador de cambio
  label = "",             // Etiqueta del campo
  required = false,       // ¿Es obligatorio?
  error = "",             // Mensaje de error
  imageSource = null,     // Icono a mostrar
  imageStyle = {},        // Estilo del icono
  containerStyle = {},    // Estilo del contenedor externo
  labelStyle = {},        // Estilo del texto del label
  pickerStyle = {},       // Estilo del selector
}) => {
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

      <View style={[styles.noShadow, styles.pickerWrapper, error && styles.inputError]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={[styles.picker, pickerStyle]}
        >
          <Picker.Item label="Selecciona una opción" value="" enabled={false} />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
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
  },
  required: {
    color: '#cc1212',
  },
  image: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  pickerWrapper: {
    backgroundColor: '#e5e7e9',
    borderRadius: 12,
    
    borderColor: '#ccc',
  },
  picker: {
    width: '100%',
    color: '#141414',
    borderRadius: 12,
    borderColor: '#ccc',
    elevation: 0,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  noShadow: {
  elevation: 0,
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
}
});



export default SelectInputComponent;
