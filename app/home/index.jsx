// app/home/index.js
import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, FONT_FAMILY } from '../../constants/theme';
import { getBooks, deleteBook } from '../../services/api';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      Alert.alert('Failed to delete book', error.message);
    }
  };

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Library</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or author"
        placeholderTextColor={COLORS.textSecondary}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBook(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZE.xLarge,
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.bold,
    marginBottom: SPACING.large,
  },
  searchInput: {
    width: '100%',
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: SPACING.large,
    fontSize: FONT_SIZE.medium,
    color: COLORS.textPrimary,
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  bookTitle: {
    fontSize: FONT_SIZE.large,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.regular,
  },
  deleteButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    padding: SPACING.small,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: FONT_SIZE.medium,
  },
});
