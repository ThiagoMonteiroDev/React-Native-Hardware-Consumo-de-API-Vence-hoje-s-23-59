import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const MovieScreen = ({ route }) => {
  const { token } = route.params; // Obtendo o token da navegação
  const [movieTitle, setMovieTitle] = useState(''); // Título do filme a ser adicionado
  const [movies, setMovies] = useState([]); // Lista de filmes registrados

  const handleAddMovie = async () => {
    if (!movieTitle) {
      Alert.alert('Erro', 'O título do filme é obrigatório');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/movies', // URL do backend
        { title: movieTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMovies(prevMovies => [...prevMovies, { title: movieTitle }]); // Atualiza a lista de filmes
      setMovieTitle(''); // Limpa o campo de título do filme
    } catch (error) {
      console.error('Erro ao adicionar filme', error);
      Alert.alert('Erro', 'Não foi possível adicionar o filme');
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data); // Atualiza a lista com os filmes do backend
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
      Alert.alert('Erro', 'Não foi possível carregar os filmes');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título do filme"
        value={movieTitle}
        onChangeText={setMovieTitle}
      />
      <Button title="Adicionar Filme" onPress={handleAddMovie} />

      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  movieItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MovieScreen;
