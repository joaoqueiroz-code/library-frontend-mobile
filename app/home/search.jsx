// app/home/search.js
import { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { getBooks } from '../../services/api';

export default function Search() {
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = async () => {
    const booksData = await getBooks();
    const filtered = booksData.filter(
      (book) => book.title.includes(query) || book.author.includes(query)
    );
    setFilteredBooks(filtered);
  };

  return (
    <View>
      <TextInput
        placeholder="Search by title or author"
        onChangeText={setQuery}
        onEndEditing={handleSearch}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
