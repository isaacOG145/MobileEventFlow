import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Image, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

const successImg = require('../../assets/icons/success.png');
const errorImg = require('../../assets/icons/error.png');
const alertImg = require('../../assets/icons/alert.png');
const loadingImg = require('../../assets/icons/loading.png');

const MessageModal = ({
  show,
  message,
  onClose,
  type = 'success',
  duration = 1500
}) => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    // Animación de carga (solo para tipo loading)
    if (type === 'loading') {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }

    // Auto-cerrar si no es de tipo loading
    if (show && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, type]);

  const getIcon = () => {
    switch (type) {
      case 'error': return errorImg;
      case 'warning': return alertImg;
      case 'loading': return loadingImg;
      default: return successImg;
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Modal
      transparent={true}
      visible={show}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.content]}>
          <View style={styles.iconContainer}>
            <Animated.Image
              source={getIcon()}
              style={[
                styles.icon,
                type === 'loading' && { transform: [{ rotate: spin }] }
              ]}
            />
          </View>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

MessageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'loading']),
  duration: PropTypes.number,
};

export default MessageModal;