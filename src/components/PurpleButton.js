import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors, fontSizes, Spacing} from '../config/Styles';
import { BorderRadius } from '../config/Styles';

export default function PurpleButton({ children, onPress }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TouchableOpacity
            style={[
                styles.bt,
                styles.btnBlue,
                isHovered && styles.btnBlueHover
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
    btnBlue: {
        backgroundColor: Colors.purple,
    },
    text: {
        color: Colors.textLight,
        fontSize: fontSizes.normal,
    },
    btnBlueHover: {
        backgroundColor: Colors.purpleHover,
    },
});
