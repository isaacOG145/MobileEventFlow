import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors, fontSizes, Spacing} from '../config/Styles';
import { BorderRadius } from '../config/Styles';

export default function VioletButton({ children, onPress }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TouchableOpacity
            style={[
                styles.bt,
                styles.btnViolet,
                isHovered && styles.btnVioletHover
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            onMouseEnter={() => setIsHovered(true)} // Solo funciona en web
            onMouseLeave={() => setIsHovered(false)} // Solo funciona en web
        >
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    bt: {
        borderRadius: BorderRadius.large,
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        padding: Spacing.padding.medium,
    },
    btnViolet: {
        backgroundColor: Colors.violet,
    },
    text: {
        color: Colors.textLight,
        fontSize: fontSizes.normal,
    },
    // Agregar a tus estilos:
    btnVioletHover: {
        backgroundColor: Colors.violetHover,
    },
});
