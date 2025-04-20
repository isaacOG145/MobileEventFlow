import { StyleSheet } from "react-native";

export const Colors = {
    background: '#f2f6f9',
    cardBackground: '#ffffff',
    textLight: '#FAFAFA',
    textDark: '#141414',
    primary: '#142EA9', // Añadí 'primary' que se usaba en los estilos
    error: '#dc3545', // Añadí 'error' para consistencia
    blue: '#142EA9',
    blueHover: '#344BB5',
    purple: '#8005A3',
    purpleHover: '#9125B0',
    violet: '#4210A9',
    violetHover: '#5C30B6',
    red: '#dc3545',
    green: '#28A745'
};

export const fontSizes = {
    normal: 16,
    medium: 20,
    large: 24,
    xlarge: 32
};

export const Spacing = {
    base: 8,
    padding: {
        small: 4,
        medium: 8,
        large: 12,
        xlarge: 16,
        xxlarge: 20,
        screenHorizontal: 20,
        screenVertical: 16,
        card: 16,
        button: 12,
        input: 10
    },
    margin: {
        small: 4,
        medium: 8,
        large: 12,
        betweenItems: 10,
        section: 24
    }
};

export const IconSizes = {
    small: 12,
    medium: 16,
    large: 20
};

export const BorderRadius = {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    circle: 100
};

// Añade estos estilos de modal al final de tu archivo Styles.js
export const ModalStyles = {
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    overlayTouchable: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.large,
        padding: Spacing.padding.xlarge,
        elevation: 5,
        shadowColor: Colors.textDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: '90%',
        maxWidth: 400,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.margin.large,
    },
    title: {
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        color: Colors.primary,
        flex: 1,
        paddingRight: Spacing.padding.medium,
    },
    closeButton: {
        
        backgroundColor: Colors.error,
        width: IconSizes.large + 8,
        height: IconSizes.large +8,
        borderRadius: BorderRadius.circle,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: Colors.textLight,
        fontSize: fontSizes.medium,
        lineHeight: fontSizes.medium + 4,
    },
    content: {
        paddingVertical: Spacing.padding.medium,
    }
};