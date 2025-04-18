import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const ModalComponent = ({ show, onClose, children, title }) => {
  return (
    <Modal
      visible={show}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      hardwareAccelerated={true}
      statusBarTranslucent={true}
    >
      {/* Contenedor principal con centrado absoluto */}
      <View style={styles.centeredView}>
        {/* Overlay semitransparente */}
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPressOut={onClose} // Cierra al tocar fuera
        />
        
        {/* Contenido del modal */}
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Importante para Android
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa toda la pantalla
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: Platform.select({
      ios: '85%',
      android: '90%' // Más ancho en Android para evitar bordes
    }),
    maxHeight: '80%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18, // Tamaño optimizado
    fontWeight: '600',
    color: '#142ea9',
    flex: 1,
    textAlign: 'center',
    marginRight: 10, // Evita solapamiento con botón
  },
  closeButton: {
    backgroundColor: '#dc3545',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    flex: 1,
  }
});

export default ModalComponent;