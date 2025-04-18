// mockData.js
export const mockEvent = {
    typeActivity: "EVENT",
    name: "Conferencia de Tecnología 2024",
    date: "2024-06-15T18:00:00Z", // Fecha en formato ISO
    description: "Un evento imperdible para los amantes de la tecnología. Charlas sobre IA, blockchain y más.",
    speaker: "Dr. Alejandro Pérez",
    imageUrls: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500",
    ],
  };
  
  export const mockActivity = {
    typeActivity: "WORKSHOP",
    name: "Taller de React Native",
    associatedEvent: "Conferencia de Tecnología 2024",
    time: "2024-06-15T10:00:00Z",
    totalQuota: 30,
    availableQuota: 12,
    description: "Aprende a construir aplicaciones móviles con React Native desde cero.",
    speaker: "Ing. Sofía Martínez",
    imageUrls: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
    ],
  };