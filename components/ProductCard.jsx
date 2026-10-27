import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';

export default function ProductCard({ item, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(item)}>
      
      {/* IMAGEN DEL PRODUCTO */}
      <Image 
        source={{ uri: item.imagen ? item.imagen : 'https://via.placeholder.com/150' }} 
        style={styles.cardImage} 
      />

      {/* TEXTOS DE LA TARJETA */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text numberOfLines={1} style={styles.cardDesc}>{item.descripcion}</Text>
        <Text style={styles.cardPrice}>${item.precio}</Text>
      </View>

    </Pressable>
  );
}

// ESTILOS DE LA TARJETA
const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#eee' 
  },
  cardImage: { 
    width: 50, 
    height: 50, 
    borderRadius: 6, 
    backgroundColor: '#ddd' 
  },
  cardContent: { 
    flex: 1, 
    marginLeft: 10 // ¡Aquí está elespacio clave para que no se peguen las letras a la foto!
  },
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  cardDesc: { 
    color: '#666', 
    fontSize: 13 
  },
  cardPrice: { 
    color: 'green', 
    fontWeight: 'bold', 
    marginTop: 2 
  }
});