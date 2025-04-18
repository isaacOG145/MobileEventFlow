module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Para variables de entorno
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        safe: false,  // Puedes cambiar a `true` si quieres forzar a que todas las variables estén definidas en tu archivo `.env`
        allowUndefined: true,  // Esto está bien si necesitas acceder a variables que pueden no estar definidas
      }],
      
      // Reanimated (debe ser el último plugin)
      'react-native-reanimated/plugin',
    ],
  };
};
