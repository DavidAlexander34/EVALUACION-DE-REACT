import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductCard from './components/ProductCard';

export default function App() {
  // ESTADOS DEL FORMULARIO
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');


  // ESTADOS DE DATOS Y MODALES
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [prodSeleccionado, setProdSeleccionado] = useState(null);

 
  // FUNCIÓN GUARDAR
  const guardarProducto = () => {
    if (!nombre.trim()) {
      alert('¡Ponle nombre al producto, por favor!');
      return;
    }
    
    setProductos([
      ...productos, 
      { 
        id: Date.now().toString(), 
        nombre, 
        descripcion, 
        stock, 
        categoria, 
        precio, 
        imagen 
      }
    ]);

    // Limpiar campos y cerrar modal
    setNombre(''); 
    setDescripcion(''); 
    setStock(''); 
    setCategoria(''); 
    setPrecio(''); 
    setImagen('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      {/* CABECERA */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Listado de Productos</Text>
        <StatusBar style="light" />
      </View>

      {/* BARRA DE BÚSQUEDA */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar..." style={styles.inputSearch} />
      </View>

      {/* LISTA DE PRODUCTOS (FLATLIST) */}
      <View style={styles.listContainer}>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Pailas, no hay productos...</Text>
          }
          renderItem={({ item }) => (
            <ProductCard 
              item={item} 
              onPress={(p) => { 
                setProdSeleccionado(p); 
                setDetalleVisible(true); 
              }} 
            />
          )}
        />
      </View>

      {/* BOTÓN FLOTANTE (+) */}
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      {/* MODAL PARA CREAR PRODUCTO */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>Nuevo Producto</Text>
          
          <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
          <TextInput placeholder="Descripción" style={styles.input} value={descripcion} onChangeText={setDescripcion} />
          <TextInput placeholder="Stock" style={styles.input} keyboardType="numeric" value={stock} onChangeText={setStock} />
          <TextInput placeholder="Categoría" style={styles.input} value={categoria} onChangeText={setCategoria} />
          <TextInput placeholder="Precio" style={styles.input} keyboardType="numeric" value={precio} onChangeText={setPrecio} />
          <TextInput placeholder="URL de la imagen" style={styles.input} value={imagen} onChangeText={setImagen} />

          <Pressable style={styles.btnMain} onPress={guardarProducto}>
            <Text style={styles.btnText}>GUARDAR DATOS</Text>
          </Pressable>

          <Pressable style={[styles.btnMain, styles.btnCancel]} onPress={() => setModalVisible(false)}>
            <Text style={styles.btnText}>CANCELAR</Text>
          </Pressable>
        </View>
      </Modal>

      {/* MODAL DE DETALLE */}
      <Modal visible={detalleVisible} animationType="fade">
        {prodSeleccionado && (
          <View style={styles.modalBody}>
            <Image 
              source={{ uri: prodSeleccionado.imagen || 'https://via.placeholder.com/150' }} 
              style={styles.detailImage} 
            />
            <Text style={styles.detailTitle}>{prodSeleccionado.nombre}</Text>
            <Text style={styles.detailDesc}>{prodSeleccionado.descripcion}</Text>
            <Text style={styles.detailMeta}>Stock: {prodSeleccionado.stock} | Categoría: {prodSeleccionado.categoria}</Text>
            <Text style={styles.detailPrice}>${prodSeleccionado.precio}</Text>

            <Pressable style={styles.btnMain} onPress={() => { alert('¡Agregado al carrito!'); setDetalleVisible(false); }}>
              <Text style={styles.btnText}>Agregar al Carrito</Text>
            </Pressable>

            <Pressable style={[styles.btnMain, styles.btnBack]} onPress={() => setDetalleVisible(false)}>
              <Text style={styles.btnText}>Volver</Text>
            </Pressable>
          </View>
        )}
      </Modal>

    </View>
  );
}


// ESTILOS
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f9f9f9' 
  },
  header: { 
    height: 90, 
    backgroundColor: '#0c5327', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 30 
  },
  headerText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  searchContainer: { 
    padding: 15 
  },
  inputSearch: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    height: 40, 
    paddingHorizontal: 10 
  },
  listContainer: { 
    flex: 1, 
    paddingHorizontal: 15 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#888', 
    marginTop: 20 
  },
  fab: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: '#0c5327', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5 
  },
  fabText: { 
    color: '#fff', 
    fontSize: 30 
  },
  modalBody: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#0c5327' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    height: 40, 
    paddingHorizontal: 10, 
    marginBottom: 10 
  },
  btnMain: { 
    backgroundColor: '#0c5327', 
    height: 45, 
    borderRadius: 6, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 5 
  },
  btnCancel: { 
    backgroundColor: '#888', 
    marginTop: 10 
  },
  btnBack: { 
    backgroundColor: '#c00', 
    marginTop: 10 
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  detailImage: { 
    width: '100%', 
    height: 200, 
    borderRadius: 8, 
    backgroundColor: '#eee', 
    marginBottom: 15 
  },
  detailTitle: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  detailDesc: { 
    color: '#666', 
    marginTop: 5, 
    fontSize: 15 
  },
  detailMeta: { 
    marginTop: 10, 
    color: '#444' 
  },
  detailPrice: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: 'green', 
    marginVertical: 15 
  }
});